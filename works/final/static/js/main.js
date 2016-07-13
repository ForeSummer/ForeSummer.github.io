var colors = ["#0aa", "#2196f3", "#673ab7", "#ff4081"];

var canvas = oCanvas.create({
    canvas: "#canvas",
    background: "#FFA1D7",
    fps: 60
});

var messageNum = 0;
var actionNum = 0;
var time;
var song;
var totalScore = 0;
var totalCarom = 0;
var hasPlayed = 0;
song = $("audio").get(0);
var int;

function startBeat(songMap) {
    song = $("audio").get(0);
    int = setInterval(endAnim, 500);
    actionNum = songMap.length;
    messageNum = 0;
    setInterval(getMessage, 200);
    setTimeout(function(){
        hasPlayed = 0;
        song.play();
    },500);
}

function getMessage() {
    if(messageNum >= actionNum) {
        return;
    }
    time = action[messageNum].time;
    if(song.currentTime > time) {
        animate(action[messageNum]);

        messageNum ++;
    }
}

function animate(map) {
    switch(map.animation.type) {
        case 1:
            addAnimeOne(map);
            break;
        case 2:
            addAnimeTwo(map);
            break;
        case 3:
            addAnimeThree(map);
            break;
        case 4:
            addAnimeFour(map);
            break;
        case 5:
            addAnimeFive(map);
            break;
    }
}

//add different animations
function addAnimeOne(map) {
    var color = colors[map.group - 1];
    var outsideCircle = canvas.display.ellipse({
        x: map.animation.startX,
        y: map.animation.startY,
        radius_x: 120,
        radius_y: 120,
        stroke: "4px " + color
    });
    var circle = canvas.display.ellipse({
        x: map.animation.startX,
        y: map.animation.startY,
        radius_x: 40,
        radius_y: 40,
        fill: color
    });
    var text = canvas.display.text({
        x: map.animation.startX,
        y: map.animation.startY,
        origin: { x: "center", y: "center" },
        font: "bold 20px",
        text: map.index,
        fill: "#fff"
    });
    canvas.addChild(outsideCircle);
    canvas.addChild(circle);
    canvas.addChild(text);
    var flag = 0;
    circle.bind("click",function(){
        flag = 1;
        //console.log(flag);
    });
    text.bind("click",function(){
        flag = 1;
        //console.log(flag);
    });
    outsideCircle.animate({
        radius_x: 40,
        radius_y: 40
    }, {
        duration: 800,
        easing: "linear",
        callback: function () {
            outsideCircle.animate({
                radius_x: 40,
                radius_y: 40
            }, {
                duration: 250,
                easing: "linear",
                callback: function () {
                    if(flag == 0){
                        correction2();
                        misscarom();
                        //$("h1").fadeOut(200);
                    }else{
                        correction1();
                        getScore(1);
                        getcarom();
                        //$("h1").fadeOut(200);
                    }
                    
                    circle.fadeOut(map.animation.lastTime, "ease-in-out-cubic");
                    text.fadeOut(map.animation.lastTime, "ease-in-out-cubic");
                    outsideCircle.fadeOut(map.animation.lastTime, "ease-in-out-cubic", function(){
                        outsideCircle.remove();
                        circle.remove();
                        text.remove();
                    });
                }
            });
        }
    });     
}

