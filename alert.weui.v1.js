/**
*    jquery、zepto 手机weui1.0+弹窗插件
*    调用方法（中括号的为可选参数）：
*    $.alert([title,]msg[,function])
*    $.confirm([title,]msg[,function])
*    version:2016-09-26
*/
!function ($) {
	$._isalert=0,
	$.alert=function(){
		if(arguments.length){
			$._isalert=1;
			return $.confirm.apply($,arguments);
		}
	},
	$.confirm=function(title,msg,callback,ok,cancel){
		if(typeof title =='string'){
			if(msg==null||typeof msg =='function'){
				cancel = typeof ok =='string'?ok:'取消';
				ok = typeof callback =='string'?callback:'确定'
				callback =msg;msg = title||'';title = '信息提示';
			}
			var d = $('<div class="weui-mask"></div><div class="weui-dialog '+(/android/i.test(navigator.userAgent)&&'weui-skin_android')+'"><div class="weui-dialog__hd"><strong class="weui-dialog__title">'+title+'</strong></div><div class="weui-dialog__bd">'+msg+'</div><div class="weui-dialog__ft"><a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" data-r="0">取消</a><a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" data-r="1">确定</a></div></div>')
			$._isalert&&d.find('.weui-dialog__btn_default').remove();
			d.on('contextmenu',!1)
			.on('click','.weui-dialog__btn',function(){
				typeof callback=='function'&& callback.call(d,$(this).data('r'))
				d.remove();
			}).appendTo('body');
		}
		$._isalert=0;
	}
}($);
