import * as vscode from 'vscode'
import Yarn2DependenciesProvider from './provider'

export function activate() {
  vscode.window.registerTreeDataProvider(
    'yarn2DependencyExplorer',
    new Yarn2DependenciesProvider(vscode.workspace.rootPath),
  )
}

export function deactivate() {}
