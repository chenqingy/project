/* 
* @Author: Marte
* @Date:   2017-09-25 10:53:14
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-07 16:23:10
*/
require(['config'],function(){
    require(['jquery','common','xcarousel','head_foot'],function($,common,xcarousel,head_foot){
        //jquery加载完成后，执行这里的代码
        
        
        // 右边锚链接滚动事件
        $('#link').hide();        
        document.onscroll = function(){
            if(window.scrollY>180){
                $('#link').fadeIn();
            }else{
                $('#link').fadeOut();
            }
        }



        //轮播图效果
        $('.carousel').xCarousel({
            imgs:['../img/banner1.jpg','../img/banner1.jpg','../img/banner1.jpg','../img/banner1.jpg','../img/banner1.jpg'],
            width:783,
            height:480,
            type:'fade',
            duration:3000
        });
        $('.carousel>span').css('display','none'); 
        /*
            hover轮播图的时候，按钮出现 否则消失的动画效果
         */
        $('.carousel').on('mouseenter',function(){
            $(this).children('span').fadeIn();
        }).on('mouseleave',function(){
            $(this).children('span').fadeOut();
        });
        // 以上是轮播图效果
        
        // 秒杀倒计时
        var h5 = document.querySelector('.today_l h5');
        var end = '2017/10/10 16:26:00';
        //获取结束时间距离1970年的毫秒数es5方法
        var endTime=Date.parse(end);
        Time();
        var daojishi = setInterval(Time,1000);
        function Time(){
            //创建当前时间距离1970年的毫秒数 ES5方法
            var nowTime = Date.now();

            //结束时间距离当前时间还有offset秒
            var offset = parseInt((endTime-nowTime)/1000);

            if(offset<=0){
                clearInterval(daojishi);
                return;
            };
            var sec = offset%60;
            var min = parseInt(offset/60)%60;
            var hour = parseInt(offset/60/60)%24;

            h5.innerHTML=`<span>${hour}</span>:<span>${min}</span>:<span>${sec}</span>`;

        };


        // 请求“今日秒杀”的数据 
        var $seckill = $('#seckill');        
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'today'"
            },
            success: function(res){
                var res = $.parseJSON(res);
                var $ul=$('<ul/>');
                $ul.addClass('clearfix');
                var $html = $.map(res,function(item){
                    return `<li>
                        <a href="#"><img src="${item.imgurl}"></a>
                        <p class="title">${item.name}</p>
                        <span>${item.description}</span>
                        <p class="price clearfix">
                        <span>${item.sale_price}<del>${item.price}</del></span><a href="#">${'立即秒杀'}</a>
                        </p>
                    </li>`
                }).join('');
                $ul.html($html);
                $seckill.html('') 
                $seckill.append($ul);               
            }
        });
        function showLeftData($ele,res){
            var res = $.parseJSON(res);
            // console.log(res);
            var $html =$.map(res,function(item){
                // console.log(item);
                return `<a href="datalist.html"><img src="${item.imgurl}" /></a>`;
            }).join('');
            $ele.html($html); 
        };
        // 请求左边的数据
        var $1Fleft = $('.1Fleft');
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'1Fleft'"
            },
            success:function(res){
               showLeftData($1Fleft,res);        
            }
        });
        // 请求左边的数据
        var $2Fleft = $('.2Fleft');
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'2Fleft'"
            },
            success:function(res){
                showLeftData($2Fleft,res);        
            }
        });
        // 请求左边的数据
        var $3Fleft = $('.3Fleft');
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'3Fleft'"
            },
            success:function(res){
                showLeftData($3Fleft,res);       
            }
        });
        // 请求左边的数据
        var $4Fleft = $('.4Fleft');
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'4Fleft'"
            },
            success:function(res){
                showLeftData($4Fleft,res);       
            }
        });
        // 请求左边的数据
        var $5Fleft = $('.5Fleft');
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'5Fleft'"
            },
            success:function(res){
                showLeftData($5Fleft,res);       
            }
        });
        // 请求左边的数据
        var $6Fleft = $('.6Fleft');
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'6Fleft'"
            },
            success:function(res){
                showLeftData($6Fleft,res);       
            }
        });
        // 请求左边的数据
        var $7Fleft = $('.7Fleft');
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'7Fleft'"
            },
            success:function(res){
                showLeftData($7Fleft,res);        
            }
        });
        // 请求左边的数据
        var $8Fleft = $('.8Fleft');
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'8Fleft'"
            },
            success:function(res){
                showLeftData($8Fleft,res);       
            }
        });

        function showData($ele,res){
            var res = $.parseJSON(res);
            var $ul=$('<ul/>');
            $ul.addClass('clearfix');
            var $html = $.map(res,function(item){
                return `<li>
                    <a href="datalist.html"><img src="${item.imgurl}"></a>
                    <p class="title">${item.name}</p>
                    <p class="price">${item.price}</p>
                </li>`
            }).join('');
            $ul.html($html);
            $ele.html('') 
            $ele.append($ul); 
        }
        // 请求右边的数据  
        var $1Fright =  $('.1Fright');    
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'1Fright'"
            },
            success: function(res){
                showData($1Fright,res)              
            }
        });
        var $2Fright =  $('.2Fright');    
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'2Fright'"
            },
            success: function(res){
                showData($2Fright,res)              
            }
        });
        var $3Fright =  $('.3Fright');    
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'3Fright'"
            },
            success: function(res){
                showData($3Fright,res)              
            }
        });
        var $4Fright =  $('.4Fright');    
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'4Fright'"
            },
            success: function(res){
                showData($4Fright,res)              
            }
        });
        var $5Fright =  $('.5Fright');    
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'5Fright'"
            },
            success: function(res){
                showData($5Fright,res)              
            }
        });
        var $6Fright =  $('.6Fright');    
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'6Fright'"
            },
            success: function(res){
                showData($6Fright,res)              
            }
        });
        var $7Fright =  $('.7Fright');    
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'7Fright'"
            },
            success: function(res){
                showData($7Fright,res)              
            }
        });
        var $8Fright =  $('.8Fright');    
        $.ajax({
            url: "../api/indexdata.php", 
            data:{
                type:"'8Fright'"
            },
            success: function(res){
                showData($8Fright,res)              
            }
        });
    });
})