import { signal, component } from '../vendor/reef.es.min.js'
import { rounds } from './math.js'
import inputRow from './components/inputRow.js'
import displayRow from './components/displayRow.js'
import infoRow from './components/infoRow.js'

let data = signal(load({
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
	const ends = data.epi * data.warp_width
	const yards_in_warp = ends * data.warp_length
	const warp_lbs = yards_in_warp / data.ypp
	const warp_oz = Math.ceil(16 * (warp_lbs - Math.floor(warp_lbs)))
	const warp_weight = (warp_lbs.isInteger) ? warp_lbs
		: `${Math.floor(warp_lbs)}lbs ${warp_oz}oz`
	
	const eq_inches = Math.floor(ends / data.proxy_epi)
	const eq_ends = ends % data.proxy_epi

	const proxies = () => displayRow('Proxy Count', `${eq_inches}″ plus ${eq_ends} ends`)
				    + infoRow('Proxy Spools', {spools: data.proxy_spools,
				    	epi: data.proxy_epi, 
				    	warp_width: data.warp_width, 
				    	warp_length: data.warp_length}, 
				    	rounds)

	return `<table>
		<caption>Info</caption>
		<tbody>
			${inputRow('Project Name', 'text', `value="${data.project_name}"`)}
			${inputRow('Materials', 'text', `value="${data.materials}"`)}
		</tbody>
		</table>

		<table>
		<caption>Warp</caption>
		<tbody>
			${inputRow('Warp Width', 'number', `value="${data.warp_width}"`)}
			${inputRow('EPI', 'number', `value="${data.epi}"`)}
			${displayRow('Ends', ends)}
			${inputRow('Warp Length', 'number', `value="${data.warp_length}"`)}
			${displayRow('Yards in Warp', yards_in_warp)}
			${inputRow('YPP', 'number', `value="${data.ypp}"`)}
			${displayRow('Warp Weight', warp_weight)}
		</tbody>
		</table>

		<table>
		<caption>Skarne</caption>
		<tbody>
			${infoRow('Spools', data, rounds)}
			${inputRow('Proxy EPI', 'number', 
				`@placeholder="${data.epi}" @value="${data.proxy_epi}"`)}
			${(data.proxy_epi > 0) ? proxies() : ''}
		</tbody>
		</table>`
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