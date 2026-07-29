import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicRoot = path.join(projectRoot, 'public')
const sourceRoot = path.join(projectRoot, 'src')
const sourceExtensions = new Set(['.js', '.jsx', '.ts', '.tsx'])

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name)
      return entry.isDirectory() ? sourceFiles(entryPath) : [entryPath]
    }),
  )

  return files.flat().filter((file) => sourceExtensions.has(path.extname(file)))
}

const publicEntries = await readdir(publicRoot)
const rootAbsolutePublicPaths = publicEntries.map((entry) => `/${entry}`)
const violations = []

for (const file of await sourceFiles(sourceRoot)) {
  const lines = (await readFile(file, 'utf8')).split('\n')

  lines.forEach((line, index) => {
    for (const publicPath of rootAbsolutePublicPaths) {
      const isStringLiteral =
        line.includes(`'${publicPath}`) ||
        line.includes(`"${publicPath}`) ||
        line.includes(`\`${publicPath}`)

      if (isStringLiteral) {
        violations.push(
          `${path.relative(projectRoot, file)}:${index + 1}: ${publicPath}`,
        )
      }
    }
  })
}

if (violations.length > 0) {
  console.error('Root-absolute public asset paths bypass the Vite base:')
  console.error(violations.map((violation) => `- ${violation}`).join('\n'))
  console.error("Use publicAsset('path-from-public') instead.")
  process.exitCode = 1
}
