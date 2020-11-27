var express = require('express');
var router = express.Router();
var mongo = require('mongoose');
var objectId = require('mongoose');
var assert = require('assert');
var Product = require('../models/product');
var path = '/stylesheets/admin-page.css';
var url = 'mongodb://localhost:27017/shopping';

router.get('/admin',function (req,res,next) {
    res.render('user/admin-page',{title:'Management',admin_css:path});
});
router.get('/admin/get-data', function(req, res, next) {
    var resultArray = [];
    mongo.connect(url,{useNewUrlParser:true},function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('products').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            res.render('user/admin-page', {items: resultArray});
        });
    });
});

router.post('/admin/insert', function(req, res, next) {
    var item = new Product({
            imgpath: req.body.imgpath,
            title: req.body.title,
            type: req.body.type,
            description:req.body.description,
            price:req.body.price,
            // state:req.body.state
        })
    ;
    mongo.connect(url,{useNewUrlParser: true}, function(err, db) {
        assert.equal(null, err);
        db.collection('products').insertOne(item, function(err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });

    res.redirect('/');
});

router.post('/admin/update', function(req, res, next) {
    var item = new Product(
        {
            imgpath: req.body.imgpath,
            title: req.body.title,
            type: req.body.type,
            description:req.body.description,
            price:req.body.price,
            state:req.body.state
        }
    );
    var id = req.body.id;

    mongo.connect(url,{useNewUrlParser:true},function(err, db) {
        assert.equal(null, err);
        db.collection('products').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
            assert.equal(null, err);
            console.log('Item updated');
            db.close();
        });
    });
});

router.post('/admin/delete', function(req, res, next) {
    var id = req.body.id;

    mongo.connect(url,{useNewUrlParser:true}, function(err, db) {
        assert.equal(null, err);
        db.collection('products').deleteOne({"_id": objectId(id)}, function(err, result) {
            assert.equal(null, err);
            console.log('Item deleted');
            db.close();
        });
    });
});

module.exports = router;