export class BasesYarnFiber {
	run() {
		const spans = document.querySelectorAll(
			'.bases-cards-property[data-property*="yarnFiber" i] .value-list-element',
		);

		spans.forEach((span) => {
			span.classList.add("custom-pill");
		});
	}
}
