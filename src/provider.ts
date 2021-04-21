import { TreeDataProvider, TreeItem } from 'vscode'

export default class Yarn2DependenciesProvider implements TreeDataProvider<TreeItem> {
  constructor(private workspaceRoot: string | undefined) {}

  async getChildren() {
    return []
  }

  getTreeItem(element: TreeItem) {
    return element
  }
}
