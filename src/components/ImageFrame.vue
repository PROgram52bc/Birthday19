<template>
	<div class="background" ref="fallback" style="background-color:black">
		<animated-title-page v-on:start-button-clicked="startAll" v-bind:main-title="titlePageConfig.mainTitle" v-bind:sub-titles="titlePageConfig.subTitles" ref="titlePage"></animated-title-page>
		<animated-hollow-mask color="black" ref="mask"></animated-hollow-mask>
		<transition
			mode="out-in" 
			v-on:enter="enter" 
			v-on:leave="leave" 
			v-on:before-leave="beforeLeave" 
			v-bind:css="false">
		<div class="background" ref="mainContent" v-bind:key="currentConfig.key" v-bind:style="bgImageStyle">
			<pre class="text emphasize-first-letter" ref="text" v-bind:style="currentConfig.textStyle">{{currentConfig.text}}</pre>
			<div v-if="currentIdx!=0" class="button prev-button" v-on:click="prevPage">
				<!-- PREV BUTTON SVG STARTS -->
				<svg class="button-icon" stroke-linecap="round" stroke-width="1" v-bind:stroke="currentConfig.arrowColor?currentConfig.arrowColor:'rgb(0,0,0)'" stroke-opacity="0.4" fill="none" stroke-linejoin="round" viewBox="0 0 5 8" xmlns="http://www.w3.org/2000/svg">
					<path d="M4,1L1,4L4,7" ></path>
				</svg>
				<!-- PREV BUTTON SVG ENDS -->
			</div>
			<div v-if="currentIdx!=config.length-1" class="button next-button" v-on:click="nextPage">
				<!-- NEXT BUTTON SVG STARTS -->
				<svg class="button-icon" stroke-linecap="round" stroke-width="1" v-bind:stroke="currentConfig.arrowColor?currentConfig.arrowColor:'rgb(0,0,0)'" stroke-opacity="0.4" fill="none" stroke-linejoin="round" viewBox="0 0 5 8" xmlns="http://www.w3.org/2000/svg">
					<path d="M1,1L4,4L1,7" ></path>
				</svg>
				<!-- NEXT BUTTON SVG ENDS -->
			</div>
			<div v-else class="button next-button" v-on:click="restart">
				<!-- RESTART BUTTON SVG STARTS -->
				<svg class="button-icon" stroke-linecap="round" stroke-width="20%" v-bind:stroke="currentConfig.arrowColor?currentConfig.arrowColor:'rgb(0,0,0)'" stroke-opacity="0.4" fill="none" stroke-linejoin="round" viewBox="0 0 109 101" xmlns="http://www.w3.org/2000/svg">
					<g transform="translate(-61 -93)">
					<g transform="translate(-14 -12)">
					<g transform="rotate(-37 110 69)">
					<path d="m97 179-12 31m12-31-31-14m31 14a41 41 0 0 1-55-2 41 41 0 0 1-5-55 41 41 0 0 1 54-11" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" style="paint-order:normal"/>
					</g>
					</g>
					</g>
				</svg>
				<!-- RESTART BUTTON SVG ENDS -->

			</div>
		</div>
		</transition>
	</div>
</template>

<script>
/* eslint-disable */
import { TweenMax, TimelineMax, Back, Power4 } from 'gsap';
import AnimatedHollowMask from './AnimatedHollowMask.vue'
import AnimatedTitlePage from './AnimatedTitlePage.vue'
import { Split } from '../tools/split.js'

