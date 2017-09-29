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
        var $datalist2 = $('.datalist2');
        // console.log($datalist2);
        $.ajax({
            url: "../api/goodslist.php", 
            success: function(res){
                // console.log(res);
                console.log($.parseJSON(res));
                res = $.parseJSON(res);
                var $ul = $('<ul/>');
                $ul.addClass('clearfix');
                var html = res.map(function(item){
                    console.log(item.imgurl);
                    return `<li data-guid="${item.id}">
                        <a href="details.html?id=${item.id}&name=${encodeURI(item.name)}&imgurl=${encodeURI(item.imgurl)}&price=${encodeURI(item.price)}&description=${encodeURI(item.description)}"><img src="${item.imgurl}"></a>
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                        <p class="price clearfix">${item.price}</p>
                    </li>`
                }).join('');
                $ul.html(html);

                $datalist2.html('') 
                $datalist2.append($ul);                    
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
        })
        
        
        
        
    });
})