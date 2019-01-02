<template>
	<div class="background" ref="fallback" style="background-color:black">
		<!-- TITLE PAGE STARTS -->
		<div ref="titlePage">
		</div>
		<!-- TITLE PAGE ENDS -->
		<!-- MASK DIV STARTS -->
		<div ref="maskDiv" class="mask-div">
			<!-- MASK SVG STARTS -->
			<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" ref="maskBack" fill="black" width="100vw" height="100vh" xmlns="http://www.w3.org/2000/svg">
				<mask id="mask-mask">
				<rect x="0" y="0" width="100" height="100" fill="white"></rect>
				<circle ref="maskHollow" cx="50%" cy="50%" r="70%" fill="black"></circle>
				</mask>
				<rect x="0" y="0" width="100%" height="100%" mask="url(#mask-mask)"></rect>
			</svg>
			<!-- MASK SVG ENDS -->
		</div> <!-- ref="maskDiv" class="mask-div"-->
		<!-- MASK DIV ENDS -->
		<transition 
			mode="out-in" 
			v-on:enter="enter" 
			v-on:leave="leave" 
			v-on:before-leave="beforeLeave" 
			v-bind:css="false">
		<div class="background" ref="mainContent" v-bind:key="currentConfig.key" v-bind:style="bgImageStyle">
			<pre class="text" ref="text" v-bind:style="currentConfig.textStyle">{{currentConfig.text}}</pre>
			<div v-if="currentIdx!=0" class="button prev-button" v-on:click="prevPage">
				<!-- PREV BUTTON SVG STARTS -->
				<svg class="button-icon" stroke-linecap="round" stroke-width="1" v-bind:stroke="currentConfig.arrowColor?currentConfig.arrowColor:'rgb(0,0,0)'" stroke-opacity="0.2" fill="none" stroke-linejoin="round" viewBox="0 0 5 6" xmlns="http://www.w3.org/2000/svg">
					<path d="M4,0L1,3L4,6" ></path>
				</svg>
				<!-- PREV BUTTON SVG ENDS -->
			</div>
			<div v-if="currentIdx!=config.length-1" class="button next-button" v-on:click="nextPage">
				<!-- NEXT BUTTON SVG STARTS -->
				<svg class="button-icon" stroke-linecap="round" stroke-width="1" v-bind:stroke="currentConfig.arrowColor?currentConfig.arrowColor:'rgb(0,0,0)'" stroke-opacity="0.2" fill="none" stroke-linejoin="round" viewBox="0 0 5 6" xmlns="http://www.w3.org/2000/svg">
					<path d="M1,0L4,3L1,6" ></path>
				</svg>
				<!-- NEXT BUTTON SVG ENDS -->
			</div>
			<div v-else class="button next-button" v-on:click="restart">
				<!-- RESTART BUTTON SVG STARTS -->
				<svg class="button-icon" stroke-linecap="round" stroke-width="20%" v-bind:stroke="currentConfig.arrowColor?currentConfig.arrowColor:'rgb(0,0,0)'" stroke-opacity="0.2" fill="none" stroke-linejoin="round" viewBox="0 0 109 101" xmlns="http://www.w3.org/2000/svg">
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
import { TweenMax, TimelineMax, Back, Power4 } from 'gsap';
export default {
	name: 'ImageFrame',
	props: {
		pagesConfig: {
			type: Array,
			required: true
		},
		backgroundMusic: {
			type: String
		}
	},
	mounted: function() {
		// load music
		if (this.backgroundMusic) {
			this.music = new Audio();
			this.music.src = this.backgroundMusic;
			this.music.load();
		}
		// entrance animation
		const tl = new TimelineMax();
		tl.add(this.getMaskAppearAnimation());
		tl.add(this.getMaskDisappearAnimation());
		tl.add(this.getPageAnimation());
	},
	data() { return {
		currentIdx: 0,
		config: this.pagesConfig,
		music: null,
	}},
	methods: {
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
		getPageAnimation() {
			const { text, mainContent } = this.$refs;
			const tl = new TimelineMax();
			tl.set(mainContent, {
				autoAlpha: 1,
				immediateRender: false,
			})
			tl.add(TweenMax.from(text, 2, { 
				x: -20, 
				autoAlpha: 0,
				ease: Back.easeInOut
			}));
			tl.add(TweenMax.from('.next-button', 3, {
				x: -30,
				autoAlpha: 0,
				ease: Power4.easeOut
			}), '+=1.5');
			tl.add(TweenMax.from('.prev-button', 3, {
				x: 10,
				autoAlpha: 0,
				ease: Power4.easeOut
			}), '-=.5');
			tl.add(TweenMax.fromTo('.button-icon', 2, 
				{
					'stroke-opacity': .4,
				},
				{
					repeat: -1,
					repeatDelay: 3,
					yoyo: true,
					'stroke-opacity': 0,
				}), '+=8');
			return tl;
		},
		getMaskAppearAnimation() {
			const tl = new TimelineMax();
			const { maskDiv } = this.$refs;
			tl.set(maskDiv, {
				display: 'block',
				immediateRender: false
			})
			return tl;
		},
		getMaskDisappearAnimation() {
			const { maskHollow, maskDiv } = this.$refs;
			const tl = new TimelineMax();
			// transition the circle to expand
			tl.add(TweenMax.fromTo(maskHollow, 3, {
				scale: 0,
				transformOrigin: "center",
			},{
				ease: Power4.easeIn,
				scale: 1,
				transformOrigin: "center",
			}))
			tl.add(TweenMax.fromTo(maskDiv, 3, {
				opacity: 1,
			},{
				opacity: .7,
				ease: Power4.easeIn,
			}),'-=3')
			tl.set(maskDiv, {
				display: 'none'
			})
			return tl;
		},
		/* js animation hooks */
		// eslint-disable-next-line
		enter(el, done) {
			const tl = this.getPageAnimation();
			tl.eventCallback("onComplete", done);
			tl.play();

			// trick: preloading the next image into memory to make the transition smooth
			const { fallback } = this.$refs;
			fallback.style.backgroundImage = `url(${this.config[this.nextIndex].imgUrl})`
		},
		beforeLeave() {
			const { fallback } = this.$refs;
			fallback.style.backgroundImage = `url(${this.currentConfig.imgUrl})`
		},
		// eslint-disable-next-line
		leave(el, done) {
			const tl = new TimelineMax();
			const { mainContent } = this.$refs;
			// smoothly hide the background element
			tl.to(mainContent, .5, {
				autoAlpha: 0,
			});
			tl.eventCallback("onComplete", done);
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
<style scoped>

/* Background Image */
.background {
	height: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
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
	z-index: 10;
	position: fixed;
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
	height: 100vh;
}
/* The mask */
.mask-div {
	display: none;
	position: fixed; 
	z-index: 15; 
	width: 100vmax; 
	height: 100vmax;
}
</style>
