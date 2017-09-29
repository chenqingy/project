require(['config'],function(){
    require(['jquery','common','head_foot'],function($,common,head_foot){

        //获取当前链接？号之后的字符串
        var params = location.search;
        //将字符串解码
        var params = decodeURI(params);
        // console.log(params);
        var simplegoods = params.slice(1).split('&');
        //console.log(simplegoods);
        var obj = {};
        simplegoods.forEach(function(item){
            simplegoods = item.split('=');
            obj[simplegoods[0]] = simplegoods[1]; 
        }) 

        

        // 商品左边的内容
        // 定义图片内容
        var $bigimg = $('#goods .img');
        $bigimg.append($('<img/>').attr('src',obj.imgurl));

        // 小图的ul的父级
        var $smallimg = $('#goods .smallimg');
        $smallimg.find('ul').width(10000);
        $smallimg.on('mouseenter','img',function(){
            // 定义小图的src
            var $simgsrc = $(this).attr('src');
            // 将大图的img路径换成小图的路径
            $bigimg.html($('<img/>').attr('src',$simgsrc));
            // 点击小图是li的边框变红
            $(this).parent('li').addClass('active').siblings().removeClass('active');
        })
        // 小图左右按钮点击事件
        .on('click','.btn_prev',function(){
            $smallimg.find('ul').animate({left:0});

        }).on('click','.btn_next',function(){
            $smallimg.find('ul').animate({left:-276});
        });

        $('.itemname')[0].innerHTML=obj.name;
        // 商品右边的内容
        var $goodsname = $('#goods .goodsname');
        var $span2html = $('<span/>').html(obj.description);
        var $span1html = $('<span/>').html(obj.name);
        $goodsname.append($span1html).append($span2html);

        var $goodsprice = $('#goods .price');
        var $h5 = `<h5>
            <span>飞虎价：</span>
            ${obj.price}
        </h5>`;
        $goodsprice.html($h5);

        // 选择商品颜色
        var $goodstab =$('#goods .goodstab');
        $showcontent = $('#goods .selected');
        $showcontent.hide();

        $goodstab.on('click','.color li',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $showcontent.show().children('.showcolor').html($(this).html());
        }).on('click','.size li',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $showcontent.children('.showsize').html($(this).html());
        });

        // 右下角tab标签切换
        var $tab = $('#tab');
        var $content = $tab.next().children();
        var $liItems = $('#tab').children();
        // 隐藏除了第一个意外的内容
        $content.slice(1).hide();
        // 给第一个li加高亮
        $liItems.first().addClass('active');
        $tab.on('mouseenter','li',function(){
            var idx = $(this).index();
            // 高亮
            $(this).addClass('active').siblings('li').removeClass();
            // 显示对应的内容
            $content.eq(idx).show().siblings('.tabcontent').hide();
        });

        // 商品详情的tab切换
        // 右下角tab标签切换
        var $tab3 = $('#tab3');
        var $content3 = $tab3.next().children();
        var $liItems = $('#tab3').children();
        // 隐藏除了第一个意外的内容
        $content3.slice(1).hide();

        // 给第一个li加高亮
        $liItems.first().addClass('active');
        $content3.parent().css('height',$content3.eq(0).height());
        $tab3.on('click','li',function(){
            var idx = $(this).index();
            // 高亮
            $(this).addClass('active').siblings('li').removeClass();

            // 显示对应的内容
            $content3.eq(idx).show().siblings('.goodscontent').hide();

            $content3.parent().css('height',$content3.eq(idx).height());
        });

        

        
        // 评论tab
        var $tab4 = $('.tab4');
        var $content4 = $tab4.next().children();
        var $liItems = $('.tab4').children();
        // 隐藏除了第一个意外的内容
        $content4.slice(1).hide();
        $content4.eq(4).show();      
        // 给第一个li加高亮
        $liItems.first().addClass('active');
        $liItems.eq(4).addClass('active');
        $tab4.on('click','li',function(){
            var idx = $(this).index();
            // 高亮
            $(this).addClass('active').siblings('li').removeClass();

            // 显示对应的内容
            $(this).parent().next().children().eq(idx).show().siblings('.comment').hide();


        });
            






    });
});