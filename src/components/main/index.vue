<template>
	<div class="container">
		<div class="header">
			<v-head :models="models" :hasLogin="username" v-if="models"></v-head>
		</div>
		<div class="body">
			<router-view></router-view>	
		</div>
		<div class="footer">		
			<v-foot :footInfo="footInfo" v-if="footInfo"></v-foot>
		</div>
	</div>
</template>

<script>
	import header from "../common/header.vue";
	import footer from "../common/footer.vue";
	export default {
		components: {
			"v-head": header,
			"v-foot": footer
		},
		data: function() {
			return {
				models: null,
				footInfo: null,
				username: null
			}
		},
		created: function() {
			this.$http.get("/api/main").then(res => {
				var res = res.body;
				this.models = res.models;
				this.footInfo = res.footInfo;
				this.username = localStorage.getItem("username");
				this.$store.commit("getUsername", this.username);
				this.username = this.$store.state.username;
			});
		},
		watch: {
			$route: function() {
				this.username = localStorage.getItem("username");
			},
			"$store.state.username": function(val) {
				localStorage.setItem("username", val);
				this.username = val;
			}
		}
	}
</script>

<style scoped>

	.container {
		width: 100%;
		min-height: 100vh;
		min-height: 100%;	
		display: flex;
		flex-flow: column;
	}
	.body {
		
	}
	.footer {
		
	}
</style>