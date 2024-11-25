import { signal, component } from '../vendor/reef.es.min.js'

import { unwrapObjectProxy, loadProjects } from './storage.js'

import specTable from './components/specTable.js'
import projectList from './components/projectList.js'

let projects = signal(loadProjects());

/**
{current: {
	id: window.crypto.randomUUID(),
	project_name: '',
	materials: '',
	warp_length: 7,
	warp_width: 36,
	epi: 24,
	ypp: 5800,
	spools: null,
	proxy_epi: null,
	proxy_spools: null,
}, others: {}}
 */

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

	if (projects.current[key] === null) return

	console.log(key, 'is', value)
	projects.current[key] = value

	switch (e.target.id) {
		case 'epi':
			projects.current.proxy_epi = false;
			break
	}

	window.localStorage.setItem(projects.current.id, JSON.stringify(projects.current))
})

document.addEventListener('click', (e) => {
	console.log(e.target.id)
	switch (e.target.id) {
		case 'save':
			e.stopPropagation()
			const project = unwrapObjectProxy(projects)
			if (!project.project_name) throw Error('Untitled project')
			projects[project.project_name] = project
			console.log(projects)
			return
		case 'new':
			e.stopPropagation()
			const id = window.crypto.randomUUID()
			console.log(id)
			projects.others[projects.current.id] = projects.current
			projects.current = {
				id: id,
				project_name: '',
				materials: '',
				warp_length: 7,
				warp_width: 36,
				epi: 24,
				ypp: 5800,
				spools: null,
				proxy_epi: null,
				proxy_spools: null,
			}
			return
	}
	// the 'retrieve' case
	if (e.target.classList.contains('proj-select')) {
		const id = e.target.id
		projects.others[projects.current.id] = {...projects.current}
		projects.current = {...projects.others[id]}
		projects.others[id] = null
		console.log('current project is', projects.current)
	}
})

console.log(projects)
