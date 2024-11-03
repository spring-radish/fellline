function factorize (n) {
	return range(2, n).filter(i => n % i === 0)
}

function range (...[m, n]) {
	const start = n ? m : 1
	const end = n ? n : m
	return new Array(end - start + 1)
		.fill(0)
		.map((_, i) => i + start)
}

function closestMultiple (start, factor) {
	const half = Math.floor(factor / 2)
	return range(start - half, start + half)
		.find(i => i % factor === 0)
}

function countRounds (sources, epi) {
	if (epi % (2 * sources) === 0) 
		return `${epi / (2 * sources)} ♽ is 1 inch`
	return `${epi / sources} ♽ is 2 inches`
}


export function rounds (label, {spools: spools, epi: epi, warp_width: warp_width, warp_length: warp_length}) {
	console.log(warp_width)
	const factors = factorize(epi)
	const name = label.toLowerCase().replace(' ', '_')

	const list = factors.map(f => {
		const rounds = countRounds(f, epi)
		const slug = `${name}-${f}`
		const yds = Math.ceil(epi * warp_width * warp_length / f)
		const checked = (f == spools) ? 'checked' : ''

		return `<input type="radio" 
				name="${name}" 
				value="${f}" 
				id="${slug}"
				${checked}>
		<label for="${slug}">${f}</label>
		<span>
		${rounds} <br>
		${yds} yds per source
		</span>`
	})

	list.push(`<input type="radio" 
					name="${name}" 
					value="0" 
					id="${name}-none">
			<label for="${name}-none">×</label>`)
	
	return `<div class="rounds">${list.join('')}</div>`
}