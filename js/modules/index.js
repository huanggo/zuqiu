define(function(require,exports,module){
	//加载zepto,还有使用tab
	require('zepto');
	require('tap');
	require('iscroll');
	require('swiper');
	var template=require('Tamplate');
	var common = require('./common');
  
  $('.box').height(window.innerHeight-102);
  

  //创建swipe 
   var iscroll_0,iscroll_1,iscroll_2;

  var myswipe=new Swiper(".swiper-container",{

     pagination: '.swiper-pagination',
     paginationClickable: true,
     bulletClass : 'div',

     onInit:function(){
     	fetchList(0);
     },
     onSlideChangeEnd:function(swipe){
           fetchList(swipe.activeIndex)
         },
     bulletActiveClass : 'sele',
     paginationBulletRender: function (index,className) {
          	   var  arr = ["足球现场","足球生活","足球美女"];
          	   return '<li class="' + className + '">' + arr[index] + '</li>'
		     }

  })

  function fetchList(page){
  	 $.get('assets/api/index.json',{pages:page},function(data){
           var html=template("into",data);
           
           $(".wrap-ul-"+page).html(html);
          creatIscroll(page);
  	 });
  }
  function creatIscroll(scrollPage){
    var flag = null,maxScroll = 0, iscroll,num = 0;
            upTag = $("#upTag_"+scrollPage);

        iscroll = new IScroll("#iscroll_" + scrollPage,{
        	 mouseWheel: true,
        	 probeType:2
           
        });
    
     
     iscroll.on('scroll', function(){
                       if(this.directionY && !flag && this.y < this.maxScrollY-40){
                            flag = "up";
                            upTag.html("释放加载...");
                            this.maxScrollY = this.maxScrollY-40;
                       }else if(this.directionY==-1&&flag=="up"&&this.y>this.maxScrollY-40){
                            flag="";
                            upTag.html("上拉");
                            this.maxScrollY = this.maxScrollY + 40;
                       };
                  }); 
   iscroll.on('scrollEnd', function(){
             
                  if(flag=="up"){

                      upTag.html("加载中...");
                      var _this = this;
                      into(scrollPage,num,function(){
                           upTag.html("上拉");

                           flag="";
                           _this.refresh();
                           num++;
                      });
                   }
              }); 
       setTimeout(()=>{
            iscroll.refresh();
    	},10)

    	 return iscroll

  }


	function into(scrollPage,num,cb){
		console.log(scrollPage);
		$.get('assets/api/index.json',{pages:scrollPage,num:num},function(data){
			var html=template("into",data);
			
			console.log($(".wrap-ul-"+scrollPage).html(html));
			 $(".wrap-ul-"+scrollPage).append(html)
			cb()
		})
	}
})
