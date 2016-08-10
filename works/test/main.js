window.onscroll = function (e) {
	if($(document).scrollTop() < 100) {
		var item = $('.hidden');
		item.addClass('showed');
		item.removeClass('hidden');
		console.log(1);
	}
	else {
		var item = $('.showed');
		item.addClass('hidden');
		item.removeClass('showed');
		console.log(2);
	}
	// body...
}


