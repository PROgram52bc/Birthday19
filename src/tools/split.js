export class Split {
	constructor(element) {
		this.element = element;
		this.originalContent = element.innerHTML; // store old content
		this.lines = [];
	}
	splitToLines() {
		// caveat: 
		// 1. not recognizing implicit wraps 
		// possible fix: check every letter or word, detect new line based on offsetTop
		// 2. not handling sub-tags
		// e.g. <div>Content Content <b>Content <br>
		// Content </b> Content </div>
		// will become
		// <span><div>Content Content <b>Content <br></span>...
		this.element.innerHTML="";
		let textLines = this.originalContent.split("\n");
		for (var i=0; i<textLines.length; i++){
			let line = document.createElement("div");
			line.style.display = "inline-block";
			line.innerHTML = textLines[i];
			if (i != 0)
				this.element.appendChild(document.createTextNode("\n"));
			this.element.appendChild(line);
			this.lines.push(line);
		}
	}
	getLines() {
		return this.lines;
	}
	restore() {
		this.element.innerHTML = this.originalContent;
		this.lines = [];
	}
}
