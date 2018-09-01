$(document).ready(function(){
	$('.bottom-nav > div a').on('click', function(event) {
		event.preventDefault();
		$('.bottom-nav > div a').removeClass('active');
		$(this).addClass('active');

		if($(this).data('controls')=='task'){
			$.ajax({
				cache: false,
				type: "get",
				async: false,
				url: "/index.html",
				data: "",
				success: function (data) {
					$('#task').html(data);
				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert('請稍後重試.');
				}
			});

		}else{
			$('#task').html('');
		}
	});


	var startX;
	var endX;
	var dis=0;
	$('#carousel-home').on('touchstart', function(event) {
		event.preventDefault();
		/* Act on the event */
		startX =  event.originalEvent.changedTouches[0].clientX;
		$('#carousel-home').carousel('pause');
	});


	$('#carousel-home').on('touchmove', function(event) {
		event.preventDefault();
		/* Act on the event */
		var nowX = event.originalEvent.changedTouches[0].clientX;
		dis = dis + nowX - startX;
		startX = nowX;
		$('.carousel-inner>.item.active').css({
    		'-webkit-transform': 'translate3d('+dis+'px, 0, 0)',
            'transform': 'translate3d('+dis+'px, 0, 0)'
		});
		console.log($('.carousel-inner>.item.active').next().children());
	});


	$('#carousel-home').on('touchend', function(event) {
		event.preventDefault();
		/* Act on the event */
		endX =  event.originalEvent.changedTouches[0].clientX;
		$('.carousel-inner>.item.active').css({
    		'-webkit-transform': 'translate3d('+0+'px, 0, 0)',
            'transform': 'translate3d('+0+'px, 0, 0)'
		});
		setTimeout(function(){
			$('#carousel-home').carousel('cycle');
		},1000);
	});
});