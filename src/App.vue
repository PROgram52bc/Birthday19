<template>
	<div id="app">
		<image-frame v-bind:pages-config="pagesConfig"></image-frame>
	</div>
</template>

<script>
import ImageFrame from './components/ImageFrame.vue'
import rocks from './assets/img/rocks.jpg'
import bug from './assets/img/bug.jpg'

export default {
	name: 'app',
	components: {
		ImageFrame
	},
	data() { return {
		pagesConfig: [
			{
				imgUrl: rocks,
				text: '"大山可以挪开，小山可以迁移，但我的慈爱必不离开你，我平安的约也不迁移。"这是怜恤你的主说的。',
				textStyle: {
					top: '10%',
					left: '20%'
				}
			},
			{
				imgUrl: bug,
				text: '你出来必不至急忙，也不至奔逃，因为耶和华必在你前头行；以色列的神必作你的后盾。',
				textStyle: {
					top: '10%',
					left: '20%'
				}
			},
			/*
			{
				imgUrl: bug,
				text: '大山可以挪开，小山可以迁移，但我的慈爱必不离开你',
				textStyle: {
					top: '10%',
					left: '20%'
				}
			},
			*/
		]
	} }
}
</script>
<style>
body, html, #app
{
	height: 100%;
	margin: 0;
}
</style>
