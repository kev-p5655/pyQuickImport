// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

async function executeCommand(term: vscode.Terminal, command: string): Promise<string> {
	var res: string = "" // TODO: Make this not need to be a string? And instead also return undefined if it is.
	vscode.window.onDidChangeTerminalShellIntegration(async ({ terminal, shellIntegration }) => {
		if (terminal === term) {
			const exec = shellIntegration.executeCommand(command)
			vscode.window.onDidEndTerminalShellExecution(async (event) => {
				if (event.execution === exec) {
					for await (const data of event.execution.read()) {
						res += data
					}
					// vscode.window.showInformationMessage(`Command exited with code ${event.exitCode}`)
				}
			})
		}
	})
	return res
}

function getConfiguration<T>(key: string) {
	return vscode.workspace.getConfiguration("pyQuickImport").get<T>(key)
}

export function activate(context: vscode.ExtensionContext) {
	var term: vscode.Terminal
	var logger = vscode.window.createOutputChannel("pyQuickImport", {log: true})

	function set_term(projDir: string) {
		if (!term || term.exitStatus) {
			term = vscode.window.createTerminal({
				name: "pyQuickImport",
				cwd: projDir,
				hideFromUser: false,
			})
		}
	}

	function filePathToImport(filePath: string): string {
		var {dir, name} = path.parse(filePath)
		logger.info(`name: ${name}`)
		dir = dir.replace(RegExp(`^${path.sep}*`), "")
		dir = dir.replace(RegExp(`${path.sep}`), ".")
		logger.info(`dir: ${dir}`)
		var importPath: string = dir ? `${dir}.${name}` : name
		return `from ${importPath} import *`
	}

	const disposable = vscode.commands.registerCommand('pyQuickImport.importFile', async () => {
		var python = getConfiguration<string>("pythonExec")
		var projDir = getConfiguration<string>("projectDirectory")
		vscode.window.showInformationMessage(`projDir: ${projDir}`)
		var currFilePath = vscode.window.activeTextEditor?.document.fileName
		var workspaceDirs = vscode.workspace.workspaceFolders
		if (projDir && currFilePath && python) {
			workspaceDirs?.forEach((workspaceFolder) => {
				if (currFilePath?.includes(workspaceFolder.uri.path)) {
					projDir = workspaceFolder.uri.path
					logger.info(`Updated projDir: ${projDir}`)
				}
			})
		} else {
			vscode.window.showInformationMessage("Using configured projectDirectory")
		}

		if (python && projDir && currFilePath) {
			set_term(projDir)
			term.show()
			await executeCommand(term, python)
			var filePath = currFilePath.replace(RegExp(`^${projDir}`), "")
			await executeCommand(term, filePathToImport(filePath))
		} else {
			vscode.window.showInformationMessage("Error: Need to configure python command")
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
