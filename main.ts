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
				span.className = `value-list-element custom-color-pill custom-color-pill--${color}`;
			}
		});
	}
}
