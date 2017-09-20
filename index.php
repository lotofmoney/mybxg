<?php
    // header('Content-Type:text/html;Charset=utf-8'); 
    // include('./header.html');
    // echo '<div>主页内容</div>';
    // include('./footer.html');

    

    // // var_dump($_SERVER);
    // $path = $_SERVER['PATH_INFO'];
    // // echo $path;

    // include('./views'.$path.'.html');


    //默认备注名称
    $dir = 'main';
    //默认文件名称
    $filename = 'index';

    //处理路径
    if(array_key_exists('PATH_INFO',$_SERVER)){
        //PATH_INFO属性存在
        //获取请求路径
        $path = $_SERVER['PATH_INFO'];//          /main/index
        //去掉第一个斜杠
        $str = substr($path,1);     //main/index
        //字符串分割，和js中的split很想
        $ret = explode('/',$str);
        if(count($ret)==2){
            //路由有两层
            $dir = $ret[0];//覆盖目录
            $filename = $ret[1];//覆盖文件名称
        }else{
            //其他情况，全部跳转登录页面
            $filename = 'login';
        }
    }

    //嵌入子页面
    include('./views/'.$dir.'/'.$filename.'.html');
    ?>