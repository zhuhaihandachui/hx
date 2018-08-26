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
});