require(['config'],function(){
    require(['jquery','common','head_foot'],function($,common,head_foot){
        // 获取元素 商品数据的父级
        var $colContent=$('.col_content');
        console.log($colContent);
        // 购物车总金额 一开始为零元
        var $total = $('.total');
        $total.html("￥0.00元");

        var carlist=[];
        var cookies=document.cookie;
        // console.log(cookies);
        /*
        carlist=[{"name":"华为（HUAWEI） P10（VTR-AL00） 128GB 移动联通电信4G手机 全网通 双卡双待（钻雕金） 钻雕金","price":"5688","qty":1,"id":"00000000001"}]
         */

        if(cookies.length>0){
            data();
        }
        function data(){
            cookies=cookies.split('=');
            carlist=JSON.parse(cookies[1]);
            console.log(carlist);
            
            carlist.map(function(cookie){
                console.log(cookie.imgurl)

                $('.item_img').html($('<img/>').attr('src',cookie.imgurl).css({'width':75,'height':75,'margin':'0 auto'}));
                $colContent.find('.col_name').html($('<a/>').attr('href','#').html(cookie.name));
                $colContent.find('input').val(cookie.qty);
                $colContent.find('.col_price').html(cookie.price);
            })


            var sum=0;
            carlist.forEach(function(cookie){
                sum += cookie.price*cookie.qty;
            });
            sum = sum.toFixed(2);
            var total =`${sum}元`;
            $total.html(total);
        }
    });
});