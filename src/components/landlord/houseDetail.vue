<template>
	<div>
		<form action="" @submit.prevent="sendHouseInfo">
			<div class="house_list">
				<h2>房屋图片上传</h2>
				<div class="pic_list" >
					<img :src="item" alt=""  v-for="item in picSrc"/>
					<div class="pic_add">
						<label for="houseDetailPic" class="pic_label">
							<input type="file" name="housePicture" accept="image/png, image/jpg, image/jpeg" multiple id="houseDetailPic" @change="addPic($event)"/>
							<span class="transverse"></span>
							<span class="vertical"></span>
						</label>
					</div>
				</div>
			</div>
			<div class="house_list">
				<h2>房屋基础设施选择</h2>
				<ul class="facilities clearfix" v-if="facilities">
					<li v-for="(item,index) in facilities">
						<label>
							<input type="checkbox" name="checklist" :value="item.id" v-model="checkedNames" />
							{{item.name}}
						</label>
					</li>
				</ul>
			</div>
			
			<div class="submit">
				<input type="submit" value="确认提交"/>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				facilities: null,
				checkedNames: [],
				picSrc: []
			}
		},
		created: function() {
			this.$emit("getStep", 1);
			this.$http.get("/api/facilities").then(response => {
				var res = response.body;
				this.facilities = res;
			});
		},
		methods: {
			test: function() {
				console.log(this.checkedNames)
			},
			addPic: function(e) {
				var files = e.target.files;
				var formData = new FormData();
				for(var i = 0; i < files.length; i ++) {
					if (files[i].size > 1024*1024*5) {
						alert("图片大小超过限制");
						continue;
					}else if (files[i].type !== "image/png" && files[i].type !== "image/jpg" && files[i].type !== "image/jpeg") {
						alert("图片类型不正确");
						continue;
					}
					formData.append(i, files[i]);
				};
				this.$http.post("/api/housePic", formData).then(res => {
					res.body.forEach(val => {
						this.picSrc.push(val);
					});
					
				});

			},
			sendHouseInfo: function() {
				var data ={};
				data.picture = this.picSrc;
				data.facilities = this.checkedNames;
				data.homeId = this.$store.state.homeId;
				this.$http.post("/api/getHouseInfo", data).then(res => {
					if (res.body.error === 0) {
						this.$router.push({path: "/landlord/step3"});
					}else {
						alert("出错")
					}
				});

			}
		}
	};
</script>

<style scoped>
	.house_list {
		padding: 2rem;
		position: relative;
	}
	
	.house_list:not(:last-child) {
		margin-bottom: 25px;
	}
	
	.house_list>h2 {
		font-size: 1.2rem;
		font-weight: normal;
		color: #666666;
	}
	.house_list .pic_label:hover {
		background: #f4f4f4;
		cursor: pointer;
	}
	.house_list .pic_label input {
		display: none;
	}
	.pic_list {
		width: 100%;
		min-height: 350px;
		border: 1px solid #ccc;
		margin-top: 1rem;
		padding: 3rem;
	}
	.pic_list img {
		width: 150px;
		height: 150px;
		margin-bottom: 2rem;
		border: 1px solid #ccc;
		vertical-align: top;
		margin-right: 20px;
	}
	.pic_add {
		width: 150px;
		height: 150px;
		border: 3px dotted #ccc;
		display: inline-block;
	}
	.pic_add .pic_label {
		width: 100%;
		height: 100%;
		position: relative;
		display: block;
	}
	.pic_add .transverse {
		width: 50%;
		height: 5px;
		background: #ccc;
		display: inline-block;
		position: absolute;
		top: 50%;
		left: 25%;
	}
	.pic_add .vertical {
		width: 5px;
		height: 50%;
		background: #ccc;
		display: inline-block;
		position: absolute;
		top: 25%;
		left: 50%;
	}
	.facilities {
		font-size: 0;
		padding: 2rem;
	}
	.facilities li {
		font-size: 1rem;
		display: inline-block;
		width: 20%;
		padding: 1rem 0;
	}
	.facilities li:hover {
		color: #588;
	}
	.facilities li  input {
		vertical-align: -2px;
	}
	.submit {
		text-align: center;
		margin-bottom: 2rem;
	}
	.submit input {
		padding: 1rem 3rem;
		border: 1px solid #ccc;
		background: #458;
		color: #fff;
		border-radius: 5px;
		cursor: pointer;
	}
	.submit input:hover {
		background: #45a;
	}
</style>