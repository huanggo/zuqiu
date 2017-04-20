define(function(require, exports, module){
	module.exports = {
		checkPhone:function(phone){
			 if(!/^(13[0-9]|15[0|1|2|3|6|7|8|9]|18[0-9]|177)\d{8}$/.test(phone)){
	            return false;
	        }
	        return true;
		},
	 checknc:function(nc){
            if(!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(nc)){
            	return false;
            }
            return true;
		}

	}

})