export default {
	name: 'ImageFrame',
	props: {
		pagesConfig: {
			type: Array,
			required: true
		},
		backgroundMusic: {
			type: String
		},
		titlePageConfig: {
			type: Object,
			default: function(){ return {
				mainTitle: "",
				subTitles: [''],
				textStyle: {}
			}}
		}
	},
	components: {
		AnimatedHollowMask,
		AnimatedTitlePage
	},
	created: function() {
		// initialize the firstTime array
		for (var i=0; i<this.pagesConfig.length; i++)
			this.firstTime.push(true);
	},
	mounted: function() {
		/* load music but not play yet */
		if (this.backgroundMusic) {
			this.music = new Audio();
			this.music.src = this.backgroundMusic;
			this.music.load();
		}
		const { titlePage } = this.$refs;
		const tl = new TimelineMax();
		tl.add(titlePage.appear());
	},
	data() { return {
		currentIdx: 0,
		config: this.pagesConfig,
		music: null,
		firstTime: [], // indicating whether it is the first time viewing each page
	}},
	methods: {
		/* initialize animation */
		startAll() {
			// play music
			if (this.music) {
				// eslint-disable-next-line
				// console.log("Playing music...");
				this.music.play();
			}
			// entrance animation
			const { mask, titlePage } = this.$refs;
			const tl = new TimelineMax();
			tl.add(titlePage.disappear());
			tl.add(mask.appear());
			tl.add(mask.disappear());
			tl.add(this.getFirstTimeTextAnimation(), '+=1.5');
			tl.add(this.getButtonAnimation());
			this.firstTime[0] = false;
		},
		/* flipping pages */
		nextPage() {
			if (++this.currentIdx >= this.config.length)
				this.currentIdx = 0;
		},
		prevPage() {
			if (--this.currentIdx < 0)
				this.currentIdx = this.config.length-1;
		},
		restart() {
			this.currentIdx = 0;
		},
		/* timeline utilities */
		getButtonAnimation() {
			const tl = new TimelineMax();
			tl.from('.next-button', 3, {
				x: -30,
				autoAlpha: 0,
				ease: Power4.easeOut
			}, '+=1.5');
			tl.from('.prev-button', 3, {
				x: 10,
				autoAlpha: 0,
				ease: Power4.easeOut
			}, '-=.5');
			tl.to('.button-icon', 2, {
				repeat: -1,
				repeatDelay: 3,
				yoyo: true,
				'stroke-opacity': 0,
			}, '+=8');
			return tl;
		},
		getLastPageButtonAnimation() {
			const tl = new TimelineMax();
			tl.from('.next-button .button-icon', 3, {
				'transform-origin': 'center',
				'transform': 'rotateZ(45deg)',
				autoAlpha: 0,
				ease: Power4.easeOut
			}, '+=1.5');
			tl.from('.prev-button', 3, {
				x: 10,
				autoAlpha: 0,
				ease: Power4.easeOut
			}, '-=.5');
			tl.to('.button-icon', 2, {
				repeat: -1,
				repeatDelay: 3,
				yoyo: true,
				'stroke-opacity': 0,
			}, '+=8');
			return tl;
		},
		getFirstTimeTextAnimation() {
			const { text, mainContent } = this.$refs;
			// split text to lines
			const split = new Split(text);
			split.splitToLines();
			const lines = split.getLines();
			// emphasize the first letter of the first line
			lines[0].classList.add("emphasize-first-letter");
			const tl = new TimelineMax();
			tl.set(mainContent, {
				autoAlpha: 1,
				immediateRender: false,
			})
			tl.set(mainContent, {
				perspective: '200px',
			})
			tl.addLabel("startShowingText")
			// fade-in background
			tl.from(text, 2, {
				autoAlpha: 0
			})
			// animate each line
			tl.staggerFrom(lines, 2, { 
				//x: -20, 
				transform: 'rotateY(25deg) rotateZ(25deg) rotateX(90deg)',
				scale: 5,
				autoAlpha: 0,
				ease: Back.easeInOut
			}, 2, "startShowingText");
			// un-splitting the text
			tl.add(()=>{split.restore()})
			return tl;
		},
		getTextAnimation() {
			const { text, mainContent } = this.$refs;
			const tl = new TimelineMax();
			tl.set(mainContent, {
				autoAlpha: 1,
				immediateRender: false,
			})
			tl.set(mainContent, {
				perspective: '200px',
			})
			tl.from(text, 2, { 
				//x: -20, 
				transform: 'rotateY(25deg) rotateZ(25deg) rotateX(90deg)',
				scale: 0,
				autoAlpha: 0,
				ease: Back.easeInOut
			});
			return tl;
		},
		/* js animation hooks */
		enter(el, done) {
			const tl = new TimelineMax();
			tl.eventCallback("onComplete", done);
			// add text animation
			if (this.firstTime[this.currentIdx]) // if first time
			{
				tl.add(this.getFirstTimeTextAnimation());
				this.firstTime[this.currentIdx] = false;
			}
			else {
				tl.add(this.getTextAnimation());
			}
			// add button animation
			if (this.currentIdx != this.config.length-1) {
				tl.add(this.getButtonAnimation())
			}
			else {
				tl.add(this.getLastPageButtonAnimation())
			}
		},
		beforeLeave() {
			const { fallback } = this.$refs;
			fallback.style.backgroundImage = `url(${this.currentConfig.imgUrl})`
		},
		leave(el, done) {
			const tl = new TimelineMax();
			tl.eventCallback("onComplete", done);
			const { mainContent } = this.$refs;
			// smoothly hide the background element
			// kick the element to the GPU 
			// source: https://greensock.com/forums/topic/7842-greensock-slow-on-mobile-devices/
			tl.set(mainContent, {
				z: 0.1
			})
			tl.to(mainContent, 1.5, {
				autoAlpha: 0,
			});
		},
	},
	computed: {
		nextIndex: function() {
			return this.currentIdx == this.config.length-1 ?
				0 :
				this.currentIdx+1;
		},
		bgImageStyle: function() {
			return {
				'background-image': `url(${this.currentConfig.imgUrl})`
			}
		},
		currentConfig: function() {
			return this.config[this.currentIdx];
		},
	}
}
</script>
<style>
/* Global style for new tags generated by javascript */
.emphasize-first-letter::first-letter {
	font-size: 2.5em;
	margin-right: .15em;
}
</style>
<style scoped>

/* Background Image */
.background {
	height: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	overflow-x: hidden;
	overflow-y: hidden;
}
/* Text */
.text {
	font-size: 5vw;
	font-family: Tahoma, Helvetica, Arial, "Microsoft Yahei","微软雅黑", STXihei, "华文细黑", sans-serif;
	position: absolute;
	max-width: 40vh;
	line-height: 1.8em;
	padding: 2rem;
	margin: 0;
}

/* The buttons */
.button {
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
	position: fixed;
	top: 0;
	height: 100%;
	text-align: right;
	cursor: pointer;
}
.next-button {
	right: 0;
}
.prev-button {
	left: 0;
}
.button-icon {
	width: 20vw;
	height: auto;
}
</style>
