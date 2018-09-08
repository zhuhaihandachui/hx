$(document).ready(function() {

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
	gen_img();



});

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

function gen_img(){

	var img_background = new Image();
	img_background.src= '../../../bocshhx/img/submit.jpg';


	img_background.onload =function(){
		$('#mycanvas').attr({
			'width': $(window).width(),
			'height': $(window).height()
		});
		var c = document.getElementById('mycanvas');
		var ctx = c.getContext("2d");
		ctx.drawImage(img_background, 0, 0,$(window).width(),$(window).height());
	
		//二维码想要展示的宽高
		var dw = 100;
		var dh = 100;
		// var wx = $(window).width() - dw-40;
		var wx = 40;
		var wy = $(window).height() - dh - 80;
		var border = 7;
		var fontSize = 20;
		var number1 = "123000001323111111111111111111113232131321213";
		var number1_before = "我是第";
		var number1_after = "位手机银行全员营销参与者。"
		var number1_linenumber=1;



		ctx.font = "bold "+fontSize+"px 宋体";
		ctx.textBaseline = "top";

		
		var restWidth = $(window).width()-wx-dw-border-20;

		var line1_width = 0;
		var line_height = 0;
		ctx.fillStyle = "black";
		ctx.fillText(number1_before,wx+dw+border+20,wy+line_height);
		ctx.fillStyle = "red";
		autoEnter(number1,restWidth-ctx.measureText(number1_before).width,ctx,line_height,wx+dw+border+20+ctx.measureText(number1_before).width,wy,fontSize,number1_linenumber,number1_before,number1_after);


		ctx.fillStyle = "green";
		ctx.fillRect(wx-border,wy-border,dw+2*border,dh+2*border);
		ctx.stroke();


		ctx.drawImage(document.getElementById('img1'), wx, wy, dw, dh);


		$('#newImage').attr({
			'src': c.toDataURL('image/jpg')
		});
	}

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