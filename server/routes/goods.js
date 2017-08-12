var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Good = require('./../models/goods.js');

mongoose.connect('mongodb://127.0.0.1:27017/imocc');

router.get("/list", function (req, res) {
    var pagesize = Number(req.param("pagesize"));
    var page = Number(req.param("page"));
    var sort = Number(req.param("sort"));
    var skip = Number(pagesize * (page - 1));
    var params = {};
    var pricelevel = req.param("pricelevel");
    if (pricelevel !== 'all') {
        switch (pricelevel) {
            case '0': priceGt = 0; priceLte = 100; break;
            case '1': priceGt = 100; priceLte = 500; break;
            case '2': priceGt = 500; priceLte = 1000; break;
            case '3': priceGt = 1000; priceLte = 5000; break;
        };
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    }
    Good.find(params).sort({ 'salePrice': sort }).skip(skip).limit(pagesize).exec((err, docs) => {
        if (err) { console.log(err) }
        else {
            res.json({
                "results": docs,
            })
        }
    })
})
router.post('/addCart', function (req, res) {
    var userId = '100000077';
    var productId = req.body.productId;
    var User = require('./../models/user.js');
    User.findOne({ userId: userId }, function (err, userDoc) {  //查询用户信息
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            console.log(userDoc.userName);
            if (userDoc) {                  //如果该用户存在，从商品列表中找出商品ID所在商品信息
                Good.findOne({ 'productId': productId }, function (err, doc) {
                        var goodsItem = '';
                        userDoc.cartList.forEach(function (item) {
                            if (item.productId == productId) {
                                goodsItem = item;
                                item.productNum++;
                                console.log(item.productNum)
                            }
                        });
                        if (goodsItem) {
                            userDoc.save(function (err1, doc1) {
                                if (err1) { console.log(err1) } else {
                                    res.json({
                                        status: "0",
                                    })
                                }
                            })
                        } else {
                            var obj = JSON.parse(JSON.stringify(doc));
                            
                            obj.productNum = 1;
                            obj.checked = 1;
                            console.log("********");
                            console.log(obj.checked);
                            console.log(obj)
                            userDoc.cartList.push(obj);
                            userDoc.save(function (err2, doc2) {
                                console.log(userDoc)
                                if (err2) { console.log(err) } else {
                                    res.json({
                                        status: "0",
                                    })
                                }
                            })
                        }
                })
            }
        }
    })
})
module.exports = router