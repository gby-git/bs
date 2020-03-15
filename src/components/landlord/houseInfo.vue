<template>
	<div class="upload">
		
		<form action="" @submit.prevent="checkValue">
			<div class="house_info">
				<h2>房屋基本信息填写</h2>
				<div class="house_info_wrap">
					
					
					<div class="house_info_list">
						<h2>给我的房间起一个名字</h2>
						<div class="house_info_field normal">
							<input type="text" placeholder="比如：温馨小屋" required name="house_name" v-model="fieldVal.houseName"/>
						</div>
					</div>
					
					
					<div class="house_info_list">
						<h2>房屋所在地区</h2>
						<div class="house_info_field normal">
							<label class="location triangle" @click.stop="showArea = !showArea">
								<input type="text" readonly required  name="house_location" v-model="fieldVal.houseArea"/>
							</label>
							<area-model v-if="showArea" @getLocal="printArea" :areas="areas">
								<h2>请选择地区</h2>
							</area-model>
						</div>
					</div>
					
					<div class="house_info_list">
						<h2>房屋坐标</h2>
						<div class="house_info_field normal">
							<label class="location" >
								<input type="text" placeholder="例如:127,254" required  name="house_location" v-model="fieldVal.coordinate"/>
							</label>
							
						</div>
					</div>
					
					<div class="house_info_list">
						<h2>房屋描述</h2>
						<div class="house_info_field"><textarea name="" id="" v-model="fieldVal.houseLocation"></textarea></div>
					</div>
					
					
					<div class="house_info_list ">
						<h2>房屋描述</h2>
						<div class="house_info_field house_info_detail">
							<div class="house_info_type">
								<span>户型描述</span>
								<div class="house_info_type_wrap triangle">
									<input type="text" readonly required v-model="fieldVal.houseType" @click.stop="showType = !showType"/>
									<ul class="house_info_type_list" v-if="showType">
										<li v-for="item in type" @click.stop="printType(item)">{{ item }}</li>
									</ul>
								</div>
							</div>
							<div class="house_info_size">
								<span>房屋面积<small>(单位㎡)</small></span>
								<input type="text" required placeholder="例如:20" v-model="fieldVal.houseSize"/>
							</div>
							<div class="house_info_maxnum">
								<span>宜居住人数</span>
								<input type="text" required placeholder="例如:3" v-model="fieldVal.houseMax"/>
							</div>
							<div class="house_info_money">
								<span>价格</span>
								<input type="text" required placeholder="例如:300" v-model="fieldVal.houseMoney"/>
							</div>
						</div>
					</div>
				</div>

			</div>

			
			<div class="rules">
				<label>
					<input type="checkbox" v-model="fieldVal.agree"/>
					我已阅读并同意遵守协议内容
				</label>
				<a href="">《xxxx商务协议书》</a>
			</div>
			
			<div class="submit">
				<input type="submit" value="同意并提交" :class="{active: isSubmit}" />
			</div>
		</form>
		
	</div>
</template>

<script>
	import areaModel from "../common/areaModel.vue";
	
	export default {
		props: {
			
		},
		computed: {
			type: function() {
				return this.$store.state.houseType;
			},
			areas: function() {
				return this.$store.state.houseArea;
			}
		},
		data: function() {
			return {
				showArea: false,
				showType: false,
				fieldVal: {
					houseName: "",
					houseArea: "",
					houseLocation: "",
					houseType: "",
					houseSize: "",
					houseMax: "",
					houseMoney: "",
					coordinate: "",
					agree: false
				},
				
				houseNameTip: 0,
				isSubmit: 0
				
				
			};
		},
		methods: {
			printArea: function(val) {
				this.fieldVal.houseArea = val;
				this.showArea = false;
			},
			printType: function(val) {
				this.fieldVal.houseType = val;
				this.showType = false;
			},			
			checkValue: function() {
				if (this.isSubmit === 0) {
					return;
				}
				var arr = this.fieldVal.coordinate.split(",");
				var info = {
					"name": this.fieldVal.houseName,
					"area": this.fieldVal.houseArea,
					"location": this.fieldVal.houseLocation,
					"type": this.fieldVal.houseType,
					"size": this.fieldVal.houseSize,
					"max": this.fieldVal.houseMax,
					"money": this.fieldVal.houseMoney,
					"coordinate": arr
				}
				
				this.$http.post("/api/getBaseInfo", info).then(res => {
					this.$store.commit("getHomeId", res.body.homeId);
					if (res.body.error === 0) {
						this.$router.push("/landlord/step2");
					}
				});
				
			}
		},
		watch: {
			fieldVal: {
				handler: function(val,oldVal) {
					var flag = 0;
					for (var i in this.fieldVal) {
						if (this.fieldVal[i] === "" || this.fieldVal[i] === false || this.fieldVal[i] === null) {
							flag = 1;
							break;
						}
					}
					flag ===0 ? this.isSubmit = 1 : this.isSubmit = 0;
				},
				deep: true
			}
		},
		components: {
			"area-model": areaModel
		}
	};
