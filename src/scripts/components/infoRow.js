export default function infoRow (label, data, transform) {
	return `<tr class="info-row">
		<td>${label}</td>
		<td>${transform(label, data)}</td>
		</tr>`
}