function addAnimeTwo(map) {
    var color = colors[map.group - 1];
    var xAdd, yAdd;
    if(map.animation.startX == map.animation.endX) {
        xAdd = 40;
        yAdd = 0;
    }
    else if(map.animation.startY == map.animation.endY) {
        xAdd = 0;
        yAdd = 40;
    }
    else if(map.animation.startX < map.animation.endX && map.animation.startY < map.animation.endY) {
        xAdd = 28;
        yAdd = -28;
    }
    else if(map.animation.startX > map.animation.endX && map.animation.startY > map.animation.endY) {
        xAdd = 28;
        yAdd = -28;
    }
    else {
        xAdd = 28;
        yAdd = 28;
    }
    var outsideCircle = canvas.display.ellipse({
        x: map.animation.startX,
        y: map.animation.startY,
        radius_x: 80,
        radius_y: 80,
        stroke: "4px " + color
    });
    var placeHolder = canvas.display.ellipse({
        x: map.animation.endX,
        y: map.animation.endY,
        radius_x: 40,
        radius_y: 40,
        stroke: "4px " + color,
        fill: "#f7f7f7"
    });
    var placeHolder1 = canvas.display.ellipse({
        x: map.animation.startX,
        y: map.animation.startY,
        radius_x: 40,
        radius_y: 40,
        stroke: "4px " + color,
        fill: "#f7f7f7"
    });
    var circle = canvas.display.ellipse({
        x: map.animation.startX,
        y: map.animation.startY,
        radius_x: 40,
        radius_y: 40,
        fill: color
    });
    var lineOne = canvas.display.line({
        start: { x: (map.animation.startX + xAdd), y: (map.animation.startY + yAdd)},
        end: { x: (map.animation.endX + xAdd), y: (map.animation.endY + yAdd)},
        stroke: "4px " + color,
        cap: "round"
    });
    var lineTwo = canvas.display.line({
        start: { x: (map.animation.startX - xAdd), y: (map.animation.startY - yAdd)},
        end: { x: (map.animation.endX - xAdd), y: (map.animation.endY - yAdd)},
        stroke: "4px " + color,
        cap: "round"
    });
    var text = canvas.display.text({
        x: map.animation.startX,
        y: map.animation.startY,
        origin: { x: "center", y: "center" },
        font: "bold 20px",
        text: map.index,
        fill: "#fff"
    });
    canvas.addChild(lineOne);
    canvas.addChild(lineTwo);
    canvas.addChild(placeHolder);
    canvas.addChild(placeHolder1);
    canvas.addChild(circle);
    canvas.addChild(text);
    canvas.addChild(outsideCircle);
    var flag = 0;
    var flag0 = false;
    var flag2 = 0;
    outsideCircle.bind("mousedown",function(){
        if(flag == 1){
            //console.log("未完成");
            flag2 = 1;
        }
        flag0 = true;
        //console.log("down");
    }).bind("mouseleave mouseup", function(){
        if(flag == 1||flag == 0){
            //console.log("未完成");
            flag2 = 1;
        }
        //console.log("leave");
    });
    outsideCircle.animate({
        radius_x: 40,
        radius_y: 40
    },{
        duration: 500,
        easing: "linear",
        callback:function () {
            text.fadeOut(200);
            outsideCircle.animate({
                radius_x: 80,
                radius_y: 80
            }, {
                duration: 100,
                easing: "linear",
                callback: function () {
                    flag = 1;
                    outsideCircle.animate({
                        x: map.animation.endX,
                        y: map.animation.endY
                    }, {
                        duration: map.animation.lastTime,
                        easing: "linear"
                    });
                    circle.animate({
                        x: map.animation.endX,
                        y: map.animation.endY
                    }, {
                        duration: map.animation.lastTime,
                        easing: "linear",
                        callback: function() {
                            flag = 2;
                            outsideCircle.animate({
                                radius_x: 40,
                                radius_y: 40
                            }, {
                                duration: 100,
                                easing: "linear",
                                callback: function() {
                                    if(flag2 == 1 || flag0 == false){
                                        correction2();
                                        misscarom();
                                        //$("h1").fadeOut(200);
                                    }else{
                                        correction1();
                                        getcarom();
                                        getScore(5);
                                        //$("h1").fadeOut(200);
                                    }
                                    console.log("flag: "+flag);
                                    console.log("flag2: "+flag2);
                                    console.log("flag0: "+flag0);
                                    circle.fadeOut(200, "ease-in-out-cubic");
                                    outsideCircle.fadeOut(200, "ease-in-out-cubic");
                                    lineOne.fadeOut(200, "ease-in-out-cubic");
                                    lineTwo.fadeOut(200, "ease-in-out-cubic");
                                    placeHolder.fadeOut(200, "ease-in-out-cubic");
                                    placeHolder1.fadeOut(200, "ease-in-out-cubic", function(){
                                        circle.remove();
                                        text.remove();
                                        lineOne.remove();
                                        lineTwo.remove();
                                        placeHolder.remove();
                                        placeHolder1.remove();
                                        outsideCircle.remove();
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

function addAnimeThree(map){
    var color = colors[map.group - 1];
    var addX = [35, 35, -35, -35, -40, 0, 0, 40, 0, -40, 40, 0];
    var addY = [-20, 20, -20, 20, 0, 40, -40, 0, -40, 0, 0, 40];
    var hom_start = [-30,-30,150,150,90,90,-90,-90,-180,-180,0,0];
    var hom_end = [30,30,210,210,180,180,0,0,-90,-90,90,90];
    var tempX = [-46,-46,46,46,40,40,-40,-40,40,40,-40,-40];
    var tempY = [0,0,0,0,-40,-40,40,40,40,40,-40,-40];
    var temp1 = [0,0,0,0,40,-40,40,-40,-40,40,-40,40];
    var temp2 = [40,-40,40,-40,40,-40,40,-40,40,-40,40,-40];

    var circle = canvas.display.ellipse({
        x: map.animation.startX,
        y: map.animation.startY,
        radius_x: 80,
        radius_y: 80,
        stroke: "4px " + color
    });
    
    
    var circle1 = canvas.display.ellipse({
        x: map.animation.startX,
        y: map.animation.startY,
        radius_x: 40,
        radius_y: 40,
        fill: color
    });

    var circleone = canvas.display.ellipse({
        x: map.animation.startX,
        y: map.animation.startY,
        radius_x: 40,
        radius_y: 40,
        stroke: "4px " + color,
        fill: "#f7f7f7"
    }); 

    var circletwo = canvas.display.ellipse({
        x: map.animation.endX,
        y: map.animation.endY,
        radius_x: 40,
        radius_y: 40,
        stroke: "4px " + color,
        fill: "#f7f7f7"
    }); 

    var middle = canvas.display.arc({
        x: map.animation.middleX,
        y: map.animation.middleY,
        radius: 40,
        start:hom_start[map.animation.change],
        end:hom_end[map.animation.change],
        stroke: "4px " + color
    });
    var text = canvas.display.text({
        x: circleone.x,
        y: circleone.y,
        origin: { x: "center", y: "center" },
        font: "bold 20px",
        text: map.index,
        fill: "#fff"
    });
    var lineone_1 = canvas.display.line({
        start: { x: circleone.x + addX[map.animation.change], y: circleone.y + addY[map.animation.change]},
        end: { x: middle.x + addX[map.animation.change], y: middle.y + addY[map.animation.change]},
        stroke: "4px " + color,
        cap: "round"
    });

    var linetwo_1 = canvas.display.line({
        start: { x: circleone.x - addX[map.animation.change], y: circleone.y - addY[map.animation.change] },
        end: { x: middle.x+tempX[map.animation.change], y: middle.y+tempY[map.animation.change] },
        stroke: "4px " + color,
        cap: "round"
    });

    var lineone_2 = canvas.display.line({
        start: { x: middle.x + addX[map.animation.change]+temp1[map.animation.change], y: middle.y + addY[map.animation.change]+temp2[map.animation.change] },
        end: { x: circletwo.x + addX[map.animation.change]+temp1[map.animation.change], y: circletwo.y + addY[map.animation.change]+temp2[map.animation.change] },
        stroke: "4px " + color,
        cap: "round"
    });

    var linetwo_2 = canvas.display.line({
        start: { x: middle.x+tempX[map.animation.change], y: middle.y+tempY[map.animation.change] },
        end: { x: circletwo.x - addX[map.animation.change]-temp1[map.animation.change], y: circletwo.y - addY[map.animation.change]-temp2[map.animation.change] },
        stroke: "4px " + color,
        cap: "round"
    });

    canvas.addChild(circleone);
    canvas.addChild(circletwo);
    canvas.addChild(lineone_1);
    canvas.addChild(linetwo_1);
    canvas.addChild(middle);
    canvas.addChild(lineone_2);
    canvas.addChild(linetwo_2);
    canvas.addChild(circle1);
    canvas.addChild(text);
    canvas.addChild(circle);
    var flag = 0;
    var flag2 = 0;
    var flag0 = false;
    circle.bind("mousedown",function(){
        if(flag == 1){
            //console.log("未完成");
            flag2 = 1;
        }
        flag0 = true;
        //console.log("down");
    }).bind("mouseleave mouseup", function(){
        if(flag == 1||flag == 0){
            //console.log("未完成");
            flag2 = 1;
        }
        //console.log("leave");
    });
    circle.animate({
        radius_x: 40,
        radius_y: 40
    }, {
        duration: 500,
        easing: "linear",
        callback: function () {
            text.fadeOut(200, "ease-in-out-cubic");
            circle.animate({
                radius_x: 80,
                radius_y: 80
            }, {
                duration: 100,
                easing: "linear",
                callback: function () {
                    flag = 1;
                    circle.animate({
                        x : middle.x,
                        y : middle.y
                    }, {
                        duration: map.animation.lastTime,
                        easing: "linear"
                    });
                    circle1.animate({
                        x : middle.x,
                        y : middle.y
                    }, {
                        duration: map.animation.lastTime,
                        easing: "linear",
                        callback: function () {
                            circle.animate({
                                x : circletwo.x,
                                y : circletwo.y
                            }, {
                                duration: map.animation.lastTime,
                                easing: "linear"
                            });
                            circle1.animate({
                                x : circletwo.x,
                                y : circletwo.y
                            }, {
                                duration: map.animation.lastTime,
                                easing: "linear",
                                callback: function() {
                                    flag = 2;
                                    circle.animate({
                                        radius_x: 40,
                                        radius_y: 40
                                    }, {
                                        duration: 100,
                                        easing: "linear",
                                        callback: function () {
                                            if(flag2 == 1 || flag0 == false){
                                                correction2();
                                                misscarom();
                                                //$("h1").fadeOut(200);
                                            }else{
                                                correction1();
                                                getcarom();
                                                getScore(10);
                                                //$("h1").fadeOut(200);
                                            }
                                            circle.fadeOut(200, "ease-in-out-cubic");
                                            circleone.fadeOut(200, "ease-in-out-cubic");
                                            circletwo.fadeOut(200, "ease-in-out-cubic");
                                            lineone_1.fadeOut(200, "ease-in-out-cubic");
                                            lineone_2.fadeOut(200, "ease-in-out-cubic");
                                            linetwo_1.fadeOut(200, "ease-in-out-cubic");
                                            linetwo_2.fadeOut(200, "ease-in-out-cubic");
                                            middle.fadeOut(200, "ease-in-out-cubic");
                                            circle1.fadeOut(200, "ease-in-out-cubic", function(){
                                                circle.remove();
                                                text.remove();
                                                circleone.remove();
                                                circletwo.remove();
                                                lineone_1.remove();
                                                lineone_2.remove();
                                                linetwo_1.remove();
                                                linetwo_2.remove();
                                                middle.remove();
                                                circle1.remove();
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });  
}

function addAnimeFour(map) {
    var color = colors[map.group - 1];
    var xAdd, yAdd, ro;
    if(map.animation.startX == map.animation.endX) {
        xAdd = 40;
        yAdd = 0;
        if(map.animation.startY < map.animation.endY) {
            ro = 270;
        }
        else {
            ro = 90;
        }
    }
    else if(map.animation.startY == map.animation.endY) {
        xAdd = 0;
        yAdd = 40;
        if(map.animation.startX < map.animation.endX) {
            ro = 180;
        }
        else {
            ro = 0;
        }
    }
    else if(map.animation.startX < map.animation.endX && map.animation.startY < map.animation.endY) {
        xAdd = 28;
        yAdd = -28;
        ro = 235;
    }
    else if(map.animation.startX > map.animation.endX && map.animation.startY > map.animation.endY) {
        xAdd = 28;
        yAdd = -28;
        ro = 45;
    }
    else {
        xAdd = 28;
        yAdd = 28;
        if(map.animation.startY < map.animation.endY) {
            ro = 315;
        }
        else {
            ro = 135;
        }
    }

    var image = canvas.display.image({
        x: map.animation.endX,
        y: map.animation.endY,
        origin: { x: "center", y: "center" },
        image: "./static/image/arrow.png",
        tile: false,
        width: 60,
        height: 60,
        rotation: ro
    });
    var outsideCircle = canvas.display.ellipse({
        x: map.animation.startX,
        y: map.animation.startY,
        radius_x: 80,
        radius_y: 80,
        stroke: "4px " + color
    });
    var placeHolder = canvas.display.ellipse({
        x: map.animation.endX,
        y: map.animation.endY,
        radius_x: 42,
        radius_y: 42,
        fill: color
    });
    var placeHolder1 = canvas.display.ellipse({
        x: map.animation.startX,
        y: map.animation.startY,
        radius_x: 40,
        radius_y: 40,
        stroke: "4px " + color,
        fill: "#f7f7f7"
    });
    var circle = canvas.display.ellipse({
        x: map.animation.startX,
        y: map.animation.startY,
        radius_x: 40,
        radius_y: 40,
        fill: color
    });
    var lineOne = canvas.display.line({
        start: { x: (map.animation.startX + xAdd), y: (map.animation.startY + yAdd)},
        end: { x: (map.animation.endX + xAdd), y: (map.animation.endY + yAdd)},
        stroke: "4px " + color,
        cap: "round"
    });
    var lineTwo = canvas.display.line({
        start: { x: (map.animation.startX - xAdd), y: (map.animation.startY - yAdd)},
        end: { x: (map.animation.endX - xAdd), y: (map.animation.endY - yAdd)},
        stroke: "4px " + color,
        cap: "round"
    });
    var text = canvas.display.text({
        x: map.animation.startX,
        y: map.animation.startY,
        origin: { x: "center", y: "center" },
        font: "bold 20px",
        text: map.index,
        fill: "#fff"
    });
    canvas.addChild(lineOne);
    canvas.addChild(lineTwo);
    canvas.addChild(placeHolder);
    canvas.addChild(placeHolder1);
    canvas.addChild(image);
    canvas.addChild(circle);
    canvas.addChild(text);
    canvas.addChild(outsideCircle);
    var flag = 0;
    var flag0 = false;
    var flag2 = 0;
    outsideCircle.bind("mousedown",function(){
        if(flag == 1){
            //console.log("未完成");
            flag2 = 1;
        }
        flag0 = true;
        //console.log("down");
    }).bind("mouseleave mouseup", function(){
        if(flag == 1||flag == 0){
            //console.log("未完成");
            flag2 = 1;
        }
        //console.log("leave");
    });
    outsideCircle.animate({
        radius_x: 40,
        radius_y: 40
    },{
        duration: 500,
        easing: "linear",
        callback:function () {
            text.fadeOut(300);
            outsideCircle.animate({
                radius_x: 80,
                radius_y: 80
            }, {
                duration: 100,
                easing: "linear",
                callback: function () {
                    outsideCircle.animate({
                        x: map.animation.endX,
                        y: map.animation.endY
                    }, {
                        duration: map.animation.lastTime,
                        easing: "linear"
                    });
                    circle.animate({
                        x: map.animation.endX,
                        y: map.animation.endY
                    }, {
                        duration: map.animation.lastTime,
                        easing: "linear",
                        callback: function() {
                            outsideCircle.animate({
                                x: map.animation.startX,
                                y: map.animation.startY
                            }, {
                                duration: map.animation.lastTime,
                                easing: "linear"
                            });
                            circle.animate({
                                x: map.animation.startX,
                                y: map.animation.startY
                            }, {
                                duration: map.animation.lastTime,
                                easing: "linear",
                                callback: function() {
                                    flag = 2;
                                    outsideCircle.animate({
                                        radius_x: 40,
                                        radius_y: 40
                                    }, {
                                        duration: 100,
                                        easing: "linear",
                                        callback: function() {
                                            if(flag2 == 1 || flag0 == false){
                                                correction2();
                                                misscarom();
                                                //$("h1").fadeOut(200);
                                            }else{
                                                correction1();
                                                getcarom();
                                                getScore(10);
                                                //$("h1").fadeOut(200);
                                            }
                                            circle.fadeOut(200, "ease-in-out-cubic");
                                            outsideCircle.fadeOut(200, "ease-in-out-cubic");
                                            lineOne.fadeOut(200, "ease-in-out-cubic");
                                            lineTwo.fadeOut(200, "ease-in-out-cubic");
                                            placeHolder.fadeOut(200, "ease-in-out-cubic");
                                            image.fadeOut(200, "ease-in-out-cubic");
                                            placeHolder1.fadeOut(200, "ease-in-out-cubic", function(){
                                                circle.remove();
                                                text.remove();
                                                lineOne.remove();
                                                lineTwo.remove();
                                                placeHolder.remove();
                                                placeHolder1.remove();
                                                outsideCircle.remove();
                                                image.remove();
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });   
}

function addAnimeFive(map) {
    var color = colors[map.group - 1];
    var addX = [35, 35, -35, -35, -40, 0, 0, 40, 0, -40, 40, 0];
    var addY = [-20, 20, -20, 20, 0, 40, -40, 0, -40, 0, 0, 40];
    var hom_start = [-30,-30,150,150,90,90,-90,-90,-180,-180,0,0];
    var hom_end = [30,30,210,210,180,180,0,0,-90,-90,90,90];
    var tempX = [-46,-46,46,46,40,40,-40,-40,40,40,-40,-40];
    var tempY = [0,0,0,0,-40,-40,40,40,40,40,-40,-40];
    var temp1 = [0,0,0,0,40,-40,40,-40,-40,40,-40,40];
    var temp2 = [40,-40,40,-40,40,-40,40,-40,40,-40,40,-40];
    var ro = [330, 30, 240, 120, 180, 90, 270, 0, 270, 180, 0, 90];


    var image = canvas.display.image({
        x: map.animation.endX,
        y: map.animation.endY,
        origin: { x: "center", y: "center" },
        image: "./static/image/arrow.png",
        tile: false,
        width: 60,
        height: 60,
        rotation: ro[map.animation.change]
    });

    var circle = canvas.display.ellipse({
        x: map.animation.startX,
        y: map.animation.startY,
        radius_x: 80,
        radius_y: 80,
        stroke: "4px " + color
    });
    
    var circle1 = canvas.display.ellipse({
        x: map.animation.startX,
        y: map.animation.startY,
        radius_x: 40,
        radius_y: 40,
        fill: color
    });

    var circleone = canvas.display.ellipse({
        x: map.animation.startX,
        y: map.animation.startY,
        radius_x: 40,
        radius_y: 40,
        stroke: "4px " + color,
        fill: "#f7f7f7"
    }); 

    var circletwo = canvas.display.ellipse({
        x: map.animation.endX,
        y: map.animation.endY,
        radius_x: 42,
        radius_y: 42,
        fill: color
    }); 

    var middle = canvas.display.arc({
        x: map.animation.middleX,
        y: map.animation.middleY,
        radius: 40,
        start:hom_start[map.animation.change],
        end:hom_end[map.animation.change],
        stroke: "4px " + color
    });
    var text = canvas.display.text({
        x: circleone.x,
        y: circleone.y,
        origin: { x: "center", y: "center" },
        font: "bold 20px",
        text: map.index,
        fill: "#fff"
    });
    var lineone_1 = canvas.display.line({
        start: { x: circleone.x + addX[map.animation.change], y: circleone.y + addY[map.animation.change]},
        end: { x: middle.x + addX[map.animation.change], y: middle.y + addY[map.animation.change]},
        stroke: "4px " + color,
        cap: "round"
    });

    var linetwo_1 = canvas.display.line({
        start: { x: circleone.x - addX[map.animation.change], y: circleone.y - addY[map.animation.change] },
        end: { x: middle.x+tempX[map.animation.change], y: middle.y+tempY[map.animation.change] },
        stroke: "4px " + color,
        cap: "round"
    });

    var lineone_2 = canvas.display.line({
        start: { x: middle.x + addX[map.animation.change]+temp1[map.animation.change], y: middle.y + addY[map.animation.change]+temp2[map.animation.change] },
        end: { x: circletwo.x + addX[map.animation.change]+temp1[map.animation.change], y: circletwo.y + addY[map.animation.change]+temp2[map.animation.change] },
        stroke: "4px " + color,
        cap: "round"
    });

    var linetwo_2 = canvas.display.line({
        start: { x: middle.x+tempX[map.animation.change], y: middle.y+tempY[map.animation.change] },
        end: { x: circletwo.x - addX[map.animation.change]-temp1[map.animation.change], y: circletwo.y - addY[map.animation.change]-temp2[map.animation.change] },
        stroke: "4px " + color,
        cap: "round"
    });

    canvas.addChild(circleone);
    canvas.addChild(circletwo);
    canvas.addChild(lineone_1);
    canvas.addChild(linetwo_1);
    canvas.addChild(middle);
    canvas.addChild(lineone_2);
    canvas.addChild(linetwo_2);
    canvas.addChild(image);
    canvas.addChild(circle1);
    canvas.addChild(text);
    canvas.addChild(circle);
    var flag = 0;
    var flag0 = false;
    var flag2 =0;
    circle.bind("mousedown",function(){
        if(flag == 1){
            //console.log("未完成");
            flag2 = 1;
        }
        flag0 = true;
        //console.log("down");
    }).bind("mouseleave mouseup", function(){
        if(flag == 1||flag == 0){
            //console.log("未完成");
            flag2 = 1;
        }
        //console.log("leave");
    });
    circle.animate({
        radius_x: 40,
        radius_y: 40
    },{
        duration: 500,
        easing: "linear",
        callback:function () {
            text.fadeOut(200, "ease-in-out-cubic");
            circle.animate({
                radius_x: 80,
                radius_y: 80
            }, {
                duration: 100,
                easing: "linear",
                callback: function () {
                    circle.animate({
                        x : middle.x,
                        y : middle.y
                    }, {
                        duration: map.animation.lastTime,
                        easing: "linear"
                    });
                    circle1.animate({
                        x : middle.x,
                        y : middle.y
                    }, {
                        duration: map.animation.lastTime,
                        easing: "linear",
                        callback: function () {
                            circle.animate({
                                x : circletwo.x,
                                y : circletwo.y
                            }, {
                                duration: map.animation.lastTime,
                                easing: "linear"
                            });
                            circle1.animate({
                                x : circletwo.x,
                                y : circletwo.y
                            }, {
                                duration: map.animation.lastTime,
                                easing: "linear",
                                callback:function(){
                                    circle.animate({
                                        x : middle.x,
                                        y : middle.y
                                    }, {
                                        duration: map.animation.lastTime,
                                        easing: "linear"
                                    });
                                    circle1.animate({
                                        x : middle.x,
                                        y : middle.y
                                    }, {
                                        duration: map.animation.lastTime,
                                        easing: "linear",
                                        callback: function() {
                                            circle.animate({
                                                x : map.animation.startX,
                                                y : map.animation.startY
                                            }, {
                                                duration: map.animation.lastTime,
                                                easing: "linear"
                                            });
                                            circle1.animate({
                                                x : map.animation.startX,
                                                y : map.animation.startY
                                            }, {
                                                duration: map.animation.lastTime,
                                                easing: "linear",
                                                callback: function() {
                                                    flag = 2;
                                                    circle.animate({
                                                        radius_x: 40,
                                                        radius_y: 40
                                                    }, {
                                                        duration: 100,
                                                        easing: "linear",
                                                        callback: function () {
                                                            if(flag2 == 1 || flag0 == false){
                                                                correction2();
                                                                misscarom();
                                                                //$("h1").fadeOut(200);
                                                            }else{
                                                                correction1();
                                                                getcarom();
                                                                getScore(20);
                                                                //$("h1").fadeOut(200);
                                                            }
                                                            circle.fadeOut(200, "ease-in-out-cubic");
                                                            circleone.fadeOut(200, "ease-in-out-cubic");
                                                            circletwo.fadeOut(200, "ease-in-out-cubic");
                                                            lineone_1.fadeOut(200, "ease-in-out-cubic");
                                                            lineone_2.fadeOut(200, "ease-in-out-cubic");
                                                            linetwo_1.fadeOut(200, "ease-in-out-cubic");
                                                            linetwo_2.fadeOut(200, "ease-in-out-cubic");
                                                            image.fadeOut(200, "ease-in-out-cubic");
                                                            middle.fadeOut(200, "ease-in-out-cubic");
                                                            circle1.fadeOut(200, "ease-in-out-cubic", function(){
                                                                circle.remove();
                                                                text.remove();
                                                                circleone.remove();
                                                                circletwo.remove();
                                                                lineone_1.remove();
                                                                lineone_2.remove();
                                                                linetwo_1.remove();
                                                                linetwo_2.remove();
                                                                middle.remove();
                                                                image.move();
                                                                circle1.remove();
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });//canvas.redraw();
                }
            });
        }
    });
}

function getScore(score) {
    totalScore += score * 10 * (totalCarom+1);
    //update
    $('#points').addClass("changing");
    setTimeout(function() {
        $("#points").html(totalScore);
        $('#points').removeClass("changing");
    }, 170);
}

function getcarom() {
    totalCarom++;
    var carom = 'x' + totalCarom;
    $('#change').addClass("changing");
    setTimeout(function() {
        $("#change").html(carom);
        $('#change').removeClass("changing");
    }, 170);
}

function misscarom() {
    totalCarom = 0;
    var carom = 'x' + totalCarom;
    $('#change').addClass("changing");
    setTimeout(function() {
        $("#change").html(carom);
        $('#change').removeClass("changing");
    }, 170);
}

function correction1(){
    $('#status').addClass("changing");
    setTimeout(function() {
        $("#status").html("Perfect!");
        $('#status').removeClass("changing");
    }, 170);
    
}

function correction2(){
    $('#status').addClass("changing");
    setTimeout(function() {
        $("#status").html("Miss!");
        $('#status').removeClass("changing");
    }, 170);
    
}

function endAnim(){
    if(hasPlayed == 1) {
        return;
    }
    var percent = song.currentTime/song.duration;
    percent = percent*100;
    $("#process_text").css('width', percent + "%");
    if(song.ended){
        hasPlayed = 1;
        setTimeout(function(){
            var text = canvas.display.text({
                x: 450,
                y: 235,
                origin: { x: "center", y: "top" },
                font: "bold 80px sans-serif",
                text: "Your Score: " + totalScore,
                fill: "#0aa"
            });
            canvas.addChild(text);
        }, 1000);
        clearInterval(int);
    }
}


function beginAnimate() {
    var act1 = canvas.display.text({
        x: 450,
        y: 275,
        origin: { x: "center", y: "center" },
        font: "bold 200px",
        text: '1',
        fill: colors[0]
    });
    var act2 = canvas.display.text({
        x: 450,
        y: 275,
        origin: { x: "center", y: "center" },
        font: "bold 200px",
        text: '2',
        fill: colors[1]
    });
    var act3 = canvas.display.text({
        x: 450,
        y: 275,
        origin: { x: "center", y: "center" },
        font: "bold 200px",
        text: '3',
        fill: colors[2]
    });
    var start = canvas.display.text({
        x: 450,
        y: 275,
        origin: { x: "center", y: "center" },
        font: "bold 200px",
        text: 'Start!',
        fill: colors[3]
    });
    
    canvas.addChild(act3);

    act3.fadeOut(1000, "ease-in-out-cubic", function(){
        canvas.addChild(act2);
        act2.fadeOut(1000, "ease-in-out-cubic", function(){
            canvas.addChild(act1);
            act1.fadeOut(1000, "ease-in-out-cubic", function(){
                canvas.addChild(start);
                act1.fadeOut(1000, "ease-in-out-cubic", function(){
                    act1.remove();
                    act2.remove();
                    act3.remove();
                    start.remove();
                    startBeat(action);
                });
            });
        });
    });
}



$(document).ready(function(){
    $("#song1").click(function(){
        $(".drawStartMenu").fadeOut(500);
        $(".drawGameImg").fadeIn(500);
        beginAnimate();
    });
    $("#return").click(function(){
        $(".drawGameImg").fadeOut(500);
        $(".drawStartMenu").fadeIn(500);
        canvas.reset();
        $("#process_text").css('width', "0%");
        $("#status").html("Ready");
        $("#change").html("x0");
        $("#points").html(0);
        messageNum = 0;
        actionNum = 0;
        totalScore = 0;
        totalCarom = 0;
    });
});

