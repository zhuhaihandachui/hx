$(document).ready(function() {


	var index=1;

	$('#prevPage').on('click',  function(event) {
		event.preventDefault();
		index = index - 1;
		if(index < 1) {
			index = 1;
		}
		pageNavHrefAttr(index);
		$('#subbtn').attr({
			'href': '#thirdPage'
		});
	});
	$('#nextPage').on('click',  function(event) {
		event.preventDefault();
		index = index + 1;
		if(index > 3) {
			index = 3;
		}
		pageNavHrefAttr(index);
		$('#subbtn').attr({
			'href': '#thirdPage'
		});
	});



	$('#tab-content').css({
		'height' : $(window).height() - 40 + 'px'
	});




	$(document).bind('ajaxSend', function(event) {
		console.log('go');
		$('#loading').css({
			'display': 'block',
			'height': $(document).height()+"px"
		});
		$('#loading img').css({
			'left': $(document).width()/2 - 16 + "px",
			'top': $(document).height()/2 - 16 + "px"
		});
	}).bind('ajaxComplete', function(event) {
		console.log('end');
		$('#loading').css({
			'display': 'none'
		});
	});;


	var timeout = 10000;

	var wrongmessage = "服务繁忙,请稍候使用";
	var warnmessage = "接口繁忙,请稍候";
	var loginmessage = "登录超时,请重新登录";

	// url
	//获取各个项目列表
	var infolisturl = "/sh/api/hx/ideavote/getDataList";
	//提交选项
	var addUserOptsurl = "/sh/api/hx/ideavote/addUserOpts";




	//数据定义;
	var productInfo = [];
	//	var productInfo = ['Option 1','Option 2','Option 3','Option 4','Option 5','Option 6','Option 7','Option 8','Option 9','Option 10','Option 11','Option 12','Option 13','Option 14','Option 15'];
	var saleInfo = [];
	//	var saleInfo = ['Option 11','Option 21','Option 31','Option 41','Option 51','Option 61','Option 71','Option 81','Option 91','Option 101','Option 111','Option 112','Option 113','Option 114','Option 151'];
	var managementInfo = [];
	//  var managementInfo = ['Option 111','Option 321','Option 331','Option 341','Option 531','Option 361'];


	//测试单机数据
    				var test = {"list":[{"caseId":"C001","caseName":"FT付款汇利达","type":"1"},{"caseId":"C002","caseName":"“链上中银”分行特色供应链金融服务平台II期","type":"1"},{"caseId":"C003","caseName":"自由贸易账户体系下跨境人民币货币转换（汇入/汇出）","type":"1"},{"caseId":"C004","caseName":"净值型产品“中银策略-睿富系列”","type":"1"},{"caseId":"C005","caseName":"中银智富周期开放-7天系列理财产品","type":"1"},{"caseId":"C006","caseName":"“精益求金”—金融机构非标准化投融资产品","type":"1"},{"caseId":"C007","caseName":"“中银申城产融一体化”产品","type":"1"},{"caseId":"C008","caseName":"大宗商品衍生品交易业务","type":"1"},{"caseId":"C009","caseName":"自贸区代客NDCCS","type":"1"},{"caseId":"C010","caseName":"银票质押黄金租赁","type":"1"},{"caseId":"C011","caseName":"携程APP“线上兑换，线下取钞”业务","type":"1"},{"caseId":"C012","caseName":"女儿金","type":"1"},{"caseId":"C013","caseName":"职业年金批量支付产品","type":"1"},{"caseId":"C014","caseName":"中国外汇交易中心人民币对卢布同步交收卢布代理结算银行","type":"1"},{"caseId":"C015","caseName":"主板黄金保证金封闭运行系统","type":"1"},{"caseId":"C016","caseName":"支付宝跨境电商出口","type":"1"},{"caseId":"C017","caseName":"科创中小企业“投贷联动”业务模式","type":"1"},{"caseId":"Y001","caseName":"通用电气医疗单证及贸易融资专属服务方案","type":"2"},{"caseId":"Y002","caseName":"中建八局在线供应链营销方案","type":"2"},{"caseId":"Y003","caseName":"“全功能型”标准仓单质押融资方案","type":"2"},{"caseId":"Y004","caseName":"国内信用证保兑业务","type":"2"},{"caseId":"Y005","caseName":"中交三航局在线供应链营销方案","type":"2"},{"caseId":"Y006","caseName":"华申在线供应链营销方案","type":"2"},{"caseId":"Y007","caseName":"中银一户通专项营销","type":"2"},{"caseId":"Y008","caseName":"中海集运FTN船舶融资贷款项目","type":"2"},{"caseId":"Y009","caseName":"上海建工城市基础设施产业基金","type":"2"},{"caseId":"Y010","caseName":"跨国公司总部客户综合金融服务方案项目","type":"2"},{"caseId":"Y011","caseName":"伊顿（中国）投资有限公司海内外联动营销","type":"2"},{"caseId":"Y012","caseName":"家乐福在华企业综合金融服务方案","type":"2"},{"caseId":"Y013","caseName":"沃尔沃全球统一金融服务","type":"2"},{"caseId":"Y014","caseName":"寿险公司长期限利率债分销营销方案","type":"2"},{"caseId":"Y015","caseName":"东风日产汽车金融有限公司2017年金融债券主承销商营销方案","type":"2"},{"caseId":"Y016","caseName":"远东租赁2017年度第二期资产支持票据","type":"2"},{"caseId":"Y017","caseName":"“中银双创”- 中银创益理财计划&中银创利资管计划","type":"2"},{"caseId":"Y018","caseName":"“创智汇赢”—境内外币非标准化投融资产品","type":"2"},{"caseId":"Y019","caseName":"金融机构金融市场全产品营销","type":"2"},{"caseId":"Y020","caseName":"跨国集团外汇业务创新服务方案","type":"2"},{"caseId":"Y021","caseName":"个人期权综合性策略营销方案","type":"2"},{"caseId":"Y022","caseName":"CCS业务创新营销服务方案","type":"2"},{"caseId":"Y023","caseName":"企业汇率保值业务营销创新服务方案","type":"2"},{"caseId":"Y024","caseName":"上海高校“校长杯”平台营销案例","type":"2"},{"caseId":"Y025","caseName":"公共号管家","type":"2"},{"caseId":"Y026","caseName":"自贸区金融服务“一带一路”重大项目方案","type":"2"},{"caseId":"Y027","caseName":"股权投资企业自贸区综合产品服务方案","type":"2"},{"caseId":"Y028","caseName":"中银消费双创信贷资产转让业务","type":"2"},{"caseId":"Y029","caseName":"高桥石化并购BP持有的上海赛科50%股权项目","type":"2"},{"caseId":"Y030","caseName":"平安租赁自贸区FT账户与非FT账户一体化银团项目","type":"2"},{"caseId":"Y031","caseName":"展讯通信（上海）有限公司“FT贷款+CCS组合”营销方案","type":"2"},{"caseId":"Y032","caseName":"金融租赁公司海内外发债联动","type":"2"},{"caseId":"Y033","caseName":"PVH集团营销方案","type":"2"},{"caseId":"Y034","caseName":"支付宝（中国）网络技术有限公司30亿元信用总量营销方案","type":"2"},{"caseId":"Y035","caseName":"虹口支行京东金融121亿元股权外转中项目","type":"2"},{"caseId":"Y036","caseName":"中银单位结算卡之定向缴费卡营销方案","type":"2"},{"caseId":"Y037","caseName":"携程网整体营销方案","type":"2"},{"caseId":"Y038","caseName":"中银财私一体化","type":"2"},{"caseId":"Y039","caseName":"彩乐盟异业联盟电子商务平台","type":"2"},{"caseId":"Y040","caseName":"Swatch Pay校园应用方案","type":"2"},{"caseId":"Y041","caseName":"信用卡互联网渠道获客","type":"2"},{"caseId":"Y042","caseName":"中高端客户品质服务","type":"2"},{"caseId":"Y043","caseName":"国旅跨境业务联动拓客营销项目","type":"2"},{"caseId":"Y044","caseName":"张江专修学院专属跨境产品包项目","type":"2"},{"caseId":"Y045","caseName":"安居客综合金融服务方案","type":"2"},{"caseId":"Y046","caseName":"华政“青春E校园”平台校园卡充值","type":"2"},{"caseId":"Y047","caseName":"东华大学新生网申通","type":"2"},{"caseId":"Y048","caseName":"高校在线缴费平台方案","type":"2"},{"caseId":"Y049","caseName":"银保促托管、托管反哺银保","type":"2"},{"caseId":"Y050","caseName":"东方证券“债券通”独家代理清算","type":"2"},{"caseId":"Y051","caseName":"海内外联动助力国泰君安证券H股成功上市","type":"2"},{"caseId":"Y052","caseName":"整合全行销售资源，实现与金融机构的全方位合作","type":"2"},{"caseId":"Y053","caseName":"上海保险交易所全面战略业务合作","type":"2"},{"caseId":"Y054","caseName":"CIBM联动营销方案","type":"2"},{"caseId":"Y055","caseName":"新加坡政府投资公司总分支行联动服务方案","type":"2"},{"caseId":"Y056","caseName":"赛赫投贷联动带动全产品营销落地","type":"2"},{"caseId":"Y057","caseName":"中移动跨境业务渠道外嵌","type":"2"},{"caseId":"G001","caseName":"跨境人民币业务“拓客户、抓流程、促沟通”三维管理方案","type":"3"},{"caseId":"G002","caseName":"大宗商品客户授信适配性意见","type":"3"},{"caseId":"G003","caseName":"创立上海市银行外汇及跨境人民币业务自律机制","type":"3"},{"caseId":"G004","caseName":"建立支行外汇档案管理系统","type":"3"},{"caseId":"G005","caseName":"对公开户效能提升项目","type":"3"},{"caseId":"G006","caseName":"国内结算中间业务收入管理","type":"3"},{"caseId":"G007","caseName":"“金融市场连连看”管理创新","type":"3"},{"caseId":"G008","caseName":"上海分行投行资管业务“一道防线”风险防控方案","type":"3"},{"caseId":"G009","caseName":"理财托管系统数据直连及处理自动化项目","type":"3"},{"caseId":"G010","caseName":"金融机构客户管理创新方案","type":"3"},{"caseId":"G011","caseName":"消费金融预审批系统","type":"3"},{"caseId":"G012","caseName":"UTC集团全国跨省联动发卡模式","type":"3"},{"caseId":"G013","caseName":"代发全视图报表分析工具“代发三宝”","type":"3"},{"caseId":"G014","caseName":"消费金融板块化管理措施","type":"3"},{"caseId":"G015","caseName":"消费金融业务品牌小组负责制创新","type":"3"},{"caseId":"G016","caseName":"中国银行上海市分行建设项目管理系统","type":"3"},{"caseId":"G017","caseName":"移动端风险管理信息化平台","type":"3"},{"caseId":"G018","caseName":"以岗代训人员管理规程及考核评价标准作业流程","type":"3"},{"caseId":"G019","caseName":"ISO20000及ISO27001管理体系建设","type":"3"},{"caseId":"G020","caseName":"大数据综合金融服务平台","type":"3"},{"caseId":"G021","caseName":"联动营销平台","type":"3"},{"caseId":"G022","caseName":"易汇通","type":"3"},{"caseId":"G023","caseName":"盛付通本外币托收","type":"3"},{"caseId":"G024","caseName":"分行特色业务印章流程优化项目","type":"3"},{"caseId":"G025","caseName":"分行特色BGL优化管控项目","type":"3"},{"caseId":"G026","caseName":"网点资料留存模式改造项目","type":"3"},{"caseId":"G027","caseName":"对公手工回单改造及取消闲置回单箱配套项目","type":"3"},{"caseId":"G028","caseName":"电销在客户生命周期管理中的应用","type":"3"},{"caseId":"G029","caseName":"服务档案电子化管理平台","type":"3"},{"caseId":"G030","caseName":"银行业无障碍环境网点建设","type":"3"},{"caseId":"G031","caseName":"中银全球智汇产品智选项目","type":"3"},{"caseId":"G032","caseName":"国内支付监控管理体系","type":"3"},{"caseId":"G033","caseName":"证券清算业务全景应急方案","type":"3"},{"caseId":"G034","caseName":"境外机构账户实例教程","type":"3"},{"caseId":"G035","caseName":"上门对账共享平台","type":"3"},{"caseId":"G036","caseName":"增值税电子普通发票项目","type":"3"},{"caseId":"G037","caseName":"基于内部业务管理平台的利率在线审批","type":"3"},{"caseId":"G038","caseName":"依附式自助设备后台集中运营","type":"3"},{"caseId":"G039","caseName":"外币现钞代理库","type":"3"},{"caseId":"G040","caseName":"青年业务创新推进小组模式","type":"3"},{"caseId":"G041","caseName":"网点“一行一策”辅助工具","type":"3"},{"caseId":"G042","caseName":"网点服务呼叫系统应用","type":"3"},{"caseId":"G043","caseName":"组合认证出入口控制装置系统","type":"3"},{"caseId":"G044","caseName":"安保履职电子化监管系统","type":"3"},{"caseId":"G045","caseName":"中银宝典——上海市分行知识管理平台","type":"3"}],"retCode":"00"}
					for(var k in test.list){
						var type = test.list[k].type;
						if(type == "1"){
							productInfo.push(test.list[k]);
						}
						if(type == "2"){
							saleInfo.push(test.list[k]);
						}
						if(type == "3"){
							managementInfo.push(test.list[k]);
						}
					}


	//提交选项请求参数
	var  addUserOptsurlparam = {};
	$.ajax({
		cache: false,
		type: "post",
		timeout: timeout,
		async: true,
		url: infolisturl,
		data: "",
		success: function (data) {
			//console.log(data);
			if(data.retCode && data.retCode == "00"){
				var productInfol = [];
				var saleInfol = [];
				var managementInfol = [];

				if(data.list){
					for(var k in data.list){
						var type = data.list[k].type;
						if(type == "1"){
							productInfol.push(data.list[k]);
						}
						if(type == "2"){
							saleInfol.push(data.list[k]);
						}
						if(type == "3"){
							managementInfol.push(data.list[k]);
						}
					}
				}


				productInfo = productInfol;
				saleInfo = saleInfol;
				managementInfo = managementInfol;
			for(var k in productInfo){
				$('#firstPage .answers').append('<div class="checkbox"><label><input type="checkbox" class="firstQuestion" value="'+productInfo[k].caseId+'">'+productInfo[k].caseName+'</label></div>');
			}
			new Sel($('.firstQuestion'));


			for(var k in saleInfo){
				$('#secondPage .answers').append('<div class="checkbox"><label><input type="checkbox" class="secondQuestion" value="'+saleInfo[k].caseId+'">'+saleInfo[k].caseName+'</label></div>');
			}
			new Sel($('.secondQuestion'));


			for(var k in managementInfo){
				$('#thirdPage .answers').append('<div class="checkbox"><label><input type="checkbox" class="thirdQuestion" value="'+managementInfo[k].caseId+'">'+managementInfo[k].caseName+'</label></div>');
			}
			new Sel($('.thirdQuestion'));

			} else{
				alert(wrongmessage);
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(warnmessage);
		}
	});
	


	$('#subbtn').on('click', function(event) {

		_self = this;

		var p1 = getParam($('.firstQuestion'));
		var p2 = getParam($('.secondQuestion'));
		var p3 = getParam($('.thirdQuestion'));
		if(p1.length == 0){
			alert('中银产品创新未选择');
			this.href = '#firstPage';
			index = 1;
			pageNavHrefAttr(index);
			
		}else if(p2.length == 0){
			alert('中银营销方案创新未选择');	
			this.href = '#secondPage';
			index = 2;
			pageNavHrefAttr(index);		
		}else if(p3.length == 0){
			alert('中银管理创新未选择');
			this.href = "#thirdPage"
			index = 3;
			pageNavHrefAttr(index);
		}else {
			$('.bottom').css({
				'display': 'none'
			});
			
			// var pl = [];
			// var pl1 = {};
			// pl1.pros = p1.join(":");
			// pl1.sales = p2.join(":");
			// pl1.manas = p3.join(":");
			// pl.push(pl1);
			addUserOptsurlparam.prosId = p1.join(":");
			addUserOptsurlparam.salesId = p2.join(":");
			addUserOptsurlparam.manasId = p3.join(":");
			// console.log(JSON.stringify(addUserOptsurlparam));

			$.ajax({
				cache: false,
				type: "post",
				async: true,
				dataType: "json", 
				url: addUserOptsurl,
				data: JSON.stringify(addUserOptsurlparam),
				contentType: 'application/json;charset=utf-8',
				success: function (data) {
					console.log(data);
					if(data.retCode && data.retCode == "00"){
						_self.href = "#success";
						$('#subbtnhide').click();

					}else if(data.retCode && data.retCode == "-99") {
						alert(loginmessage);
						window.location.href="/sh/html/h5/bocshhx/ideavote/login.html";
					} else{
						alert(wrongmessage);
						_self.href = "#thirdPage";
					}
				},
				error: function (xhr, ajaxOptions, thrownError) {
					_self.href = "#thirdPage";
					alert(warnmessage);
				}
			});	


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
		$('#prevPage').css({
			'color':'#ccc'
		});
		$('#nextPage').attr({
			'href':'#secondPage'
		});
		$('#nextPage').css({
			'color':'#337ab7'
		});
	}

	if(index==2){
		$('#prevPage').attr({
			'href':'#secondPage'
		});
		$('#nextPage').attr({
			'href':'#secondPage'
		});
		$('#prevPage').css({
			'color':'#337ab7'
		});
		$('#nextPage').css({
			'color':'#337ab7'
		});

	}
	if(index==3){
		$('#prevPage').attr({
			'href':'#secondPage'
		});
		$('#nextPage').attr({
			'href':'#thirdPage'
		});
		$('#nextPage').css({
			'color':'#ccc'
		});
	}

}