export class FileIcons {
	private styleEl: HTMLStyleElement | null = null;

	enable() {
		this.injectStyles();
	}

	disable() {
		this.removeStyles();
	}

	private injectStyles() {
		if (this.styleEl) return;

		const css = `
.nav-file-title::before {
	content: "";
	display: inline-block;
	width: 16px;
	height: 16px;
	margin-inline-end: 4px;
	background-color: currentColor;
	-webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4'/%3E%3C/svg%3E");
	mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4'/%3E%3C/svg%3E");
	-webkit-mask-size: contain;
	mask-size: contain;
	-webkit-mask-repeat: no-repeat;
	mask-repeat: no-repeat;
	-webkit-mask-position: center;
	mask-position: center;
	flex-shrink: 0;
	position: relative;
	top: 2px;
}
`;

		this.styleEl = document.createElement("style");
		this.styleEl.id = "custom-tweaks-file-icons";
		this.styleEl.textContent = css;
		document.head.appendChild(this.styleEl);
	}

	private removeStyles() {
		if (this.styleEl) {
			this.styleEl.remove();
			this.styleEl = null;
		}
	}
}
