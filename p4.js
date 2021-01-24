/*
Author: George Khankeldian
Project: CS 559 Programming Assignment 4
File: p4.js
*/

function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var slider1 = document.getElementById('slider1');
  slider1.value = 0;

  var movement = 0;
  var movementBody = 0.0;

  function draw() {
    canvas.width = canvas.width;

    var moveSpeed = slider1.value; //controls the speed of kirby's movement and animation

    function setTran(Tx) {
        context.setTransform(Tx[0],Tx[1],Tx[3],Tx[4],Tx[6],Tx[7]);
    }

    function moveToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}

    //timers that allow the animations to play in real time
    movement = ((movement + (1 * moveSpeed)) % 1200);
    movementBody = ((movementBody + (0.15 * moveSpeed / 4)) % 100);

    //CODE TO CREATES KIRBY BEGINS

    //draws/Animates Kirby
    function kirby(KirbyToCanvas) {
        context.lineWidth = 3;

        var kirbyBase = mat3.create();
        mat3.fromTranslation(kirbyBase, [150, 150]);
        mat3.rotate(kirbyBase, kirbyBase, (movement / 32) % 360);
        mat3.scale(kirbyBase, kirbyBase, [0.15,0.15]);
        var kirbyTorso = mat3.create();
        mat3.multiply(kirbyTorso, KirbyToCanvas, kirbyBase);

        //back hand
        var kirbyBackHand = mat3.create();
        mat3.rotate(kirbyBackHand, kirbyBackHand, ((movement % 60) * Math.PI / 180 ) - 220);
        mat3.multiply(kirbyBackHand, kirbyTorso, kirbyBackHand);
        setTran(kirbyBackHand);

        context.beginPath();
        context.strokeStyle = "#000000";
        context.fillStyle = "#fd99a7";
        context.lineWidth = 3;

        context.ellipse(-100, 0, 30, 20, 0, Math.PI / 3, Math.PI * 1.65);
        context.fill();
        context.stroke();
        context.closePath();

        //back leg
        var kirbyBackLeg = mat3.create();
        mat3.rotate(kirbyBackLeg, kirbyBackLeg, ((movement % 60) * Math.PI / 180) - 70);
        mat3.multiply(kirbyBackLeg, kirbyTorso, kirbyBackLeg);
        setTran(kirbyBackLeg);

        context.beginPath();
        context.fillStyle = "#dd0459";

        context.ellipse(0, 100, 50, 30, 0, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.closePath();

        //torso
        setTran(kirbyTorso);

        context.beginPath();
        context.fillStyle = "#fd99a7";
        context.arc(0, 0, 100, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        context.stroke();

        //front hand
        var kirbyFrontHand = mat3.create();
        mat3.rotate(kirbyFrontHand, kirbyFrontHand, ((-movement % 60) * Math.PI / 180 ) - 200);
        mat3.multiply(kirbyFrontHand, kirbyTorso, kirbyFrontHand);
        setTran(kirbyFrontHand);

        context.beginPath();
        context.fillStyle = "#fd99a7";

        context.ellipse(-100, 0, 30, 20, 0, Math.PI / 3, Math.PI * 1.65);
        context.fill();
        context.stroke();
        context.closePath();

        //front leg
        var kirbyFrontLeg = mat3.create();
        mat3.rotate(kirbyFrontLeg, kirbyFrontLeg, ((-movement % 60) * Math.PI / 180) - 270);
        mat3.multiply(kirbyFrontLeg, kirbyTorso, kirbyFrontLeg);
        setTran(kirbyFrontLeg);

        context.beginPath();
        context.fillStyle = "#dd0459";

        context.ellipse(0, 100, 50, 30, 0, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.closePath();

        //creates Kirby's eyes
        kirbyEyes(kirbyTorso);
    }

    //Creates Kirby's eyes and moves the eyes when the mouth opens
    function kirbyEyes(kirbyTorso) {
        var kirbyEyeX = 80;
        var kirbyEyeY = 0;

        var kirbyEyes = mat3.create();
        mat3.multiply(kirbyEyes, kirbyTorso, kirbyEyes);
        setTran(kirbyEyes);

        context.beginPath();
        context.fillStyle = "#000000";
        context.ellipse(kirbyEyeX, kirbyEyeY, 10, 20, 0, 0, Math.PI * 2);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = "#007dff";
        context.ellipse(kirbyEyeX, kirbyEyeY, 7, 17, 0, 0, Math.PI * 2);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = "#000000";
        context.arc(kirbyEyeX, kirbyEyeY, 9, 0, Math.PI * 2);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = "#ffffff";
        context.ellipse(kirbyEyeX, kirbyEyeY - 8, 6, 9, 0, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }

    //CODE TO CREATE KIRBY ENDS

    //create details to make Kirby seem to be in space
    function createSpace() {
        context.fillStyle = "black";
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = "white";
        context.fillRect(300, 350, 10, 10);
        context.fillRect(200, 300, 10, 10);
        context.fillRect(150, 270, 10, 10);
        context.fillRect(50, 30, 10, 10);
        context.fillRect(20, 400, 10, 10);
        context.fillRect(50, 450, 10, 10);
        context.fillRect(450, 75, 10, 10);
        context.fillRect(400, 50, 10, 10);
        context.fillRect(375, 150, 10, 10);
        context.fillRect(375, 450, 10, 10);
        context.fillRect(450, 400, 10, 10);
        context.font = "40px Impact";
        context.fillText("POYO TIME IN SPACE!", 100, 40);
    }

    //CODE TO CALCULATE LINES OF TRACK BEGINS

    var Rstart = 50.0;
    var Rslope = 25.0;
    
    var Cspiral = function(t) {
	    var R = Rslope * t + Rstart;
	    var x = R * Math.cos(2.0 * Math.PI * t);
	    var y = R * Math.sin(2.0 * Math.PI * t);
	    return [x,y];
    }
    
    var Cspiral2 = function(t) {
        t = 2 - t;

	    var R = Rslope * t + Rstart;
	    var x = -1 * R * Math.cos(2.0 * Math.PI * t) + 200;
	    var y = -1 * R * Math.sin(2.0 * Math.PI * t);
	    return [x,y];
    }

    var Cspiral21 = function(t) {
	    var R = Rslope * t + Rstart;
	    var x = -1 * R * Math.cos(2.0 * Math.PI * t) + 200;
	    var y = R * Math.sin(2.0 * Math.PI * t);
	    return [x,y];
    }

    var Cspiral22 = function(t) {
        t = 0.25 - t;

	    var R = Rslope * t + Rstart;
	    var x = R * Math.cos(2.0 * Math.PI * t) + 200;
	    var y = -1 * R * Math.sin(2.0 * Math.PI * t) + 113;
	    return [x,y];
    }

    var Cline = function(t) {
        var x = 250;
        var y = t * 350 + 112.5;
        return [x,y];
    }
    
    var Cspiral3 = function(t) {
        t = 2 - t;

	    var R = Rslope * t + Rstart;
	    var x = R * Math.cos(2.0 * Math.PI * t) + 150;
	    var y = -1 * R * Math.sin(2.0 * Math.PI * t) + 200;
	    return [x,y];
    }
    
    var Cspiral4 = function(t) {
	    var R = Rslope * t + Rstart;
	    var x = R * Math.cos(2.0 * Math.PI * t) + 150;
	    var y = R * Math.sin(2.0 * Math.PI * t) + 200;
	    return [x,y];
    }

    var Cline2 = function(t) {
        t = 0.50 - t;

        var x = t * 300;
        var y = 256;
        return [x,y];
    }

    var Cspiral5 = function(t) {
        t = 0.25 - t;

	    var R = Rslope * t + Rstart;
	    var x = -1 * R * Math.cos(2.0 * Math.PI * t);
	    var y = R * Math.sin(2.0 * Math.PI * t) + 200;
	    return [x,y];
    }

    var Cline3 = function(t) {
        t = 0.5 - t;

        var x = -50;
        var y = t * 400;
        return [x,y];
    }

    var Cspiral61 = function(t) {
	    var R = Rslope * t + Rstart;
	    var x = -1 * R * Math.cos(2.0 * Math.PI * t);
	    var y = -1 * R * Math.sin(2.0 * Math.PI * t);
	    return [x,y];
    }

    var Cspiral62 = function(t) {
        t = 0.25 - t;

	    var R = Rslope * t + Rstart;
	    var x = R * Math.cos(2.0 * Math.PI * t);
	    var y = -1 * R * Math.sin(2.0 * Math.PI * t);
	    return [x,y];
    }

    //CODE TO CALCULATE LINES OF TRACK ENDS

    //piecewise function for the lines of the track
    var Ccomp1 = function(t) {
        if(t<2) {
            return Cspiral(t);
        }else if(t >= 2 && t < 4) {
            return Cspiral2(t - 2);
        } else if(t >= 4 && t < 4.25) {
            return Cspiral21(t - 4);
        } else if(t >= 4.25 && t < 4.50) {
            return Cspiral22(t - 4.25);
        } else if(t >= 4.50 && t < 4.75) {
            return Cline(t - 4.50);
        } else if(t >= 4.75 && t < 6.75) {
            return Cspiral3(t - 4.75);
        } else if(t >= 6.75 && t < 7) {
            return Cspiral4(t - 6.75);
        } else if(t >= 7 && t < 7.5) {
            return Cline2(t - 7);
        } else if(t >= 7.5 && t < 7.75) {
            return Cspiral5(t - 7.5);
        } else if(t >= 7.75 && t < 8.25) {
            return Cline3(t - 7.75);
        } else if(t >= 8.25 && t < 8.50) {
            return Cspiral61(t - 8.25);
        } else if(t >= 8.50 && t < 8.75) {
            return Cspiral62(t - 8.50);
        }
    }

    //helper method to draw the lines of the track that Kirby follows
    function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
	    context.strokeStyle=color;
	    context.beginPath();
            moveToTx(C(t_begin),Tx);
        for(var i=1;i<=intervals;i++){
		    var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
		    lineToTx(C(t),Tx);
        }
        context.stroke();
    }

    createSpace(); //creates details to make Kirby appear to be in space

    //translation used to draw lines of the track that Kirby follows
    var Tblue_to_canvas = mat3.create();
	mat3.fromTranslation(Tblue_to_canvas,[150,150]);

    //calls the helper method above for all the components of the line of the track
    drawTrajectory(0.0,2.0,100,Cspiral,Tblue_to_canvas,"white");

    drawTrajectory(0.0,2.0,100,Cspiral2,Tblue_to_canvas,"white");

    drawTrajectory(0.0,0.25,13,Cspiral21,Tblue_to_canvas,"white");

    drawTrajectory(0.0,0.25,13,Cspiral22,Tblue_to_canvas,"white");

    drawTrajectory(0.0,0.25,13,Cline,Tblue_to_canvas,"white");

    drawTrajectory(0.0,2.0,100,Cspiral3,Tblue_to_canvas,"white");

    drawTrajectory(0.0,0.25,13,Cspiral4,Tblue_to_canvas,"white");

    drawTrajectory(0.0,0.5,25,Cline2,Tblue_to_canvas,"white");
    
    drawTrajectory(0.0,0.25,13,Cspiral5,Tblue_to_canvas,"white");

    drawTrajectory(0.0,0.5,25,Cline3,Tblue_to_canvas,"white");

    drawTrajectory(0.0,0.25,13,Cspiral61,Tblue_to_canvas,"white");

    drawTrajectory(0.0,0.25,13,Cspiral62,Tblue_to_canvas,"white")

    //calculates the vector to be applied to Kirby
    var t = ((100 - movementBody) / 100) * 0.0 + (movementBody / 100) * 8.75;
    var TempCcomp = Ccomp1(t);

    //applies vector above to Kirby with fromTranslation()
    var KirbyToCanvas = mat3.create();
    mat3.fromTranslation(KirbyToCanvas, TempCcomp);

    //call to create Kirby
    kirby(KirbyToCanvas);

    window.requestAnimationFrame(draw);
  }
  window.requestAnimationFrame(draw);
}
window.onload = setup;