require(['config'],function(){
    require(['jquery','head_foot'],function($,head_foot){
        $('#LogIm').click(function(e){
            e.preventDefault();
            // console.log(666);
            var username = $('#username').val();
            var password = $('#password').val();
            if(username.trim()!==''){
                $.ajax({
                    url:'../api/logIn.php',
                    data:{username:username,password:password},
                    success:function(res){
                        console.log(res);
                        console.log(username,password);
                        if(res==='ok'){
                            // console.log('ok');
                            $('.error').html('登录成功').css('color','#58bc58');
                            // $('.saveLog').html(username);
                        }
                        if(res==='fail'){
                            $('.error').html('用户名或密码错误，请重试').css('color','#f00');
                        }
                    }
                });
            }else{
                $('.error').html('用户名不能为空').css('color','#f00');

            }
        })
    })
})