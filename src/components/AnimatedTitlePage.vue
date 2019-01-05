<template>
	<div ref="titlePage" class="title-page">
		<h1>Happy Birthday</h1>
		<!-- change the action to emit when modularized as a component -->
		<button v-on:click="$emit('start-button-clicked')">Click me</button>
	</div>
</template>
<script>
// eslint-disable-next-line
import { TweenMax, TimelineMax, Power4 } from 'gsap';
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
	methods: {
		appear() {
			const { titlePage } = this.$refs;
			const tl = new TimelineMax();
			tl.set(titlePage, {
				display: 'block',
				immediateRender: false
			})
			return tl;
		},
		disappear() {
			const { titlePage } = this.$refs;
			const tl = new TimelineMax();
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
.title-page {
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 16;
	background-color: black;
}
</style>
