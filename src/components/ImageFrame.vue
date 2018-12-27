<template>
	<transition appear
	v-on:enter="enter"
	v-on:leave="leave"
	mode="out-in"
	v-bind:css="false" >
	<div class="bg" ref="bg" v-bind:key="currentConfig.key" v-bind:style="bgImageStyle">
		<pre class="text" ref="text" v-bind:style="currentConfig.textStyle">{{currentConfig.text}}</pre>
		<div class="button prev-button" v-on:click="prevPage">Previous</div>
		<div class="button next-button" v-on:click="nextPage">
			<svg style="width:50%;height:100%;" viewBox="0 0 5 6" stroke-linecap="round" stroke-width="1" stroke="rgba(0,0,0,.2)" fill="none" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
				<path d="M1,0L4,3L1,6" ></path>
			</svg>
		</div>
	</div>
	</transition>
</template>

<script>
import { TimelineLite, Back } from 'gsap';
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
			const { text, bg } = this.$refs;
			const timeline = new TimelineLite();
			timeline.from(bg, 1, {
				opacity: 0
			})
			timeline.to(text, 1, { 
				x: 20, 
				ease: Back.easeInOut
			});
			timeline.eventCallback("onComplete", done)
		},
		leave(el, done) {
			const { text, bg } = this.$refs;
			const timeline = new TimelineLite();
			timeline.to(text, 1, {
				x: -20,
				ease: Back.easeInOut
			})
			timeline.to(bg, 1, {
				opacity: 0
			})
			timeline.eventCallback("onComplete", done)

		},

	},
	computed: {
		bgImageStyle: function() {
			return {
				'background-image': `url(${this.config[this.currentIdx].imgUrl})`
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
	font-size: 2rem;
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
	line-height: 100%;
	display: table;
	text-align: center;
	cursor: pointer;
}
.next-button {
	right: 0;
}
.prev-button {
	left: 0;
}
</style>
