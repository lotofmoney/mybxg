define(['jquery','cookie'],function($){
    // console.log($('#loginForm').serialize());
    $("#loginBtn").click(function(){
        console.log(123);
        $.ajax({
            type: 'post',
            url:'/api/login',
            data:$('#loginForm').serialize(),
            dataType:'json',
            success:function(data){
                if(data.code == 200){
                    //把用户登录信息储存到cookie中，方便跨页面共享数据
                    $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
                    // 登陆成功，跳转到主页面
                    location.href = '/main/index';
                }
            }
        });
        // location.href = '/main/index';
        return false;       //阻止按钮默认行为
    });
})