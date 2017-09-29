    require(['jquery'],function($){
        
        

        // 将头部引入
        // console.log($('#head'));
        $('#Head').load('../html/head_foot.html #head');
        if($('#Foot')[0]===undefined){
            $('#Foot1').load('../html/head_foot.html #foot1');
            
        }else{
            $('#Foot').load('../html/head_foot.html #foot');
        }
        
    });
