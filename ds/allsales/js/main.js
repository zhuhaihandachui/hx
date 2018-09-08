// $(document).ready(function() {
window.onload = function(){
	$(document).bind('ajaxSend', function(event) {
		console.log('ajaxsend ' + new Date());
		$('#loading').css({
			'display': 'block',
			'height': $(document).height()+"px"
		});
		$('#loading img').css({
			'position': 'fixed', 
			'left': $(document).width()/2 - 16 + "px",
			'top': $(document).height()/2 - 16 + "px"
		});
	}).bind('ajaxComplete', function(event) {
		console.log('ajaxcomplete ' + new Date());
		$('#loading').css({
			'display': 'none'
		});
	});;

	var timeout = 20000;

	var wrongmessage = "服务繁忙,请稍候使用";
	var warnmessage = "接口繁忙,请稍候";
	var loginmessage = "登录超时,请重新登录";

	// url
	// 生成二维码
	var qr_generate = "/sh/api/hx/ideavote/getDataList";

	// $.ajax({
	// 	cache: false,
	// 	type: "post",
	// 	timeout: timeout,
	// 	async: true,
	// 	url: qr_generate,
	// 	data: "",
	// 	success: function (data) {
	// 		//console.log(data);
	// 		gen_qr();

	// 	},
	// 	error: function (xhr, ajaxOptions, thrownError) {
	// 		alert(warnmessage);
	// 	}
	// });

	gen_qr();
	var x = gen_rankimg();
	gen_img('../../../bocshhx/img/timg.jpg', x);


}
// });

function gen_qr(){
	var qrcode1 = new QRCode(document.getElementById('qrcode'),{
		text: "http://www.qq.com",
		width: 160,
		height: 160
	});
	var qrcode = $(qrcode1._el);
    qrcode.hide();
	var canvas = qrcode.find('canvas').get(0);
	$('#img1').attr({
		'src': canvas.toDataURL('image/jpg')
	});
}

function gen_img(url, x){

	var img_background = new Image();
	img_background.src= url;


	img_background.onload =function(){
		$('#mycanvas').attr({
			'width': $(window).width(),
			'height': $(window).height()
		});
		var c = document.getElementById('mycanvas');
		var ctx = c.getContext("2d");
		ctx.drawImage(img_background, 0, 0,$(window).width(),$(window).height());
	
		//二维码想要展示的宽高
		var dw = 70;
		var dh = 70;
		var border = 5;
		// var wx = $(window).width() - dw-40;
		var wx = $(window).width() - dw - 2*border -30;
		var wy = $(window).height() - dh - 2*border - 40;

	
		//autoEnter(number1,restWidth-ctx.measureText(number1_before).width,ctx,line_height,wx+dw+border+20+ctx.measureText(number1_before).width,wy,fontSize,number1_linenumber,number1_before,number1_after);
		var ran_x = wx - 50 ;
		ctx.drawImage(document.getElementById('rankImage'), 30, wy, ran_x, ran_x * x);
		console.log(x);

		ctx.fillStyle = "white";
		ctx.fillRect(wx-border,wy-border,dw+2*border,dh+2*border);
		ctx.stroke();


		ctx.drawImage(document.getElementById('img1'), wx, wy, dw, dh);
		var logo_x = 15;
		var logo_y = 15;
		ctx.drawImage(document.getElementById('boclogo'), wx+dw/2-logo_x/2, wy+dh/2-logo_y/2,logo_x,logo_x);

		$('#newImage').attr({
			'src': c.toDataURL('image/jpg')
		});
	}

}


function gen_rankimg(){
		var c = document.getElementById('canvasnum');
		var fontSize = 16;
		var interval = 35;
		var num_width = 70;
		var l1f_w = 51;
		var l1a_w = 209;
		var l2f_w = 68;
		var l2a_w = 124
		var l3f_w = 85;
		var l3a_w = 22;
		var w = l1f_w+num_width+l1a_w;
		var h = 2*interval + fontSize

		$(c).attr({
			'width': w,
			'height': h
		});
		var cctx = c.getContext("2d");

		cctx.drawImage(document.getElementById('l1f'), 0, 0,l1f_w,fontSize);
		cctx.drawImage(document.getElementById('l1a'), l1f_w+num_width, 0,l1a_w,fontSize);
		cctx.drawImage(document.getElementById('l2f'), 0, interval,l2f_w,fontSize);
		cctx.drawImage(document.getElementById('l2a'), l2f_w+num_width, interval,l2a_w,fontSize);
		cctx.drawImage(document.getElementById('l3f'), 0, 2*interval,l3f_w,fontSize);
		cctx.drawImage(document.getElementById('l3a'), l3f_w+num_width, 2*interval,l3a_w,fontSize);


	

		cctx.font = "bold "+fontSize+"px 宋体";
		cctx.textBaseline = "top";
		cctx.fillStyle = "red";
		cctx.textAlign="center";
		cctx.fillText("323232",l1f_w+num_width/2,0);
		cctx.fillText("111",l2f_w+num_width/2,interval);
		cctx.fillText("33334",l3f_w+num_width/2,2*interval);

		$('#rankImage').attr({
			'src': c.toDataURL('image/jpg')
		});

		return  h / w;
}


function autoEnter(str, restWidth, ctx, line_height,left,wy,fontSize,line_number,str_before,str_after){
	var str_width = 0;
	var restStr = "";
			// console.log(restWidth);
	var flag = false;
	for (var i=0; i<str.length; i++){
		str_width += ctx.measureText(str[i]).width;
		// console.log(str_width);
		// if(str[i]=="第"){
		// 	ctx.fillStyle="black";
		// }

		if(str_width > restWidth){
			ctx.fillText(str.substring(0,i-1),left,wy+line_height);
			line_height += fontSize;
			restStr = str.substring(i-1);
			flag = true;
			line_number = line_number +1;
			break;
		}
	}

	if(flag){
		if(line_number == 2){
			restWidth = restWidth + ctx.measureText(str_before).width;

			left = left - ctx.measureText(str_before).width;
		}

		autoEnter(restStr,restWidth,ctx,line_height,left,wy,fontSize,line_number,str_before,str_after);
	}else{

		ctx.fillText(str,left,wy+line_height);
		ctx.fillStyle = "black";
		console.log(str);
		var rest = restWidth - ctx.measureText(str).width;
					// console.log(rest);
		var len = ctx.measureText(str).width;
					// console.log(len);
		for(var k=0; k<str_after.length; k++){

			len = len + ctx.measureText(str_after[k]).width;
				console.log(len);
				// console.log(str_after[k]);
				// console.log(str_after.substring(0,k-1));
			if(len> rest){
				ctx.fillText(str_after.substring(0,k),left+ctx.measureText(str).width,wy+line_height);
				break;
			}
			// ctx.fillText(str_after.substring(k),left,wy+line_height+fontSize);
		}



	}

}