/* 
* @Author: Marte
* @Date:   2017-09-25 10:53:14
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-25 14:34:17
*/
require(['config'],function(){
    require(['jquery','common','xcarousel'],function($,common,xcarousel){
        //jquery加载完成后，执行这里的代码
        
        
        //轮播图效果
        $('.carousel').xCarousel({
            imgs:['img/banner1.jpg','img/banner1.jpg','img/banner1.jpg','img/banner1.jpg','img/banner1.jpg'],
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
        
        
        
        
    });
})