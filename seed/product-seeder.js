var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping',{useNewUrlParser: true});

var products = [
    new Product({
        imagePath: 'https://product.hstatic.net/1000075078/product/matcha_macchiato_large.jpg',
        title:'MATCHA MACCHIATO TEA',
        type:'TRÀ & MACCHIATO',
        description:'Bột trà xanh Matcha thơm lừng hảo hạng cùng lớp Macchiato béo ngậy là một sự kết hợp tuyệt vời.',
        price: 45000
    }),
    new Product({
        imagePath: 'https://product.hstatic.net/1000075078/product/vnese_coffee_large.jpg',
        title:'BLACK COFFEE',
        type:'CÀ PHÊ',
        description:'Một tách cà phê đen thơm ngào ngạt, phảng phất mùi cacao là món quà tự thưởng tuyệt vời nhất cho những ai mê đắm tinh chất nguyên bản nhất của cà phê. Một tách cà phê trầm lắng, thi vị giữa dòng đời vồn vã.',
        price: 29000
    }),
    new Product({
        imagePath: 'https://product.hstatic.net/1000075078/product/caramel_macchiato_b6f694f469794e12b04a91845f5fce2d_large.jpg',
        title:'CARAMEL MACCHIATO',
        type:'TRÀ & MACCHIATO',
        description:'Vị thơm béo của bọt sữa và sữa tươi, vị đắng thanh thoát của cà phê Espresso hảo hạng, và vị ngọt đậm của sốt caramel.',
        price:55000
    }),
    new Product({
        imagePath: 'https://product.hstatic.net/1000075078/product/matcha_latte_large.jpg',
        title:'MATCHA LATTE TEA',
        type:'TRÀ & MACCHIATO',
        description:'Với màu xanh mát mắt của bột trà Matcha, vị ngọt nhẹ nhàng, pha trộn cùng sữa tươi và lớp foam mềm mịn, Matcha Latte là thức uống yêu thích của tất cả mọi người khi ghé The Coffee House.',
        price:55000
    })
];

var done = 0 ;
for(var i = 0 ; i<products.length ; i++)
{
    products[i].save(function (err,result) {
        done++ ;
        if(done===products.length)
        {
            exit();
        }
    })
}

function exit() {
    mongoose.disconnect();
}