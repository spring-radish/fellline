export default function inputRow (label, type, attrs='') {
	const slug = label.toLowerCase().replace(' ', '_')
	if (type === 'number') attrs += 'inputmode="numeric" min="0"'

	return `<tr class="input-row">
		<td><legend for="${slug}">${label}</legend></td>
		<td><input type="${type}" id="${slug}" ${attrs}></td>
		</tr>`
}