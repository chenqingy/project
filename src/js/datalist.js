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
            




        // 人气排行榜tab标签切换
        var $ul_tabs = $('#tabs')
        var $content = $ul_tabs.next().children();
        var $liItems = $('#tabs').children();
        // 隐藏除了第一个意外的内容
        $content.slice(1).hide();
        // 给第一个li加高亮
        $liItems.first().addClass('active');
        $ul_tabs.on('mouseenter','li',function(){
            // 获取当前索引值
            var idx = $(this).index();
            // 高亮
            $(this).addClass('active').siblings('li').removeClass();
            // 显示对应的内容
            $content.eq(idx).show().siblings('.tabcontent').hide();
        })
        
        
        
        
    });
})