$(document).ready(function() {
	var index=1;
	$('#prevPage').on('click',  function(event) {
		event.preventDefault();
		index = index - 1;
		if(index < 1) {
			index = 1;
		}
		pageNavHrefAttr(index);
	});
	$('#nextPage').on('click',  function(event) {
		event.preventDefault();
		index = index + 1;
		if(index > 3) {
			index = 3;
		}
		pageNavHrefAttr(index);
	});

	var productInfo = ['Option 1','Option 2','Option 3','Option 4','Option 5','Option 6','Option 7','Option 8','Option 9','Option 10','Option 11','Option 12','Option 13','Option 14','Option 15'];
	for(var k in productInfo){
		$('#firstPage .answers').append('<div class="checkbox"><label><input type="checkbox" class="firstQuestion" value="'+productInfo[k]+'">'+productInfo[k]+'</label></div>');
	}
	new Sel($('.firstQuestion'));


	var saleInfo = ['Option 11','Option 21','Option 31','Option 41','Option 51','Option 61','Option 71','Option 81','Option 91','Option 101','Option 111','Option 112','Option 113','Option 114','Option 151'];
	for(var k in saleInfo){
		$('#secondPage .answers').append('<div class="checkbox"><label><input type="checkbox" class="secondQuestion" value="'+saleInfo[k]+'">'+saleInfo[k]+'</label></div>');
	}
	new Sel($('.secondQuestion'));

	var managementInfo = ['Option 111','Option 321','Option 331','Option 341','Option 531','Option 361'];
	for(var k in managementInfo){
		$('#thirdPage .answers').append('<div class="checkbox"><label><input type="checkbox" class="thirdQuestion" value="'+managementInfo[k]+'">'+managementInfo[k]+'</label></div>');
	}
	new Sel($('.thirdQuestion'));


	$('#subbtn').on('click', function(event) {


		// $(this).css({
		// 	'height': $('#subdiv').outerHeight()
		// });

		var p1 = getParam($('.firstQuestion'));
		var p2 = getParam($('.secondQuestion'));
		var p3 = getParam($('.thirdQuestion'));
		if(p1.length == 0){
			alert('产品未选择');
			this.href = '#firstPage';
			index = 1;
			pageNavHrefAttr(index);
			
		}else if(p2.length == 0){
			alert('营销未选择');	
			this.href = '#secondPage';
			index = 2;
			pageNavHrefAttr(index);		
		}else if(p3.length == 0){
			alert('管理未选择');
			this.href = "#thirdPage"
			index = 3;
			pageNavHrefAttr(index);
		}else {
			$('.bottom').css({
				'display': 'none'
			});
			this.href = "#success"
			$('#success').append('<div>'+'数据展示：'+'</div>');
			$('#success').append('<div>'+'产品'+'</div>');
			$('#success').append('<div>'+p1.join('::')+'</div>');
			$('#success').append('<div>'+'营销'+'</div>');
			$('#success').append('<div>'+p2.join('::')+'</div>');
			$('#success').append('<div>'+'管理'+'</div>');
			$('#success').append('<div>'+p3.join('::')+'</div>');
		}


	});


});


function getParam($obj){
	var param = [];
	$obj.each(function(index, el) {
		if(el.checked){
			param.push(el.value);
		}
	});
	return param;
}

function Sel($obj){
	this.obj = $obj;
	this.init();
}


Sel.prototype.init = function(){
	var o = this.obj;

	for (var m=0; m<this.obj.length; m++){

		(function (obj,n){
			obj[n].onclick = function(){
				var questions = obj;
				var temp = 0;
				for(var k=0; k<questions.length; k++){
					if(questions[k].checked){
						temp = temp + 1;
					}
				}
				if(temp >= 3){
					for(var k=0; k<questions.length; k++){
						if(!questions[k].checked){
							questions[k].disabled="disabled";
						}
					}
				} else {
					for(var k=0; k<questions.length; k++){
						questions[k].disabled="";
					}				
				}
			}
        }(o,m));
	}
}



function pageNavHrefAttr(index){
	if(index==1){
		$('#prevPage').attr({
			'href':'#firstPage'
		});
		$('#nextPage').attr({
			'href':'#secondPage'
		});
	}

	if(index==2){
		$('#prevPage').attr({
			'href':'#secondPage'
		});
		$('#nextPage').attr({
			'href':'#secondPage'
		});
	}
	if(index==3){
		$('#prevPage').attr({
			'href':'#secondPage'
		});
		$('#nextPage').attr({
			'href':'#thirdPage'
		});
	}

}