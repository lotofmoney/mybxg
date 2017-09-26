define(['jquery', 'template', 'ckeditor', 'uploadify', 'region', 'datepicker', 'language', , 'validate', 'form'], function ($, template, CKEDITOR) {
    //调用接口，获取个人信息
    $.ajax({
        type: 'get',
        url: '/api/teacher/profile',
        dataType: 'json',
        success: function (data) {
            //解析数据，渲染页面
            var html = template('settingsTpl', data.result);
            $('#settingsInfo').html(html);

            //处理头像上传
            $('#upfile').uploadify({
                width: 120,
                height: 120,
                buttonText: '',
                itemTemplate: '<span><span>',
                swf: '/public/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/avatar',
                fileObjName: 'tc_avatar',
                onUploadSuccess: function (a, b) {
                    // console.log(b);
                    var obj = JSON.parse(b);
                    $('.preview img').attr('src', obj.result.path);
                }
            });

            //处理省市县三级联动
            $('#pcd').region({
                url: '/public/assets/jquery-region/region.json'
            });

            //处理富文本
            CKEDITOR.replace('editor');

            //处理表单提交
            $('#settingsForm').validate({
                sendForm: false,
                valid: function () {
                    var p = $("#p").find('option:selected').text();
                    var c = $("#c").find('option:selected').text();
                    var d = $("#d").find('option:selected').text();
                    var hometown = p + '|' + c + '|' + d;
                    //同步富文本内容
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    //提交表单
                    $(this).ajaxSubmit({
                        type: 'post',
                        url: '/api/teacher/modify',
                        data:{tc_hometown:hometown},
                        dataType: 'json',
                        success: function (data) {
                            if(data.code == 200){
                                //修改成功之后刷新当前页面
                                location.reload();
                            }
                        }
                    });
                }
            });
        }
    });
});