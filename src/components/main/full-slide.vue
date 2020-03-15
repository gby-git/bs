<template>
	<div class="full-slide">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div v-for="item in imgs" class="swiper-slide"><img :src="item.src" alt="" width="100%" height="100%" /></div>
			</div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
	</div>

</template>

<script>
	
	export default {
		props: {
			imgs: {
				type: Array,
				default: function() {
					return [{
						src: "./static/img/slide1.jpg"
					}, {
						src: "./static/img/slide2.jpg"
					}, {
						src: "./static/img/slide1.jpg"
					}, {
						src: "./static/img/slide2.jpg"
					}];
				}
			}
		},
		components: {
			
		},
		created: function() {
			this.$nextTick(function() {
				var swiper = new Swiper(".swiper-container", {
					loop: true,
					nextButton: ".swiper-button-next",
					prevButton: ".swiper-button-prev",
					autoplay: 4000
				});
			});

		}
	};
</script>

<style>
	.swiper-container {
		width: 100%;
		height: 400px;
	}
	
	.swiper-pagination-bullet {
		width: 1.4rem;
		height: 1.4rem;
	}
	
	.swiper-pagination-bullet-active {
		color: #f60;
	}
</style>