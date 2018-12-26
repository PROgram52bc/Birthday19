<template>
	<div class="bg" v-bind:style="bgImageStyle">
		<h1 v-bind:style="textStyle">{{text}}</h1>
		<button class="next-button" v-on:click="nextPage">Next</button>
	</div>
</template>

<script>
export default {
	name: 'ImageFrame',
	props: {
		pagesConfig: Array
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

	},
	computed: {
		bgImageStyle: function() {
			return {
				'background-image': `url(${this.config[this.currentIdx].imgUrl})`
			}
		},
		textStyle: function() {
			return this.config[this.currentIdx].textStyle;
		},
		text: function() {
			return this.config[this.currentIdx].text;
		},
	}

}
</script>
<style>
.bg {
	height: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
.next-button {
	z-index: 10;
	position: relative;
	right: 0;
	top: 50%;
}
</style>
