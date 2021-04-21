import { ZipOpenFS, VirtualFS, PosixFS } from '@yarnpkg/fslib'
import { getLibzipSync } from '@yarnpkg/libzip'

const zipFS = new PosixFS(
  new VirtualFS({
    baseFs: new ZipOpenFS({
      libzip: getLibzipSync(),
      useCache: true,
      maxOpenFiles: 80,
    }),
  }),
)

export default zipFS
