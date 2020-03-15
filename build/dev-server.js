'use strict'
require('./check-versions')()

const config = require('../config')
if(!process.env.NODE_ENV) {
	process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

var formidable = require("formidable");

const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}));
//app.use(cookieParser());

const data = require("../static/json/index.json");
const facilities = require("../static/json/facilities.json");
const searchResult = require("../static/json/searchResult.json");
const searchResult2 = require("../static/json/searchResult2.json");
const home = require("../static/json/home.json");
const home2 = require("../static/json/home2.json");
const order = require("../static/json/order.json");
const story = require("../static/json/story");
const storyDetail = require("../static/json/storyDetail");
const userManage = require("../static/json/userManage");
const userManage2 = require("../static/json/userManage2");
const orderList = require("../static/json/orderList");

const router = express.Router();

app.use("/api", router);
//首页面刚刚进入时传入的json
router.get("/main", function(req, res) {
	res.json(data);
});

router.post("/delHouse", function(req, res) {
	res.json(userManage2);
});

//成为房东填写表单时，发送的所有设施
router.get("/facilities", function(req, res) {
	res.json(facilities);
});
//成为房东第一步
router.post("/getBaseInfo", function(req, res) {
	console.log(req.body)
	var info = {
		error: 0,
		msg: "成功",
		homeId: 1
	};

	res.json(info);
});


//判断是否为房东
router.post("/isLandlord", function(req, res) {
	var info = {
		error: 0,
		isLandlord: false
	};
	res.json(info);
});



//头像上传
router.post("/uploadHead", function(req, res) {

	var form = new formidable.IncomingForm();
	form.uploadDir = __dirname + "/../static/images";
	form.keepExtensions = true;
	form.parse(req, function(err, fields, files) {
		var imgPath = [];
		var str = "../../static/images/";
		var realPath = "";
		for(var i in files) {
			var basename = path.basename(files[i].path);
			realPath = str + basename;
			imgPath.push(realPath.toLocaleLowerCase());
		}
		res.json(imgPath);
	});

});

router.post("/saveHead", function(req, res) {
	
	var info = {
		error: 0,
		msg: "aaa",
		headUrl: "/static/img/head2.jpg"
	}
	res.json(info);

});

router.post("/becomeLandlord", function(req, res) {
	
	var info = {
		error: 0,
		msg: "aaa",
		status: 1
	}
	res.json(info);

});
//我的故事
router.get("/story", function(req, res) {
	
	res.json(story);
});
//我的故事详情
router.post("/storyDetail", function(req, res) {
	/*if (res.body.id === "s1") {
		
	}*/
	res.json(storyDetail);
});
//获取赞
router.post("/zan", function(req, res) {
	var info = {
		error: 0,
		zan: 14,
		msg: "成功"
	}

	res.json(info);
});
//发表评论
router.post("/pinglun", (req, res) => {

	var info = {
					"head": "/static/img/head2.jpg",
					"self": "李波",
					"to": req.body.to,
					"speak": req.body.speak,
					"time": "4小时前",
					"replyNum": 0,
					"zan": 3
			};
	res.json(info);
	
	
})


