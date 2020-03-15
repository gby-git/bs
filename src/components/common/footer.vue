<template>
	<div class="footer">
		<div class="footer-ct clearfix">
			<!--<h2>{{footInfo.city}}</h2>
			<p>{{footInfo.location}}</p>
			<p>邮编：{{footInfo.zipCode}}</p>
			<p>联系电话：{{footInfo.tel}} <span class="fr">&copy;{{footInfo.version}}</span></p>
			<p>服务邮箱：{{footInfo.email}} <span class="fr">{{footInfo.keepOnRecord}}</span></p>-->
			<p class="fr">&copy; 2017 上海瀛古旅游发展有限公司版权所有</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			footInfo: {
				type: Object
			}
		}
	};
</script>

<style scoped lang="scss">
	.footer {
		width: 100%;
		padding: 3rem 0;
		background: #333;
		/*margin-top: 3rem;*/
	}
	.footer .footer-ct {
		width: 80%;
		margin: 0 auto;
		color: #aaa;
	}
	
	.footer .footer-ct h2 {
		font-weight: normal;
	}
	
	.footer .footer-ct p {
		margin: 4px 0;
	}
	
	.col-footer {
		margin-top: 1rem;
		background: #333;
		color: #fff;
		text-align: center;
		padding: 1rem;
	}
	
	.col-footer p {
		font-size: .8rem;
	}
</style>