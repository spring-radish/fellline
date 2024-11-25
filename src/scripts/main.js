import { signal, component } from '../vendor/reef.es.min.js'

import { unwrapObjectProxy, loadProjects } from './storage.js'

import specTable from './components/specTable.js'
import projectList from './components/projectList.js'
	project_name: '',
	materials: '',
	warp_length: 7,
	warp_width: 36,
	epi: 24,
	ypp: 5800,
	spools: null,
	proxy_epi: null,
	proxy_spools: null,
}))

function load (obj) {
	const s = window.localStorage
	const acc = {}

	for (const k in obj) {
		acc[k] = s.getItem(k) || obj[k]
	}

	return acc
}

component('#app', () => {
	return projectList(projects).concat(specTable(projects.current))
})

document.addEventListener('input', (e) => {
	const key = e.target.name || e.target.id
	const value = e.target.value

	console.log(key, 'is', value)
	data[key] = value

	switch (e.target.id) {
		case 'epi':
			data.proxy_epi = false;
			window.localStorage.setItem('proxy_epi', false)
			break
	}

	window.localStorage.setItem(key, value)
})

console.log(data)