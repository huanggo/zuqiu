define(function(require, exports, module){
	//加载zepto ，还有使用tap
	require('zepto');
	require('tap');
    var common = require('./common');
    //获取元素的节点

    var username = $('.input-id'),pwd = $(".input-pwd"),submit = $(".btn");

    submit.on('click',function(event) {
    	event.preventDefault();
    	//数据监测
        var params = {};
        params.username = username.val().trim();
        params.pwd = pwd.val();


        if (!common.checkPhone(params.username)) {
           alert("号码输入错误！");
           return
        };

        if (params.pwd.length < 6 || params.pwd.length > 20) {
        	alert("密码长度错误！");
        	return 
        };

        $.get("assets/api/login.json",params,function(res){
        	//console.log(res)
        	if (res.code == 0) {
        		location.href = "/index.html"
        	};
        })
    });
})