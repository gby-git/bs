<template>
	<div>
		<div class="content">
			<h2>成为房东以后您就可以出租以下房屋!!!!!</h2>
			<div class="ct-classify">
				<div class="villa">
					别墅
					<div></div>
				</div>
				<div class="apartment">
					公寓
					<div></div>
				</div>
				<div class="agritainment">
					农家乐
					<div></div>
				</div>
				<div class="single">
					单间
					<div></div>
				</div>
			</div>
		</div>
		
		<div class="rental">
			<router-link to="/rental" class="im_rental">成为房东</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
.content {
	padding: 3rem;
}
.content h2 {
	font-size: 2.5rem;
	font-weight: 400;
	margin-bottom: 1rem;
	color: #459;
}
.content .ct-classify {
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
}

.content .ct-classify > div {
	height: 280px;
	width: 280px;
	background-size: cover;	
	text-align: center;
	font-size: 3rem;
	color: #fff;
	font-weight: 400;
	line-height: 300px;
	position: relative;

}
.content .ct-classify > div > div {
	width: 100%;
	height: 100%;
	position: absolute;
	opacity: .4;
	top: 0;
	transition: all .5s;
	cursor: pointer;
	background: #000;
}
.content .ct-classify > div > div:hover {
	opacity: 0;
}
.content .ct-classify .villa {
	background-image: url(/static/img/villa.jpg);
	
}
.content .ct-classify .apartment {
	background-image: url(/static/img/apartment.jpg);
	
}
.content .ct-classify .agritainment {
	background-image: url(/static/img/agritainment.jpg);
	
	
}
.content .ct-classify .single {
	background-image: url(/static/img/single.jpg);
	
	
}

/*立即租房*/
.rental {
	width: 100%;
	height: 10rem;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: flex-end;

}
.rental .im_rental {
	border-radius: 5px;
	padding: 1rem 2rem;
	color: #fff;
	background: #45a;
	margin-right: 100px;
	cursor: pointer;
	transition: all .3s;

}
.rental .im_rental:hover {
	background: #46a;
}
</style>