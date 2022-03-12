import { TreeDataProvider, Uri } from 'vscode'
import * as fs from 'fs'
import * as path from 'path'

import NativeFileItem from './items/NativeFileItem'
import ZipFSItem from './items/ZipFSItem'
import zipFS from './zipFS'

type FileItem = ZipFSItem | NativeFileItem

function getRootItems(projectRoot: string) {
  const packageJSON = path.join(projectRoot, 'package.json')

  if (!fs.existsSync(packageJSON) || !fs.lstatSync(packageJSON).isFile()) {
    return []
  }

  const yarnCacheRoot = path.join(projectRoot, '.yarn', 'cache')

  if (!fs.existsSync(yarnCacheRoot)) {
    // TODO: (@hahnlee) check is workspace
    return []
  }

  if (!fs.lstatSync(yarnCacheRoot).isDirectory()) {
    return []
  }

  const caches = fs.readdirSync(yarnCacheRoot)

  return caches.map((file) => new NativeFileItem(Uri.file(path.resolve(yarnCacheRoot, file))))
}

function getZipFSItems(parent: FileItem) {
  const dirPath = parent.resourceUri.fsPath
  const items = zipFS.readdirSync(dirPath)
  return items.map((item) => new ZipFSItem(Uri.parse(`zip://${dirPath}/${item}`)))
}

export default class YarnBerryDependenciesProvider implements TreeDataProvider<FileItem> {
  constructor(private workspaceRoot: string | undefined) {}

  getChildren(element?: FileItem) {
    if (!this.workspaceRoot) {
      return []
    }

    if (element == null) {
      return getRootItems(this.workspaceRoot)
    }

    return getZipFSItems(element)
  }

  getTreeItem(element: FileItem) {
    return element
  }
}
