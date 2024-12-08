# Things to do
- Commands
    - As a hacky way to start, just send a filename to import and a function name to the command pallet command.
- Terminal
    - (Done) Open and store a terminal
    - Learn how to interact with a terminal
        - TerminalShellIntegration
        - Run arbitrary commands
        - How do you get output or return values?
    - Try opening a python interpreter and see if commands sent to the terminal end up there.
- vscode
    - Get the current file focused on
        - Print it out
    - Turn a file path into an import in python.
        - From the project root
        - Ex: ./source/something/code.py -> import source.something.code
    - Figure out how to get the current function
        - Then only import that function
        - from source.something.code import <fzunction>
- Keybinds: Figure out how to make the keybindings conditional on a config property.
    - https://code.visualstudio.com/api/references/when-clause-contexts
    - Ex: calva:keybindingsEnabled && editorTextFocus && editorLangId == 'clojure'

# Issues
- The "importFile" command seems like it runs twice when you trigger the command?
    - It's very strange when you exit the interpreter it triggers the commands again.
    - I think maybe I don't understand some of the events that happen and something is causing the event handler to get called twice??
    - Related? https://github.com/microsoft/vscode/issues/109014
- If you already started the terminal in one file, and you trigger the command again it should only do the importing to python portion.
    - Could get really fancy and somehow try to detect/remember if you're still in the interpreter?
        - Could just remember all the imports that have happened and just restart the terminal and do all the imports again.

# pyQuickImport README

This is the README for your extension "pyQuickImport". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
