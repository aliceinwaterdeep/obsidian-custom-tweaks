export class BasesColorProperty {
	run() {
		const spans = document.querySelectorAll(
			'.bases-cards-property[data-property*="note."] .value-list-element',
		);

		spans.forEach((span) => {
			const parentProperty = span
				.closest(".bases-cards-property")
				?.getAttribute("data-property");

			if (parentProperty && parentProperty.toLowerCase().includes("color")) {
				const color = span?.textContent?.trim().toLowerCase();
				span.className = `value-list-element custom-pill custom-color-pill--${color}`;
			}
		});
	}
}
