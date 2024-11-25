export default function projectList (projects) {
	const q = projects.current
	let out = `<input type="button" aria-current="page" class="proj-select" id="${q.id}" @value="${q.project_name}">`
	for (const k in projects.others) {
		const p = projects.others[k]
		if (p == null) continue
		out += `<input type="button" class="proj-select" id="${p.id}" @value="${p.project_name}">`
	}
	return out
}
