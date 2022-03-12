import * as vscode from 'vscode'
import YarnBerryDependenciesProvider from './provider'

export function activate() {
  vscode.window.registerTreeDataProvider(
    'yarnBerryDependencyExplorer',
    new YarnBerryDependenciesProvider(vscode.workspace.rootPath),
  )
}

export function deactivate() {}
