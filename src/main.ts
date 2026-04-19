import { Plugin } from "obsidian";
import {
	FileIcons,
	BasesColorProperty,
	BasesYarnFiber,
	BasesYarnWeight,
} from "./tweaks";

export default class CustomTweaksPlugin extends Plugin {
	private observer: MutationObserver | null = null;
	private debounceTimer: NodeJS.Timeout | null = null;

	// tweaks
	private fileIcons: FileIcons;
	private basesColorProperty: BasesColorProperty;
	private basesYarnFiber: BasesYarnFiber;
	private basesYarnWeight: BasesYarnWeight;

	async onload() {
		this.fileIcons = new FileIcons();
		this.basesColorProperty = new BasesColorProperty();
		this.basesYarnFiber = new BasesYarnFiber();
		this.basesYarnWeight = new BasesYarnWeight();

		this.fileIcons.enable();

		this.app.workspace.onLayoutReady(() => this.runTweaks());
		this.registerEvent(
			this.app.workspace.on("layout-change", () => this.runTweaks()),
		);
		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				setTimeout(() => this.runTweaks(), 100);
			}),
		);
		this.setupMutationObserver();
	}

	onunload() {
		console.log("Unloading Custom Tweaks plugin");

		this.fileIcons.disable();

		this.observer?.disconnect();
		if (this.debounceTimer) clearTimeout(this.debounceTimer);
	}

	setupMutationObserver() {
		this.observer = new MutationObserver(
			this.debounce(() => {
				if (document.querySelector(".bases-cards-property")) {
					this.runTweaks();
				}
			}, 150),
		);

		this.observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	debounce(func: Function, wait: number) {
		return (...args: any[]) => {
			if (this.debounceTimer) clearTimeout(this.debounceTimer);
			this.debounceTimer = setTimeout(() => func.apply(this, args), wait);
		};
	}

	runTweaks() {
		this.basesColorProperty.run();
		this.basesYarnFiber.run();
		this.basesYarnWeight.run();
	}
}
