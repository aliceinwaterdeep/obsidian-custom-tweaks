import { Plugin } from "obsidian";

export default class CustomTweaksPlugin extends Plugin {
	async onload() {
		console.log("Loading Custom Tweaks plugin");

		this.app.workspace.onLayoutReady(() => this.runTweaks());

		this.registerEvent(
			this.app.workspace.on("layout-change", () => this.runTweaks())
		);
		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				setTimeout(() => this.runTweaks(), 100);
			})
		);
	}

	onunload() {
		console.log("Unloading Custom Tweaks plugin");
	}

	runTweaks() {
		this.runBasesTweaks();
	}

	runBasesTweaks() {
		this.colorizeColorProperty();
		this.colorizeYarnFiberProperty();
		this.colorizeYarnWeightProperty();
		this.separateLists();
	}

	colorizeColorProperty() {
		const spans = document.querySelectorAll(
			'.bases-cards-property[data-property*="note."] .value-list-element'
		);

		spans.forEach((span) => {
			const parentProperty = span
				.closest(".bases-cards-property")
				?.getAttribute("data-property");
			if (parentProperty && parentProperty.toLowerCase().includes("color")) {
				const color = span.textContent.trim().toLowerCase();
				span.className = `value-list-element custom-pill custom-color-pill--${color}`;
			}
		});
	}

	colorizeYarnFiberProperty() {
		const spans = document.querySelectorAll(
			'.bases-cards-property[data-property*="yarnFiber" i] .value-list-element'
		);

		spans.forEach((span) => {
			span.classList.add("custom-pill");
		});
	}

	colorizeYarnWeightProperty() {
		const valueContainers = document.querySelectorAll<HTMLElement>(
			'.bases-cards-property[data-property*="yarnweight" i] .bases-rendered-value'
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

	separateLists() {}

	generateColor(text: string) {
		let hash = 0;
		for (let i = 0; i < text.length; i++) {
			const char = text.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash = hash & hash;
		}

		// generate HSL color with fixed saturation and lightness for consistency
		const hue = Math.abs(hash) % 360;
		const saturation = 45;
		const lightness = 85;

		const bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

		// determine text color based on background lightness
		const textColor = lightness > 70 ? "#333" : "#fff";

		return {
			bg: bgColor,
			text: textColor,
		};
	}
}
