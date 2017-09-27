define(['jquery'], function ($) {
    return {
        qs: function (key) {
            //获取URL参数中的指定的参数值
            var param = location.search.substr(1);
            // console.log(param);
            var result = '';
            if (param) {
                var ps = param.split('&');  //以&截取，变成数组
                $.each(ps, function (index, item) { //jquery遍历方法
                    var kv = item.split('=');
                    if (kv[0] == key) {
                        result = kv[1];
                        return false;   //终止each循环
                    }
                });
            }
            return result;
        },
        setMenu : function(path){
            $('.aside .navs a[href="'+path+'"]').addClass('active').closest('ul').show();
        }
    }
});