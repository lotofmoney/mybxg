define(['jquery','template','util'],function($,template,util){
    //设置左侧菜单选中功能
    util.setMenu(location.pathname);    
    //获取所有的课程列表数据
    $.ajax({
        type: 'get',
        url:'/api/course',
        dataType : 'json',
        success:function(data){
            //解析数据，渲染页面
            var html = template('courseTpl',{list:data.result});
            $('#courseInfo').html(html);
        }
    });
});