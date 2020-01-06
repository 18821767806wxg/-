

//ajax请求方式：
//1.get请求方式
function ajaxGet(url,cb,data){
    // 1.处理要发送的数据
    data = data || {};
    var str = "";
    for(var i in data){
        str += `${i}=${data[i]}&`;
    }
    // 2.时间戳解决get请求被缓存的问题
    var d = new Date();
    url = url + "?" + str + "__lyt__="+d.getTime();
    // 3.开启ajax
    var xhr = new XMLHttpRequest();
    xhr.open("get",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            cb(xhr.responseText);
        }
    }
    xhr.send();
}



//2.post请求方式
function ajaxPost(url,cb,data){
    data = data || {};
    var str = "";
    for(var i in data){
        str += `${i}=${data[i]}&`;
    }
    str = str.slice(0,str.length-1);
    var xhr = new XMLHttpRequest();
    xhr.open("post",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            cb(xhr.responseText);
        }
    }
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(str);
}







function jsonp(url, cb, data) {
   
    var str = "";
    for (var i in data) {
        str += `${i}=${data[i]}&`;
    }
    var d = new Date();//时间戳，毫秒数
    url = url + "?" + str + "_ddf_=" + d.getTime();//拼接地址

   
    var script = document.createElement("script")
    script.src = url;
    document.body.appendChild(script);

  
    window[data[data.columnName]] = function (res) {
        cb(res)
    }
    script.remove();

}