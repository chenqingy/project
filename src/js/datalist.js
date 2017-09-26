require(['config'],function(){
    require(['jquery','common'],function($,common){
        //jquery加载完成后，执行这里的代码
        
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
        
        
        
        
        
        
    });
})