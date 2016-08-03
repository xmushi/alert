/**
*    jquery 弹窗插件
*    调用方法（中括号的为可选参数）：
*    $.alert(string[,function])
*    $.confirm(string[,function])
*    $.tips(string[,number])
*    version:2016-07-11
*/
!function ($) {
    $.extend({
    	_isalert:0,
		alert:function(){
			if(arguments.length){
				$._isalert=1;
				return $.confirm.apply($,arguments);
			}
		},
		confirm:function(){
			var args=arguments;
			if(args.length){
				var d =$('<div class="alert_overlay"></div><div class="alert_msg"><div class="alert_content">'+args[0]+'</div><div class="alert_buttons"><button class="alert_btn alert_btn_ok">确定</button><button class="alert_btn alert_btn_cancel">取消</button></div></div>'),
				fn=args[1],
				flag=1,
				_click = function(e){
					typeof fn=='function'?(fn.call(d,e.data.r)!=!1&&d.remove()):d.remove();
				};
				$._isalert&&d.find('.alert_btn_cancel').hide();
				d.on('contextmenu',!1)
				.on('click','.alert_btn_ok',{r:!0},_click)
				.on('click','.alert_btn_cancel',{r:!1},_click)
				.appendTo('body');
			}
			$._isalert=0;
		},
		tips:function(){
			var args=arguments;
			if(args.length){
				var tipsContainer = $('.alert_tips_container');
				tipsContainer.length||(tipsContainer=$('<div class="alert_tips_container"></div>').appendTo('body'));
				$('<div class="alert_tips_item">'+args[0]+'</div>').appendTo(tipsContainer).fadeIn('fast').delay(args[1]*1||2000).slideUp('fast',function(){$(this).remove();});
			}

		}
	});
}($);