
define(function(require, exports, module){
	$(function() {

		//加载zepto ，还有使用tap
		require('zepto');
		require('tap');
		require('iscroll');
		require('swiper');
		var template = require('Tamplate'); 
	    
	    console.log($("#iscroll"));
	    
	   var  myscroll = new IScroll("#iscroll",{
	    	 mouseWheel: true,
	         probeType:2
	    })




		$.get('assets/api/cutecat.json',function(res){
	         var html= template("into",res);
	         $(".sec2-ul").html(html);
	         myscroll.refresh();
		})
	})
	  
})

 