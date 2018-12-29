<template>
	<div class="bg" ref="fallback" style="background-color:black">
		<transition 
			appear 
			mode="out-in" 
			v-on:enter="enter" 
			v-on:leave="leave" 
			v-on:before-leave="beforeLeave" 
			v-bind:css="false">
		<div class="bg" ref="bg" v-bind:key="currentConfig.key" v-bind:style="bgImageStyle">
			<pre class="text" ref="text" v-bind:style="currentConfig.textStyle">{{currentConfig.text}}</pre>
			<div v-if="currentIdx!=0" class="button prev-button" v-on:click="prevPage">
				<svg class="button-icon" stroke-linecap="round" stroke-width="1" stroke="rgba(0,0,0,.2)" fill="none" stroke-linejoin="round" viewBox="0 0 5 6" xmlns="http://www.w3.org/2000/svg">
					<path d="M4,0L1,3L4,6" ></path>
				</svg>
			</div>
			<div class="button next-button" v-on:click="nextPage">
				<svg class="button-icon" stroke-linecap="round" stroke-width="1" stroke="rgba(0,0,0,.2)" fill="none" stroke-linejoin="round" viewBox="0 0 5 6" xmlns="http://www.w3.org/2000/svg">
					<path d="M1,0L4,3L1,6" ></path>
				</svg>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
import { TimelineLite, Back, Power2 } from 'gsap';
export default {
	name: 'ImageFrame',
	props: {
		pagesConfig: {
			type: Array,
			required: true
		}
	},
	mounted: function() {

	},
	data() { return {
		currentIdx: 0,
		config: this.pagesConfig
	}},
	methods: {
		nextPage() {
			if (++this.currentIdx >= this.config.length)
				this.currentIdx = 0;
		},
		prevPage() {
			if (--this.currentIdx < 0)
				this.currentIdx = this.config.length-1;
		},
		enter(el, done) {
			const { text } = this.$refs;
			const tl = new TimelineLite();
			tl.from(text, 1, { 
				x: -20, 
				autoAlpha: 0,
				ease: Back.easeInOut
			});
			tl.from('.next-button', 1, {
				x: -10,
				autoAlpha: 0,
				ease: Power2.easeOut
			})
			tl.from('.prev-button', 1, {
				x: 10,
				autoAlpha: 0,
				ease: Power2.easeOut
			}, '-=1')
			tl.eventCallback("onComplete", done)
			// trick: preloading the next image into memory to make the transition smooth
			const { fallback } = this.$refs;
			fallback.style.backgroundImage = `url(${this.config[this.nextIndex].imgUrl})`
		},
		beforeLeave() {
			const { fallback } = this.$refs;
			fallback.style.backgroundImage = `url(${this.currentConfig.imgUrl})`
		},
		leave(el, done) {
			const tl = new TimelineLite();
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
</style>
