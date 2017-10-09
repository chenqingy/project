require(['config'],function(){
    require(['jquery','head_foot','common'],function($,head_foot,common){
        var showCode = common.yanzhengma();
        // console.log(showCode);
        $('.showCode').html(showCode);

        // 换一个验证码
        $('.code').click(function(e){
            e.preventDefault();
            showCode=common.yanzhengma();
            $('.showCode').html(showCode);
        });

        $('tbody').on('focus','input',function(){
            // console.log(666);
            // console.log($(this));
            var $show = $(this).parent().next();
            // console.log($show);
            $show.show();
        }).on('blur','input',function(){
            // 用户名
            $('.text_tips').html('');
            var reg = /^\w{4,20}$/i;
            // console.log($('#username').val());
            if(!reg.test($('#username').val())){
                // alert('登录帐号格式错误');
                $('.text_tips').html('用户名必须由字母和数字组成');
                return false;
            }     
            // 密码
            var reg3=/^\S{6,16}$/;
            if(!reg3.test($(this).val())){
                $('.pass_tips').html('密码格式错误');                    
                return false;
            }else{
                $('.pass_tips').html('');
            } 
            // 再次输入密码
            // console.log($('#password').val(),$('#repassword').val());
            if($('#password').val()!==$('#repassword').val()){
                $('.repass_tips').html('两次密码不一致');
                return false;
            }else{
                $('.repass_tips').html('');
            }

            // 邮箱
            var reg2=/^[a-zA-Z][\w]{3,17}@[\w]{2,5}(\.[a-z]{2,5})+$/;
            if(!reg2.test($('#email').val())){
                // console.log(666);
                $('.email_tips').html('电子邮箱格式错误');
                return false;
            }else{
                $('.email_tips').html('');
            }            
        });
        // 立即注册按钮
        $('#reg_btn').on('click',function(e){
            e.preventDefault();
            // console.log(666);
            
            // 对比验证码
            var verCode = $('#verCode').val();
            // console.log(verCode);
            var html = $('.showCode').html();
            // console.log(html);
            if(verCode!=html){
                $('.ver_tips').html('验证码不一致');
            }else{
                $('.ver_tips').html('');
            }
            if($('#username').val().trim()!==''){
                var username = $('#username').val();
                var password = $('#password').val();
                $.ajax({
                    url:'../api/register.php',
                    type:'GET',
                    data:{username:username,password:password},
                    success:function(res){
                        console.log(res);
                        console.log(username,password);
                        if(res==='ok'){
                            $('.text_tips').html('帐号可以注册').css('color','#58bc58');
                        }
                        if(res==='fail'){
                            $('.text_tips').html('用户名已经被注册');
                        }
                    }
                });
            }else{
                $('.text_tips').html('用户名不能为空');
            }
        });
        
    });
})