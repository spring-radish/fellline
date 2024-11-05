import {copyFileSync, readFileSync, writeFileSync, } from 'node:fs';

copyFileSync('./src/index.html', './dist/index.html')
copyFileSync('./src/manifest.json', './dist/manifest.json')

const pwa_path = './src/scripts/pwa.js'

const data = readFileSync(pwa_path, 'utf8')
const now = Date.now()
const stampedData = data.replace("{{BUILD_VERSION}}", now)

writeFileSync('./dist/scripts/pwa.js', stampedData)

console.log('wrote pwa')