//成为房东第二步
router.post("/getHouseInfo", function(req, res) {
	var info = {
		error: 0,
		msg: "成功"
	};
	res.json(info);
});
//成为房东第二步，房屋图片上传
router.post("/housePic", function(req, res) {
	var form = new formidable.IncomingForm();
	form.uploadDir = __dirname + "/../static/images";
	form.keepExtensions = true;
	form.parse(req, function(err, fields, files) {
		var imgPath = [];
		var str = "../../static/images/";
		var realPath = "";
		for(var i in files) {
			var basename = path.basename(files[i].path);
			realPath = str + basename;
			imgPath.push(realPath.toLocaleLowerCase());
		}
		res.json(imgPath);
	});
});
router.post("/storyPic", function(req, res) {
	var form = new formidable.IncomingForm();
	form.uploadDir = __dirname + "/../static/images";
	form.keepExtensions = true;
	form.parse(req, function(err, fields, files) {
		var imgPath = [];
		var str = "../../static/images/";
		var realPath = "";
		for(var i in files) {
			var basename = path.basename(files[i].path);
			realPath = str + basename;
			imgPath.push(realPath.toLocaleLowerCase());
		}
		res.json(imgPath);
	});
});
router.post("/writeStory", function(req, res) {
	var info  = {
		error: 0,
		msg: "",
		href: "s2"
	}
	res.json(info);
});
//返回房东注册状态
router.get("/landlord", function(req, res) {
	var info = {
		"error": 0,
		"step": 0,
		
		"roomType": [
			"单人间",
			"双人间"
		],
		"place": [{
			"place": "成都",
			"hot": 1
		}, {
			"place": "北京",
			"hot": 0
		}]
	}
	res.json(info);
});
//登录验证
router.post("/login", function(req, res) {
	var info = {
		error: 0,
		msg: "success",
		username: "谭浩强",
		status: 0
	};
	res.cookie("user", "癞疙宝");
	res.json(info);
});
//获取验证码
router.post("/getCode", function(req, res) {
	var info = {
		error: 0,
		msg: "success"
	}
	res.json(info);
});
//注册验证
router.post("/register", function(req, res) {
	var info = {
		error: 1,
		msg: "success"
	}
	res.json(info);
});
//搜索
router.post("/search", function(req, res) {
	var info = {
		error: 0,
		msg: ""
	};
	if(req.body.local === "成都") {
		res.json(searchResult);
	} else {
		res.json(searchResult2);
	}
});

//传递给搜索框的数据
router.get("/searchData", function(req, res) {

	res.json(data.search);

});
//查看房屋详情
router.post("/homeDetail", function(req, res) {

	if(req.body.name === "home1") {
		res.json(home);
	} else {
		res.json(home2);
	}
})
//订单详情
router.post("/orderInfo", function(req, res) {
	if(req.body.name === "home1") {
		res.json(order);
	} else {
		res.json(order);
	}
})
//订单基本信息提交
router.post("/orderSubmit", function(req, res) {
	var info = {
		error: 1,
		orderCode: 201708040023,
		deadTime: "14:20",
		href: "http://www.baidu.com"

	}
	res.json(info);
})

//用户个人信息管理
router.post("/userManage", function(req, res) {

	res.json(userManage);
})
//获取用户订单
router.post("/orderList", function(req, res) {

	
	res.json(orderList);
})
const userInfo = require("../static/json/userInfo");
const userInfo2 = require("../static/json/userInfo2");
//获取用户信息
router.post("/userInfo", function(req, res) {
	res.json(userInfo);
})
//修改用户信息
router.post("/changeUserInfo", function(req, res) {
	console.log(req.body)
	res.json(userManage2);
})

//重置密码
router.post("/resetPassword", function(req, res) {
	var info = {
		error: 0,
		msg: ""
	};
	res.json(info);
});


router.post("/review", function(req, res) {
	var info = {
		error: 0,
		review: {
			"head": "/static/img/head2.jpg",
			"name": "asdsad",
			"speak": "从前有座山山里有个洞",
			"time": "1小时前",
			"replyNum": 5,
			"zan": 12
		}
	};
	res.json(info);
});
router.post("/delStory", function(req, res) {
	res.json(userManage2);
});





const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
	log: false,
	heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
	let options = proxyTable[context]
	if(typeof options === 'string') {
		options = {
			target: options
		}
	}
	app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
	_resolve = resolve
	_reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
	portfinder.getPort((err, port) => {
		if(err) {
			_reject(err)
		}
		process.env.PORT = port
		var uri = 'http://localhost:' + port
		console.log('> Listening at ' + uri + '\n')
		// when env is testing, don't need open it
		if(autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
			opn(uri)
		}
		server = app.listen(port)
		_resolve()
	})
})

module.exports = {
	ready: readyPromise,
	close: () => {
		server.close()
	}
}