require(['config'],function(){
    require(['jquery','common','head_foot'],function($,common,head_foot){
        //jquery加载完成后，执行这里的代码
        
        // load首页路径
        // main左边第一部分的点击效果
        $('.main_jia').on('click','li>a',function(e){

            if($(this).next('ul').css('height')==='0px'){
                $(this).next('ul').css('height','auto');
                $(this).addClass('color');
                $(this).find('img').attr('src','../img/-.png');
            }else{
                $(this).next('ul').css('height','0');
                $(this).removeClass('color');
                $(this).find('img').attr('src','../img/+.png');
            }
            // 阻止a的默认事件
            e.preventDefault();
        })
        // 以上是导航栏点击效果
        

        // tab标签切换的数据
        var $ul_tabs = $('#tabs');
        /*function showData($ele,res){
            var res = $.parseJSON(res);
            // 创建ul
            var $ul = $('<ul/>');
            $ul.addClass('clearfix');

            var html = res.map(function(item){
                return html = `
                    <li data-guid="${item.id}">
                        <a href="details.html?id=${item.id}" target="_blank"><img src="${item.imgurl}"></a>
                        <h4><a href="#">${item.name}</a></h4>
                        <p>${item.description}</p>
                        <p class="price clearfix"><span>飞虎价：</span>￥${item.price}</p>
                        <div class="pbtn"><a class="rapbuy" href="#">快速购买</a><a class="addCart" href="#">加入如购物车</a></div>
                    </li>
                `
            }).join('');

            $ul.html(html);
            // 将ul写入楼层（ele）
            $ele.append($ul);  
            addCar(res)           
        }
        function addCar(res){
            console.log(res);
            // 加入购物车事件
            //进入前先判断是否有cookie
            //如果有则获取它的值，把JSON转成对象或数组
            var carlist=[];
            var cookies = document.cookie;
            if(cookies.length>0){
                cookies=cookies.split('; ');
                cookies.forEach = (function(cookie){
                    var temp = cookie.split('=');
                    if(temp[0]==='carlist'){
                        carlist=JSON.parse(temp[1]);
                    }
                });
            }
            $.map(res,function(item){
                console.log(item);
                $('.datalist2').on('click','.addCart',function(e){
                    // 阻止a的默认事件
                    e.preventDefault();
                    // console.log($(this));
                    var id=$(this).parent().parent().attr('data-guid');
                    // console.log(id);

                    var has=false;
                    //如果carlist里有已经存在的 则qty++，，
                    for(var i=0;i<carlist.length;i++){
                        //数组里每个对象的id若已经存在一致的,不添加对象在数组里
                        if(carlist[i].id===id){
                            console.log(carlist[i].id)
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
                    document.cookie= 'carlist='+JSON.stringify(carlist);
                });
            })
        }*/
        function showData($ele,res){
            var res = $.parseJSON(res);
            // console.log(res);
            // 创建ul
            var $ul = $('<ul/>');
            $ul.addClass('clearfix');
            res.map(function(item){
                // console.log(item);
                var $li=$('<li/>').attr('data-guid',item.id);
                var html = `
                    <a href="details.html?id=${item.id}" target="_blank"><img src="${item.imgurl}"></a>
                    <h4><a href="#">${item.name}</a></h4>
                    <p>${item.description}</p>
                    <p class="price clearfix"><span>飞虎价：</span>￥${item.price}</p>
                    <div class="pbtn"><a class="rapbuy" href="#">快速购买</a><a class="addCart" href="#">加入如购物车</a></div>
                `
                $li.html(html);
                $ul.append($li);
                // 将ul写入楼层（ele）
                $ele.append($ul);  
            });       
        }
        function addCar(){
            // console.log(res);
            // 加入购物车事件
            //进入前先判断是否有cookie
            //如果有则获取它的值，把JSON转成对象或数组
            var carlist=[];
            var cookies = document.cookie;
            console.log(cookies);
            if(cookies.length>0){
                cookies=cookies.split(';');
                cookies.forEach = (function(cookie){
                    var temp = cookie.split('=');
                    if(temp[0]==='carlist'){
                        carlist=JSON.parse(temp[1]);
                    }
                });
            };
            console.log(carlist);
            var $tcBox = $('.TCbox');
            $tcBox.css('dispaly','none');
            var $showCart = $('.showCart');
            $showCart.html('您还未添加任何商品');

            // 点击购物车事件
            $('.datalist2').on('click','.addCart',function(e){
                // 阻止a的默认事件
                e.preventDefault();

                // 弹窗的样式
                /*$tcBox.css({
                    'display':'block',
                    'top':'50%',
                    'left':'50%',
                    'transform':'translate(-50%,-50%)'
                });*/

                // console.log($(this));
                var $currentLi = $(this).parent().parent();
                var id=$currentLi.attr('data-guid');
                // console.log(id);
                // console.log($currentLi.find('img').attr('src'),$currentLi.find('h4>a').html(),$currentLi.find('.price').html().substr(18));
                var has=false;
                //如果carlist里有已经存在的 则qty++，，
                for(var i=0;i<carlist.length;i++){
                    //数组里每个对象的id若已经存在一致的,不添加对象在数组里
                    if(carlist[i].id===id){
                        // console.log(carlist[i].id)
                        carlist[i].qty++;
                        has=true;
                        break;
                    }
                }
                if(!has){
                    var goods={
                        imgurl:$currentLi.find('img').attr('src'),
                        name:$currentLi.find('h4>a').html(),
                        price:$currentLi.find('.price').html().substr(18),
                        qty:1,
                        id:id
                    }
                    carlist.push(goods);
                }
                //写入cookie
                var date=new Date();
                date.setDate(date.getDate()+7);
                document.cookie= 'carlist='+JSON.stringify(carlist)+';expires='+date.toUTCString();

                


                $('.carTotal').html($currentLi.find('.price').html().substr(18)+'元');

                // 点击X关闭购物车弹窗
                $('.TCclose').on('click',function(){
                    $tcBox.css('display','none');
                })
            });

            // 购物车标签下的div出现效果
            // $('<div/>').addClass('showCart');
            $('.showCart').hide();
            $('#showCart').on('mouseover',function(){
                $('.showCart').show().css('line-height','50px');
            }).on('mouseout',function(){
                $('.showCart').hide();
            });

            // 读取cookie
            /*cookies=document.cookie;
            // console.log(cookies);
            if(cookies.length>0){
                data();
            }
            function data(){
                cookies=cookies.split('=');
                carlist=JSON.parse(cookies[1]);
                // console.log(carlist.length);
                var $myUl=$('<ul/>');
                var html=carlist.map(function(cookie){                      
                   return `<li><p><img src="${cookie.imgurl}"/></p><h5><p class="name">${cookie.name}</p><p class="price">${cookie.price}*${cookie.qty}</p><p><span class"deleteLi">删除</span></p></h5></li>`                                                            
                });                
                $myUl.html(html);
                // 将ul加入表格中
                $showCart.html($myUl);
                
                // mycarlist总价格
                var $div = $('<div/>');
                
                var html1=`
                <div class="mycart_total"><p>共<span class="car_num"></span>件</p><p>金额总计：<span class="num_total"></span></p></div><div class="mycar_pay"><a href="buycar.html">去购物车结算</a></div>
                `
                $div.html(html1);
                $showCart.append($div);
                // mycarlist下边div的数量和总价格
                $('.car_num').html(carlist.length);
                //总价格
                var sum=0;
                carlist.forEach(function(cookie){
                    sum += cookie.price*cookie.qty;
                });
                sum = sum.toFixed(2);
                var total =`${sum}`;
                $('.num_total').html(total);                   
            }*/
            
        }
        addCar();
        // 1F======================================================================
        var $1F = $('.1F');
        $.ajax({
            url: "../api/goodslist.php",
            data:{
                type:"'1F'"
            }, 
            success:function(res){               
                showData($1F,res); 
            }
        });
        var $2F = $('.2F');
        $.ajax({
            url: "../api/goodslist.php",
            data:{
                type:"'2F'"
            }, 
            success:function(res){               
                showData($2F,res);
                // addCar();                       
            }
        });
        var $3F = $('.3F');
        $.ajax({
            url: "../api/goodslist.php",
            data:{
                type:"'3F'"
            }, 
            success:function(res){               
                showData($3F,res);  
                // addCar();                     
            }
        });
        var $4F = $('.4F');
        $.ajax({
            url: "../api/goodslist.php",
            data:{
                type:"'4F'"
            }, 
            success:function(res){               
                showData($4F,res);   
                // addCar();                    
            }
        });
        var $5F = $('.5F');
        $.ajax({
            url: "../api/goodslist.php",
            data:{
                type:"'5F'"
            }, 
            success:function(res){               
                showData($5F,res);  
                // addCar();                     
            }
        });
        var $choice = $('.choice');
        $.ajax({
            url: "../api/goodslist.php",
            data:{
                type:"'1F'"
            }, 
            success:function(res){               
                // showData($choice,res); 
                var res = $.parseJSON(res);
                // console.log(res);
                // 创建ul
                var $ul = $('<ul/>');
                $ul.addClass('clearfix');
                res.map(function(item){
                    var html=`<li>
                        <a href="#"><img src="${item.imgurl}"/></a>
                        <p class="name"><a href="#">${item.name}</a></p>
                        <p class="price"><span>￥${item.price}</span><del class="del">￥${item.price}</del></p>
                    </li>`
                    $ul.html(html);
                    $choice.append($ul);
                });
                                      
            }
        });
            

        // 人气排行榜tab标签切换
        var $content = $ul_tabs.next().children();
        var $liItems = $('#tabs').children();
        // 隐藏除了第一个意外的内容
        $content.slice(1).hide();
        // 给第一个li加高亮
        $liItems.first().addClass('active');
        $ul_tabs.on('mouseenter','li',function(){
            var idx = $(this).index();
            // 高亮
            $(this).addClass('active').siblings('li').removeClass();
            // 显示对应的内容
            $content.eq(idx).show().siblings('.tabcontent').hide();
        });

        
        
        
        
        
    });
})