define(function(require, exports, module){
  //加载zepto ，还有使用tap
	require('zepto');
	require('tap');
	require('iscroll');
	require('swiper');
	var template = require('Tamplate'); //

	var common = require('./common');

	$(function(){

		  var name=$(".sec3-name");
          var btn=$(".sea-btn");
          var gz=$(".gz");


var  myscroll=new IScroll("#wrapper3",{
    	
         probeType:2
    })

  btn.on("tap",function(event){
  	 
  	  event.preventDefault();
  	  var val=name.val();
  	  var data= {params: val};

  	  getData(data,function(data){
  	  	
         var obj={
         	 list2:[]
         };
         data.list2.forEach(function(value){
         	
         	 var reg=new RegExp(val,'g');
         	 if(reg.test(value.name)){

         	 	obj.list2.push(value);
         	 }
         })
         var html=template("into",obj);
         $(".sec3-ul").html(html);
         myscroll.refresh();

  	  })

  })

  function getData(data,successFn){
  	  $.ajax({
				url: "assets/api/found.json",
				data: data,
				success: successFn
			})
  }
  
})
}); 

 