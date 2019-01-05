<template>
	<!-- MASK DIV STARTS -->
	<div ref="maskDiv" class="mask-div">
		<!-- MASK SVG STARTS -->
		<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" ref="maskBack" v-bind:fill="color" width="100vw" height="100vh" xmlns="http://www.w3.org/2000/svg">
			<mask id="mask-mask">
			<rect x="0" y="0" width="100" height="100" fill="white"></rect>
			<circle ref="maskHollow" cx="50%" cy="50%" r="70%" fill="black"></circle>
			</mask>
			<rect x="0" y="0" width="100%" height="100%" mask="url(#mask-mask)"></rect>
		</svg>
		<!-- MASK SVG ENDS -->
	</div> <!-- ref="maskDiv" class="mask-div"-->
	<!-- MASK DIV ENDS -->
</template>
<script>
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
import { TweenMax, TimelineMax, Power4 } from 'gsap';
export default {
	name: 'AnimatedHollowMask',
	props: {
		color: {
			type: String,
			default: 'black'
		}

	},
	methods: {
		appear() {
			const tl = new TimelineMax();
			const { maskHollow, maskDiv } = this.$refs;
			tl.set(maskHollow, {
				scale: 0,
				immediateRender: false
			})
			tl.set(maskDiv, {
				display: 'block',
				immediateRender: false
			})
			return tl;
		},
		disappear() {
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
	}
}
</script>
<style scoped>
.mask-div {
	display: none;
	position: fixed; 
	z-index: 15; 
	width: 100vmax; 
	height: 100vmax;
}
</style>
