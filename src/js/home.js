/* 
* @Author: Marte
* @Date:   2017-09-25 10:53:14
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-29 14:53:08
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
        var end = '2017/09/30 16:26:00';
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
            success: function(res){
                // console.log($.parseJSON(res));
                var res = $.parseJSON(res);
                var $ul=$('<ul/>');
                $ul.addClass('clearfix');
                var html = res.map(function(item){
                    return `<li>
                        <a href="#"><img src="${item.imgurl}"></a>
                        <p class="title">${item.name}</p>
                        <span>${item.description}</span>
                        <p class="price clearfix">
                        <span>${item.sale_price}<del>${item.price}</del></span><a href="#">${'立即秒杀'}</a>
                        </p>
                    </li>`
                }).join('');
                $ul.html(html);
                $seckill.html('') 
                $seckill.append($ul);
            }
        });
        

        
        
        
    });
})