import { TreeItem, TreeItemCollapsibleState, Uri } from 'vscode'
import * as fs from 'fs'
import { npath } from '@yarnpkg/fslib'

export default class NativeFileItem extends TreeItem {
  public resourceUri: Uri

  constructor(uri: Uri) {
    super(uri)

    this.resourceUri = uri

    const stat = fs.statSync(uri.fsPath)
    const isDirectory = stat.isDirectory() || npath.extname(uri.fsPath) === '.zip'

    if (isDirectory) {
      this.collapsibleState = TreeItemCollapsibleState.Collapsed
    } else {
      this.collapsibleState = TreeItemCollapsibleState.None
      this.command = {
        title: 'open file',
        command: 'vscode.open',
        arguments: [uri],
      }
    }
  }
}
