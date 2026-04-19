export class BasesYarnWeight {
	run() {
		const valueContainers = document.querySelectorAll<HTMLElement>(
			'.bases-cards-property[data-property*="yarnweight" i] .bases-rendered-value',
		);

		valueContainers.forEach((container) => {
			if (container.querySelector(".custom-pill")) return;

			const textContent = container.textContent?.trim() || "";
			if (textContent) {
				// extract the number from text like "3 - Light/DK"
				const weightMatch = textContent.match(/^(\d+)/);
				const weight = weightMatch ? weightMatch[1] : textContent;

				container.innerHTML = "";
				const span = document.createElement("span");
				span.className = `custom-pill custom-yarn-weight-pill-${weight}`;
				span.textContent = textContent;
				container.appendChild(span);
			}
		});
	}
}
