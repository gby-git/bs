<template>
	<div>
		<div class="progress_wrap">
			<v-progress :stat="stepNum"></v-progress>
		</div>
		<div class="upload_wrap">
			<router-view @getStep="changeStep"></router-view>
		</div>
	</div>
</template>

<script>
	import progress from "./progress.vue"
	import houseInfo from "./houseInfo.vue"
	export default {
		components: {
			"v-progress": progress
		},
		data: function() {
			return {
				stepNum: 0
			}
		},
		methods: {
			changeStep: function(val) {
				this.stepNum = val;
			}
		},
		created: function() {
			if (localStorage.getItem("status") == null) {
				this.$router.push("/login");
				return;
			}else if (localStorage.getItem("status") === "0") {
				this.$router.push("/tip");
				return;
			}
			this.$http.get("/api/landlord").then( res => {
				var response =  res.body ;
				this.$store.commit("getHouseType", response.roomType);
				this.$store.commit("getHouseArea", response.place);
				if (response.error === 0 ) {
					this.stepNum = response.step;
					
				}else {
					alert("出错")
				}
				if (response.step === 0) {
					return;
				}else if(response.step === 1) {					
					this.$router.push("/landlord/step2");
				}else if (response.step === 2) {
					this.$router.push("/landlord/step3");
				}
			});
		}
	};
</script>

<style scoped>
	.progress_wrap {
		width: 80%;
		margin: 0 auto;
		border: 1px solid #999;
		padding: 1rem 2rem;
	}
	
	.upload_wrap {
		width: 80%;
		margin: 0 auto;
		border: 1px solid #999;
		padding-bottom: 50px;
	}
</style>