</script>

<style scoped>
	.upload {
		width: 100%;
		margin: 0 auto;
		padding: 2rem;
	}
	.house_info {
		
	}
	.house_info > h2 {
		color: #008489;
	}
	.house_info_wrap {
		padding: 2rem;
	}
	.house_info_list:not(:last-child) {
		margin-bottom: 25px;
	}
	.house_info_list > h2{
		font-size: 1.2rem;
		font-weight: normal;
		color: #666666;
	}
	.house_info_field {
		margin: 1rem 0;
	}
	.house_info_field.normal input {
		width: 300px;
		height: 30px;
		line-height: 30px;
		padding-left: 1.5rem;
		border: 1px solid #ccc;
		border-radius: 5px;
	}
	.house_info_field input:focus {
		box-shadow: 0px 0px 3px #088;
	}
	.house_info_field .location  {
		width: 300px;
		height: 100%;
		display: inline-block;
		position: relative;
	}
	
	.house_info_field .location input {
		box-shadow: none;
	}
	.house_info_field i {
		margin-left: -2rem;
	}
	.house_info_field textarea {
		width: 350px;
		height: 100px;
		border: 1px solid #ccc;
		padding: 1rem
	}
	.house_info_detail {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.house_info_type > span, .house_info_size > span, .house_info_maxnum > span, .house_info_money > span{
		margin-right:1rem;
	}
	.house_info_type input, .house_info_size input, .house_info_maxnum input, .house_info_money input {
		width: 10rem;
		border:1px solid #ccc;
		border-radius: 5px;
		padding: .3rem 1rem;
	}
	.house_info_type {
		display: flex;
		align-items: center;
	}
	.house_info_type i {
		vertical-align: 12px;
	}
	.house_info_type label {

	}
	.house_info_type_wrap {
		position: relative;
	}
	.house_info_type_wrap > input {
		border-radius: none;
	}
	.house_info_type_list {
		position: absolute;
		width: 100%;
		border: 1px solid #ccc;

		z-index: 20;
		background: #fff;
		max-height: 92px;
		overflow-y: auto;
	}
	.house_info_type_list li {
		text-align: center;
		padding: .5rem ;
		height: 30px;
		cursor: pointer;
	}
	.house_info_type_list li:hover {
		background: #45a;
		color: #fff;
	}
	.person_info > h2 {
		color: #008489;
	}
	.person_info_wrap {
		padding: 2rem;
	}
	.person_info_list > h2 {
		font-size: 1.2rem;
		font-weight: normal;
		color: #666666;
	}
	.person_info_field {
		margin: 1rem 0;
		
	}
	.upload_pic {
		height: 130px;
	}
	.person_info_field.normal input {
		width: 300px;
		height: 30px;
		line-height: 30px;
		padding-left: 1.5rem;
		border: 1px solid #ccc;
		border-radius: 5px;
	}
	.person_info_field input:focus {
		box-shadow: 0px 0px 3px #088;
	}
	.upload_header  {
		float: left;
		margin-right: 2rem;
	}
	.upload_header input {
		display: none;
	}
	.upload_header .header_pic {
		border: 1px dashed #ccc;
		width: 130px;
		height: 130px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.upload_header .header_pic i {
		font-size: 2rem;
		color: #ccc;
	}
	.header_tip {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: space-between;
	}
	.header_tip h2 {
		font-size: 1rem;
		color: #999;
	}
	.header_tip > div {
		color: #999;
	}
	.rules {
		text-align: center;
		height: 25px;
	}
	.rules label {
		cursor: pointer;	
	}
	.rules input[type=checkbox] {
		vertical-align: -2px;
	}
	.rules a {
		color: #78e;
		display: inline-block;
		padding-bottom: 2px;
	}
	.rules a:hover {
		border-bottom: 1px solid #78e;
	}
	.submit {
		text-align: center;
		margin-top: 2rem;
	}
	.submit input {
		width: 10rem;
		height: 3rem;
		border: none;
		color: #999;
		border-radius: 5px;
		cursor: pointer;;
	}
	.submit .active {
		color: #fff;
		background: #6b6;
	}
	.submit .active:hover {
		background: #2b2;
	}
</style>