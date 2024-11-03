import {readFileSync, writeFileSync, } from 'node:fs';

const pwa_path = './src/scripts/pwa.js'

const data = readFileSync(pwa_path, 'utf8')
const now = Date.now()
const stampedData = data.replace("{{BUILD_VERSION}}", now)

writeFileSync('./src/scripts/pwa-out.js', stampedData)

console.log('wrote file')