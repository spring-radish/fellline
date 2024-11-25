export function unwrapObjectProxy (proxy) {
	let obj = {}

	for (const key in proxy) {
		obj[key] = proxy[key]
	}

	return obj
}

export function storeProject (object) {
	const string = JSON.stringify(object)
	window.localStorage.setItem(key, string)
}

export function loadProjects () {
	const storage = window.localStorage
	let projects = {current: {
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

	let i = 0
	let ith_project = JSON.parse(storage.getItem(storage.key(i)))

	if (ith_project === null) {
		return projects
	}

	projects.current = ith_project
	i++

	while (ith_project) {
		projects.others[ith_project.id] = ith_project

		console.log(ith_project)
		i++
		ith_project = JSON.parse(storage.getItem(storage.key(i)))
	}

	console.log(projects)
	return projects
}
