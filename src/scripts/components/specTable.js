import inputRow from './inputRow.js'
import displayRow from './displayRow.js'
import infoRow from './infoRow.js'

import { rounds } from '../math.js'

export default function specTable (data) {
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

	return `<input type="button" id="new" value="New Project">
		<table>
		<caption>Info</caption>
		<tbody>
			${inputRow('Project Name', 'text', `@value="${data.project_name}" placeholder="Untitled" required`)}
			${inputRow('Materials', 'text', `value="${data.materials}"`)}
		</tbody>
		</table>

		<table>
		<caption>Warp</caption>
		<tbody>
			${inputRow('Warp Width', 'number', `@value="${data.warp_width}"`)}
			${inputRow('EPI', 'number', `@value="${data.epi}"`)}
			${displayRow('Ends', ends)}
			${inputRow('Warp Length', 'number', `@value="${data.warp_length}"`)}
			${displayRow('Yards in Warp', yards_in_warp)}
			${inputRow('YPP', 'number', `@value="${data.ypp}"`)}
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
}
