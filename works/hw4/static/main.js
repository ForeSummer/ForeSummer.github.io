"use strict";

var messageQueue = new Array();
var adminMessageFlag = 0;
var adminTimmer;

function showMessage() {
	//console.log('messageQueue.length');
	if(messageQueue.length) {
		var data = messageQueue.pop();
		$('.message4 .avatar .nickname p').html(data.nickname);
		$('.message4 .content p').html(data.content);
		$('.message4 .avatar .img-area img').attr('src', data.headimgurl);
		transformAnimation();
	}
}

setInterval(showMessage, 550);

function init() {
	var windowHeight = parseInt($(window).height());
	if(windowHeight < 600) {
		$('header').css('height', windowHeight * 0.12 + 'px');
		$('.container').css('height', windowHeight * 0.83 + 'px');
		$('.message').css('height',  windowHeight * 0.26 + 'px');
		$('footer').css('height', windowHeight * 0.05 + 'px');
		$('.container').css('top', windowHeight * 0.12 + 'px');
	}
	else {
		$('header').css('height', windowHeight * 0.22 + 'px');
		$('.container').css('height', windowHeight * 0.73 + 'px');
		$('.message').css('height',  windowHeight * 0.22 + 'px');
		$('footer').css('height', windowHeight * 0.05 + 'px');
		$('.container').css('top', windowHeight * 0.22 + 'px');
	}
	$('footer').css('top', windowHeight * 0.95 + 'px');
	$('footer').css('line-height', windowHeight * 0.05 + 'px');

	var out = $('.notice');
	out.textScroll();
	$.get("https://wall.cgcgbcbc.com/api/messages?num=3", function(result){
		$('.message1 .avatar .nickname p').html(result[0].nickname);
		$('.message1 .content p').html(result[0].content);
		$('.message1 .avatar .img-area img').attr('src', result[0].headimgurl);
		$('.message2 .avatar .nickname p').html(result[1].nickname);
		$('.message2 .content p').html(result[1].content);
		$('.message2 .avatar .img-area img').attr('src', result[1].headimgurl);
		$('.message3 .avatar .nickname p').html(result[2].nickname);
		$('.message3 .content p').html(result[2].content);
		$('.message3 .avatar .img-area img').attr('src', result[2].headimgurl);
		messageScroll('.message1 .content', '.message1 .content p');
		messageScroll('.message2 .content', '.message2 .content p');
		messageScroll('.message3 .content', '.message3 .content p');
		messageScroll('.message1 .avatar .nickname', '.message1 .avatar .nickname p');
		messageScroll('.message2 .avatar .nickname', '.message2 .avatar .nickname p');
		messageScroll('.message3 .avatar .nickname', '.message3 .avatar .nickname p');
	});
}

$.fn.textScroll = function(){
    var outside = $(this)[0];
    var content = $(this).children('p');
    var outWidth = $(this).width();
    var inWidth = content.width();
    content.css('position', 'relative');
    content.css('margin-left', '30px');
    var duration = inWidth * 30;
    function scroll() {
    	content.animate({'margin-left': -inWidth}, duration, "linear",function(){
    		content.css('margin-left', outWidth + 'px');
    		scroll();
        });
    }
    if(inWidth > outWidth) {
    	scroll();
    }
}

function messageScroll(outside, inside){
    var outside = $(outside);
    var content = $(inside);
    var outWidth = outside.width();
    content.css('position', 'absolute');
    var inWidth = content.width();

    content.css('position', 'relative');
    var duration = inWidth * 30;
    function scroll() {
    	content.animate({'margin-left': -inWidth}, duration, "linear",function(){
    		content.css('margin-left', outWidth + 'px');
    		scroll();
        });
    }
    if(inWidth > outWidth) {
    	content.css('margin-left', '100px');
    	//console.log('nnd');
    	scroll();
    }
    else {
    	content.css('margin-left', '0');
    }
}

function getMessage() {
	var socket = io.connect('https://wall.cgcgbcbc.com/');
	socket.on('new message', function (data) {
		messageQueue.unshift(data);
	});
	socket.on('admin', function(data) {
		clearTimeout(adminTimmer);
		if(adminMessageFlag == 0) {
			$('.admin .content p').html(data.content);
			$('.admin .avatar .nickname p').html(data.nickname);
			messageScroll('.admin .content', '.admin .content p');
			$('.admin').fadeIn("slow");
		}
		else {
			$('.admin .content p').stop();
			$('.admin .content p').html(data.content);
			$('.admin').fadeOut("slow");
			$('.admin .avatar .nickname p').html(data.nickname);
			messageScroll('.admin .content', '.admin .content p');
			$('.admin').fadeIn("slow");
		}
		adminMessageFlag = 1;
		adminTimmer = setTimeout(function() {
			$('.admin .content p').stop();
			$('.admin').fadeOut("slow");
			adminMessageFlag = 0;
		},10000);
	});
}

function transformAnimation() {
	$('.message1').addClass('remove');
	setTimeout(function(){
		//console.log('animetion end');
		$('.message1').removeClass('remove');
		$('.message2').css('margin-top', $('.message').height());
		$('.message1').css('display', 'none');
		$('.message1 .content p').stop();
		$('.message4 .avatar .nickname p').stop();
		$('.message2').addClass('up');
		setTimeout(function(){
			messageScroll('.message4 .content', '.message4 .content p');
			messageScroll('.message4 .avatar .nickname', '.message4 .avatar .nickname p');
			$('.message2').removeClass('up');
			$('.message2').css('margin-top', '0');
			$('.wall').append($('.message1'));
			$('.message1').css('display', 'block');
			$('.message1').addClass('temp');
			$('.message1').removeClass('message1');
			$('.message2').addClass('message1');
			$('.message2').removeClass('message2');
			$('.message3').addClass('message2');
			$('.message3').removeClass('message3');
			$('.message4').addClass('message3');
			$('.message4').removeClass('message4');
			$('.temp').addClass('message4');
			$('.temp').removeClass('temp');
		},250);
	},250);
}

$( document ).ready(function() {
	$( window ).resize(function() {
		init();
	});
	init();
	getMessage();
});