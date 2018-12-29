<template>
	<div id="app">
		<loading-page v-if="!imagesLoaded"></loading-page>
		<image-frame v-else v-bind:pages-config="pagesConfig"></image-frame>
	</div>
</template>

<script>
import ImageFrame from './components/ImageFrame.vue'
import LoadingPage from './components/LoadingPage.vue'
import rocks from './assets/img/rocks.jpg'
import bug from './assets/img/bug.jpg'
import millipede from './assets/img/millipede.jpg'
import cloud from './assets/img/cloud.jpg'
const imageUrls = [
	rocks,
	bug,
	millipede,
	cloud
]

export default {
	name: 'app',
	components: {
		ImageFrame,
		LoadingPage
	},
	created: function() {
		let imagesPromise = [];
		for (let i=0; i<imageUrls.length; i++)
			imagesPromise.push(this.preload(imageUrls[i]));
		Promise.all(imagesPromise).then(()=>{
			this.imagesLoaded = true;
		})
	},
	data() { return {
		imagesLoaded: false,
		pagesConfig: [
			{
				key: 'rocks',
				imgUrl: rocks,
				text: `“大山可以挪开\n 小山可以迁移\n 但我的慈爱必不离开你\n 我平安的约也不迁移。”\n这是怜恤你的主说的。`,
				textStyle: {
					'top': '20%',
					'color': 'lightblue',
					'text-shadow': '1px 1px black'
				},
			},
			{
				key: 'bug',
				imgUrl: bug,
				text: `你出来必不至急忙\n           也不至奔逃\n因为耶和华必在你前头行；\n以色列的神必作你的后盾。`,
				textStyle: {
					'bottom': '5%',
					'left': '10%',
					'color': 'yellow',
					'text-shadow': '1px 2px grey'
				}
			},
			{
				key: 'millipede',
				imgUrl: millipede,
				text: `祂必用自己的翎毛遮蔽你\n你要投靠在祂的翅膀底下。\n祂的诚实是大小的盾牌。`,
				textStyle: {
					'top': '10%',
					'color': 'white',
					'text-shadow': '2px 2px #996633'
				},
				arrowColor: 'white'
			},
			{
				key: 'cloud',
				imgUrl: cloud,
				text: `在你的一生中\n    必有恩惠和慈爱随着你\n你且要住在耶和华的殿中\n                   直到永远。`,
				textStyle: {
					'top': '10%',
					'left': '10%',
					'color': '#eafaff',
					'text-shadow': '1px 1px black'
				}
			},
			/*
			{
				key: 'cloud',
				imgUrl: cloud,
				text: `在你的一生中\n必有恩惠和慈爱随着你\n你且要住在耶和华的殿中\n直到永远。`,
				textStyle: {
					top: '10%',
					left: '20%'
				}
			},
			*/
		]
	} },
	methods: {
		preload: function(url) {
			return new Promise((resolve, reject)=>{
				const img = new Image();
				img.src = url;
				img.onload = ()=>{
					resolve(img);
				}
				img.onerror = ()=>{
					reject(`Error: Failed to load image at ${url}`);
				}
			})
		},
	}
}
</script>
<style>
body, html, #app
{
	height: 100%;
	margin: 0;
}
</style>
