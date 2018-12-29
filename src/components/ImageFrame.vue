<template>
	<div class="bg" ref="fallback" style="background-color:black">
		<div ref="maskDiv" class="mask-div" >
			<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" ref="maskBack" fill="black" width="100vw" height="100vh" xmlns="http://www.w3.org/2000/svg">
				<mask id="mask-mask">
				<rect x="0" y="0" width="100" height="100" fill="white"></rect>
				<circle ref="maskHollow" cx="50%" cy="50%" r="1%" fill="black"></circle>
				</mask>
				<rect x="0" y="0" width="100%" height="100%" mask="url(#mask-mask)"></rect>
			</svg>
		</div>
		<transition 
			mode="out-in" 
			v-on:enter="enter" 
			v-on:leave="leave" 
			v-on:before-leave="beforeLeave" 
			v-bind:css="false">
		<div class="bg" ref="bg" v-bind:key="currentConfig.key" v-bind:style="bgImageStyle">
			<pre class="text" ref="text" v-bind:style="currentConfig.textStyle">{{currentConfig.text}}</pre>
			<div v-if="currentIdx!=0" class="button prev-button" v-on:click="prevPage">
				<svg class="button-icon" stroke-linecap="round" stroke-width="1" v-bind:stroke="currentConfig.arrowColor?currentConfig.arrowColor:'rgb(0,0,0)'" stroke-opacity="0.2" fill="none" stroke-linejoin="round" viewBox="0 0 5 6" xmlns="http://www.w3.org/2000/svg">
					<path d="M4,0L1,3L4,6" ></path>
				</svg>
			</div>
			<div class="button next-button" v-on:click="nextPage">
				<svg class="button-icon" stroke-linecap="round" stroke-width="1" v-bind:stroke="currentConfig.arrowColor?currentConfig.arrowColor:'rgb(0,0,0)'" stroke-opacity="0.2" fill="none" stroke-linejoin="round" viewBox="0 0 5 6" xmlns="http://www.w3.org/2000/svg">
					<path d="M1,0L4,3L1,6" ></path>
				</svg>
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
		}
	},
	mounted: function() {
		/*
		const { maskBack, maskHollow, maskDiv } = this.$refs;
		const tl = new TimelineMax();
		tl.set(maskDiv, {
			display: 'block'

		})
			.to(maskHollow, 3, {
				ease: Power4.easeIn,
				scale: 70,
				transformOrigin: "50% 50%"
		})
			.to(maskBack, 3, {
				opacity: .7,
				ease: Power4.easeIn,
			}, '-=3')
			.set(maskDiv, {
				display: 'none'
		})
			.add(this.getPageAnimation());
			*/
	},
	data() { return {
		currentIdx: 0,
		config: this.pagesConfig
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
		/* timeline utilities */
		getPageAnimation() {
			const { text } = this.$refs;
			const tl = new TimelineMax();
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
		/* js animation hooks */
		enter(el, done) {
			const tl = this.getPageAnimation();
			tl.eventCallback("onComplete", done)
			tl.play();

			// trick: preloading the next image into memory to make the transition smooth
			const { fallback } = this.$refs;
			fallback.style.backgroundImage = `url(${this.config[this.nextIndex].imgUrl})`
		},
		beforeLeave() {
			const { fallback } = this.$refs;
			fallback.style.backgroundImage = `url(${this.currentConfig.imgUrl})`
		},
		leave(el, done) {
			const tl = new TimelineMax();
			tl.to(el, .5, {
				autoAlpha: 0,
			}).eventCallback('onComplete', done)
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

/* Background Image */
.bg {
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
