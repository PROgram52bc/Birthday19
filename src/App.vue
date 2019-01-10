<template>
	<div id="app">
		<loading-page v-if="!imagesLoaded"></loading-page>
		<image-frame v-else 
				v-bind:title-page-config="titlePageConfig"
				v-bind:background-music="musicUrl" 
				v-bind:pages-config="pagesConfig"></image-frame>
	</div>
</template>

<script>
import ImageFrame from './components/ImageFrame.vue'
import LoadingPage from './components/LoadingPage.vue'
import rocks from './assets/img/rocks.jpg'
import bug from './assets/img/bug.jpg'
import millipede from './assets/img/millipede.jpg'
import insect from './assets/img/insect.jpg'
import cloud from './assets/img/cloud.jpg'
import grass from './assets/img/grass.jpg'
import music from './assets/audio/By_Faith_64kbps.mp3'
const imageUrls = [
	rocks,
	bug,
	millipede,
	insect,
	cloud,
	grass
]

export default {
	name: 'app',
	components: {
		ImageFrame,
		LoadingPage
	},
	created: function() {
		let resourcePromises = [];
		for (let i=0; i<imageUrls.length; i++)
			resourcePromises.push(this.preloadImg(imageUrls[i]));
		resourcePromises.push(this.preloadAudio(music));
		Promise.all(resourcePromises).then(()=>{
			this.imagesLoaded = true;
		})
	},
	data() { return {
		imagesLoaded: false,
		musicUrl: music,
		titlePageConfig: {
			mainTitle: '祝你生日快乐',
			subTitles: [
				'🎂🎂🎂🎂',
				'2019-1-19',
			],
		},
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
				key: 'insect',
				imgUrl: insect,
				text: `你或向左或向右\n必听见后边有声音说：\n“这是正路，要行在其间。”`,
				textStyle: {
					'top': '5%',
					'color': '#eafaff',
					'text-shadow': '1px 1px black'
				},
				arrowColor: 'white'
			},
			{
				key: 'cloud',
				imgUrl: cloud,
				text: `在你的一生中\n    必有恩惠和慈爱随着你\n你也要住在耶和华的殿中\n                   直到永远。`,
				textStyle: {
					'top': '10%',
					'left': '10%',
					'color': '#eafaff',
					'text-shadow': '1px 1px black'
				}
			},
			{
				key: 'reference',
				imgUrl: grass,
				text: `愿主的恩典常与你同在!\n\nReferences:\n赛54:10, 52:12, 诗91:4, 赛30:21, 诗23:6\nMusic: By Faith`,
				textStyle: {
					'position': 'relative',
					'top': '10%',
					'text-align': 'center',
					'margin': '0 auto',
					'background': 'rgba(165, 176, 67, .5)',
					'border-radius': '15px',
					'font-size': '.8em'
				}
			},
		]
	} },
	methods: {
		preloadImg: function(url) {
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
		preloadAudio: function(url) {
			return new Promise((resolve)=>{
				const audio = new Audio();
				audio.src = url;
				audio.oncanplaythrough = ()=>{
					resolve(audio);
				}
			})
		}
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
