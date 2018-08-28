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