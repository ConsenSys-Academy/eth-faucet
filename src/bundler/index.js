const fs = require('fs')
const path = require('path')
const browserify = require('browserify')
// const lavamoat = require('lavamoat-browserify')
const envify = require('envify/custom')
const { address } = require('../server/get-config')

const srcPath = path.join(__dirname, '/../webapp/index.js')
const destPath = path.join(__dirname, '/../../build/app.js')

// prepare app bundle
// const bundler = browserify(lavamoat.args)
const bundler = browserify()

// inject faucet address
// COOGAN: HARDCODED FAUCET ADDRESS? It's okay because the faucet address is the same across all networks. Won't need to change this.
bundler.transform(envify({
  FAUCET_ADDRESS: address
}))

// add lavamoat protections
// (doesnt work under lavamoat-node yet)
// bundler.plugin(lavamoat)

// add app entry
bundler.add(srcPath)

// build app
bundler.bundle()
  .pipe(fs.createWriteStream(destPath))
