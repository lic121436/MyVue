var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);


/**
 * 定义编写接口请求
 */

var appData = require('./data.json');

var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

/**
 * 编写一个路由
 */
var apiRoutes = express.Router();

apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  })
});

apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
});

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
});

/**
 * 调用app
 */
app.use('/api', apiRoutes);

//定义express静态目录
app.use(express.static('./dist'));
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var uri = 'http://localhost:' + port;
var opn = require('opn')
//启动express 
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  // when env is testing, don't need open it   
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') { opn(uri) }
})