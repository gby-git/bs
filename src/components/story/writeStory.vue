<template>
	<div>
		<form action="" @submit.prevent="sendMsg">
			<div class="house_list">
				<h2>上传一点图片</h2>
				<div class="pic_list" >
					<img :src="item" alt="" v-if="picSrc" v-for="item in picSrc"/>
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
				<h2>写一段故事的简介吧</h2>
				<div class="field"><input type="text" required placeholder="在这里输入简介..." v-model="shortTitle"/></div>
			</div>
			<div class="house_list">
				<h2>给你的故事加个标题吧</h2>
				<div class="field"><input type="text" required placeholder="在这里输入标题..." v-model="title"/></div>
			</div>
			<div class="house_list">
				<h2>这是你故事的内容</h2>
				<div class="field"><textarea name="" id="" v-model="content"></textarea></div>
			</div>
			<div class="submit">
				<input type="submit" value="确认提交" />
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
//				imgs: [],
				title: "",
				content: "",
				shortTitle: "",
				picSrc: []
				
			};
		},
		methods: {
			sendMsg: function() {
				var info = {
					picture: this.picSrc,
					title: this.title,
					shortTitle: this.shortTitle,
					paragraph: this.content
				};
				this.$http.post("/api/writeStory", info).then(res => {
					if (res.body.error === 0) {
						this.$router.push("/story/" + res.body.href);
					}
				});
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
				this.$http.post("/api/storyPic", formData).then(res => {
					console.log(res.body)
					res.body.forEach(val => {
						this.picSrc.push(val);
					});
					
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
		font-weight: normal;
		color: #008489;
		margin: 1rem 0;
		text-align: center;
	}
	
	.house_list .pic_label:hover {
		background: #f4f4f4;
		cursor: pointer;
	}
	
	.house_list .field {
		text-align: center;
	}
	
	.house_list .field input {
		width: 300px;
		height: 30px;
		line-height: 30px;
		padding-left: 1.5rem;
		border: 1px solid #ccc;
		border-radius: 5px;
	}
	
	.house_list .field textarea {
		width: 70%;
		height: 300px;
		padding: 1rem 2rem;
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