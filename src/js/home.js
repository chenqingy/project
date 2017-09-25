/* 
* @Author: Marte
* @Date:   2017-09-25 10:53:14
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-25 12:07:30
*/
require(['config'],function(){
    require(['jquery','common','xcarousel'],function($,common,xcarousel){
        //jquery加载完成后，执行这里的代码
        $('.carousel').xCarousel({
            imgs:['img/banner1.jpg','img/banner1.jpg','img/banner1.jpg','img/banner1.jpg','img/banner1.jpg'],
            width:783,
            height:480,
            type:'fade'
        });
        
    });
})