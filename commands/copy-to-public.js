const path = require('path')
const copyDir = require('copy-dir')

const BUILD_DIRECTORY = path.resolve(__dirname, '../build')
const PUBLIC_DIRECTORY = path.resolve(__dirname, '../../../public')

copyDir.sync(BUILD_DIRECTORY, `${PUBLIC_DIRECTORY}/constructor/`, {
  filter:(type, name) => !(
    path.extname(name) == '.html' ||
    path.extname(name) == '.example' ||
    path.extname(name) == '.txt' ||
    path.extname(name) == '.map'
  )
})
