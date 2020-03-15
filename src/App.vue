<template>
	<div id="app">
		<index @click.native="test"></index>
		
	</div>
</template>

<script>
	import index from "./components/main/index.vue"; 
	export default {
		components: {
			index: index
		},
		methods: {
			test() {
				//alert()
			}
		}
	};
</script>

<style>

</style>