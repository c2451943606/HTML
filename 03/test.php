<?php 

 // function requestByKey(){
 //        //准备请求参数
 //        $key ="3067d7e9a234484aaa59caae3c9718d8";
 //        $location = "仙居";
 //        $curlPost = "key=".$key."&location=".urlencode($location);
 //        //初始化请求链接
 //        $req=curl_init();
 //        //设置请求链接
 //        curl_setopt($req, CURLOPT_URL,'https://free-api.heweather.com/s6/weather/now?'.$curlPost);
 //        //设置超时时长(秒)
 //        curl_setopt($req, CURLOPT_TIMEOUT,3);
 //        //设置链接时长
 //        curl_setopt($req, CURLOPT_CONNECTTIMEOUT,10);
 //        //设置头信息
 //        $headers=array( "Accept: application/json", "Content-Type: application/json;charset=utf-8" );
 //        curl_setopt($req, CURLOPT_HTTPHEADER, $headers);
        
 //        curl_setopt($req, CURLOPT_SSL_VERIFYPEER, false);
 //        curl_setopt($req, CURLOPT_SSL_VERIFYHOST, false);
 //        $data = curl_exec($req);
 //        curl_close($req);
 //        return $data;
 //    }


    function requestByKey(){
        //准备请求参数
        // $key ="3067d7e9a234484aaa59caae3c9718d8";
        $location = "仙居";
        // $curlPost = "key=".$key."&location=".urlencode($location);
        //urlencode()函数原理就是首先把中文字符转换为十六进制，然后在每个字符前面加一个标识符%。
        //用于 传输
        $curlPost = "city=".urlencode($location);
        //初始化请求链接
        // /curl_init — 初始化一个cURL会话 
        $req=curl_init();
        //设置请求链接
        //curl_setopt — 设置一个cURL传输选项 
        curl_setopt($req, CURLOPT_URL,'http://www.sojson.com/open/api/weather/json.shtml?'.$curlPost);
        //设置超时时长(秒)
        curl_setopt($req, CURLOPT_TIMEOUT,3);
        //设置链接时长
        curl_setopt($req, CURLOPT_CONNECTTIMEOUT,10);
        //设置头信息
        $headers=array( "Accept: application/json", "Content-Type: application/json;charset=utf-8" );
        curl_setopt($req, CURLOPT_HTTPHEADER, $headers);
        
        curl_setopt($req, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($req, CURLOPT_SSL_VERIFYHOST, false);

        //curl_exec — 执行一个cURL会话 
        $data = curl_exec($req);
        // curl_close — 关闭一个cURL会话
        curl_close($req);        
        return $data;
    }

  requestByKey(); 
  



 ?>