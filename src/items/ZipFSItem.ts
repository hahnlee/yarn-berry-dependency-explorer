import { TreeItem, TreeItemCollapsibleState, Uri } from 'vscode'

import zipFS from '../zipFS'

export default class ZipFSItem extends TreeItem {
  public resourceUri: Uri

  constructor(uri: Uri) {
    super(uri)

    this.resourceUri = uri

    const stat = zipFS.statSync(uri.fsPath)
    const isDirectory = stat.isDirectory()

    if (isDirectory) {
      this.collapsibleState = TreeItemCollapsibleState.Collapsed
    } else {
      this.collapsibleState = TreeItemCollapsibleState.None
      this.command = {
        title: 'open file',
        command: 'vscode.open',
        arguments: [Uri.parse(`zip://${uri.fsPath}`)],
      }
    }
  }
}
