'use strict';

var tempnum=0;
var tempoperater=0;
var tempresult=0;
var pointflag=0;
var a=1;
function myFunction(){
	document.getElementById("output").innerHTML=1;
};

function addnum(num){
	if (pointflag==1) {
		a=a*10;
		tempnum=tempnum+num/a;
	}
	else
		tempnum=tempnum*10+num;
	document.getElementById("output").innerHTML=tempnum;
};
function delnum(){
	if (pointflag==1) {
		if (a==1) {
			pointflag=0;
		}
		else{
			tempnum=tempnum*a-(tempnum*a)%10;
			tempnum=tempnum/a;
			a=a/10;
		};
	}
	else
		tempnum=(tempnum-tempnum%10)/10;
	document.getElementById("output").innerHTML=tempnum;
};
function operater(character){
	getresult();
	a=1;
	pointflag=0;
	switch(character){
		case 1:tempoperater=1;break;
		case 2:tempoperater=2;break;
		case 3:tempoperater=3;break;
		case 4:tempoperater=4;break;
	};
};
function addpoint(){
	pointflag=1;
	document.getElementById("output").innerHTML=tempnum+".";
};
function getresult(){
	switch(tempoperater){
		case 0:tempresult=tempnum;break;
		case 1:tempresult=tempresult+tempnum;break;
		case 2:tempresult=tempresult-tempnum;break;
		case 3:tempresult=tempresult*tempnum;break;
		case 4:tempresult=tempresult/tempnum;break;
	};
	tempnum=0;
	document.getElementById("output").innerHTML=tempresult;
};
function allclear(){
	tempresult=0;
	tempnum=0;
	tempoperater=0;
	pointflag=0;
	document.getElementById("output").innerHTML=tempresult;
};
function answers(){
	tempnum=tempresult;
}