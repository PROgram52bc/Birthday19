<template>
	<div ref="titlePage" class="title-page" v-bind:style="`background-color:${backgroundColor}`">
		<div class="upper-container">
			<h1 class="title main-title" ref="mainTitle" v-bind:style="textStyle">{{mainTitle}}</h1>
			<h2 class="title sub-title" ref="subTitle" v-bind:style="textStyle" v-for="subTitle in subTitles" v-bind:key="subTitle">{{subTitle}}</h2>
		</div>
		<div class="lower-container">
			<div class="button" ref="button" v-on:click="$emit('start-button-clicked')">
                <svg height="30vh" version="1.1" viewBox="0 0 99 113" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(2 0)">
                    <g transform="translate(-58,-89)" fill="#f1f6f7" stroke="#7f7f7f">
                    <path transform="scale(-1,1)" d="m-62 196-88-51 88-51z" fill="#f1f6f7" fill-rule="evenodd" stroke="#7f7f7f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1" stroke-width="9" style="paint-order:normal"/>
                    </g>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>
<script>
// eslint-disable-next-line
import { Back, TweenMax, TimelineMax, Power4 } from 'gsap';
export default {
/* animated components:
has dependency on the gsap package.
contains two methods
1. appear()
2. disappear()
which should be called by parent of the component on demand
In case multiple animation needed to be conducted in sequence,
use the .add() method to add the timeline returned from appear() or disappear() to a parent timeline.

By default, this component displays nothing, until the appear() method is called
*/
	name: 'AnimatedTitlePage',
	props: {
		mainTitle: { 
			type: String,
			default: 'Main title'
		},
		subTitles: { 
			type: Array,
			default: function() { return [ 'subtitleline1', 'line2' ]; }
		},
		textStyle: {
			type: Object,
		},
		backgroundColor: {
			type: String,
		},
	},
	methods: {
		appear() {
			// eslint-disable-next-line
			const { button, titlePage, mainTitle, subTitle } = this.$refs;
			const tl = new TimelineMax();
			tl.set(titlePage, {
				display: 'block',
				immediateRender: false
			})
			tl.staggerFrom([mainTitle, ...subTitle, button], 6, {
				opacity: 0
			}, 1)
		//	tl.from(button, .5, {
		//		scale: 0,
		//		ease: Back.easeOut,
		//		transformOrigin: '50% 50%'
		//	})
			return tl;
		},
		disappear() {
			const { button, titlePage, mainTitle, subTitle } = this.$refs;
			const tl = new TimelineMax();
			tl.to(button, .5, {
				scale: 0,
				ease: Back.easeIn,
				transformOrigin: '50% 50%'
			})
			tl.to([mainTitle, ...subTitle], 1, {
				autoAlpha: 0
			}) 
			tl.set(titlePage, {
				display: 'none',
				immediateRender: false
			})
			return tl;
		},
	}
}
</script>
<style scoped>
/* containers */
.title-page {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 16;
	background-color: black;
}
.upper-container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 50vh;
}
.lower-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 50vh;
}

.title {
	display: flex;
	justify-content: center;
	font-family: Tahoma, Helvetica, Arial, "Microsoft Yahei","微软雅黑", STXihei, "华文细黑", sans-serif;
	flex-shrink: 2;
	color: transparent;
}
.main-title {
	padding: 10px;
	text-shadow: 0 0 2px white, 0 0 5px white, 0 0 7px white, 0 0 40px #3cb8d7, 0 0 70px #3cb8d7, 0 0 80px #3cb8d7, 0 0 100px #3cb8d7;
	font-size: 8vh;
	margin-top: 1em;
	margin-bottom: 1em;
}
.sub-title {
	text-shadow: 0 0 2px white, 0 0 5px white, 0 0 7px white, 0 0 40px #ffc0cb, 0 0 70px #ffc0cb, 0 0 80px #ffc0cb, 0 0 100px #ffc0cb;
	font-size: 7vh;
}
.button {
	display: flex;
	justify-content: center;
	cursor: pointer;
	flex-shrink: 3;
}
.button svg {
    filter: 
    drop-shadow(0 0 2px white)
    drop-shadow(0 0 5px white)
    drop-shadow(0 0 7px white)
    drop-shadow(0 0 20px white)
    drop-shadow(0 0 40px white)
    /*
    drop-shadow(0 0 100px white);
    */
}

</style>
