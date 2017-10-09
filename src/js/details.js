require(['config'],function(){
    require(['jquery','common','head_foot'],function($,common,head_foot){

        //获取当前链接？号之后的字符串
        var params = location.search;
        // console.log(params);
        var id = params.substr(4);

        var $bigimg = $('#goods .img');
        var $goodsname = $('#goods .goodsname');
        var $goodsprice = $('#goods .price');
        


        // console.log(id);
        $.ajax({
            url:"../api/goodslistid.php",
            type:"get",
            data:{
                id:id
            },
            success:function(res){
                var res=$.parseJSON(res);
                // console.log(res);
                $.map(res,function(item){
                    $bigimg.append($('<img/>').attr('src',item.imgurl));

                    $('.itemname')[0].innerHTML=item.name;

                    var $span2html = $('<span/>').html(item.description);
                    var $span1html = $('<span/>').html(item.name);
                    var $other = $('<p/>').addClass('nameother').html(item.other);
                    $goodsname.append($span1html).append($span2html).append($other);
                    var $h5 = `<h5>
                        <span>飞虎价：</span>
                        ${item.price}
                    </h5>`;
                    $goodsprice.html($h5);

                    // 商品描述部分
                    $('.imgcontent').html($('<img/>').attr('src',item.otherbigimg));

                    //进入前先判断是否有cookie
                    //如果有则获取它的值，把JSON转成对象或数组
                    var carlist=[];
                    var cookies = document.cookie;
                    if(cookies.length>0){
                        cookies=cookies.split(';');
                        console.log(cookies);
                        cookies.forEach = (function(cookie){
                            // console.log(cookie);
                            var temp = cookie.split('=');
                            // console.log(temp);
                            if(temp[0]==='carlist'){
                                carlist=JSON.parse(temp[1]);
                            }
                        });
                    }
                    console.log(carlist);
                    // console.log(cookies);
                    // 点击购物车按钮
                    var $buycarBtn = $('#buycarBtn');
                    var $tcBox = $('.TCbox');
                    
                    $buycarBtn.on('click',function(e){
                        e.preventDefault();
                        // 弹窗的样式
                        $tcBox.css({
                            'display':'block',
                            'top':'50%',
                            'left':'50%',
                            'transform':'translate(-50%,-50%)'
                        });
                        // 点击弹窗时,增加kookie
                        // console.log(id);
                        var has=false;
                        //如果carlist里有已经存在的 则qty++，，
                        for(var i=0;i<carlist.length;i++){
                            //数组里每个对象的id若已经存在一致的,不添加对象在数组里
                            if(carlist[i].id===id){
                                // console.log(carlist[i].id,)
                                carlist[i].qty++;
                                has=true;
                                break;
                            }
                        }
                        if(!has){
                            var goods={
                                imgurl:item.imgurl,
                                name:item.name,
                                price:item.price,
                                qty:1,
                                id:id
                            }
                            carlist.push(goods);
                        }
                        //写入cookie
                        var date=new Date();
                        date.setDate(date.getDate()+7);
                        document.cookie= 'carlist='+JSON.stringify(carlist)+';expires='+date.toUTCString();

                        $('.carTotal').html(item.price+'元');

                    });
                    // 点击X关闭购物车弹窗
                    $('.TCclose').on('click',function(){
                        $tcBox.css('display','none');
                    })
                });
            }
        });
        
        

        // 商品左边的内容
        // 定义图片内容
        

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