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
		console.log(123);
		$('#firstPage .answers').append('<div class="checkbox"><label><input type="checkbox" value="">Option 1</label></div>');
	}

});

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