// function handleDeviceOrientation(e) {

//     var x = e.alpha.toFixed(2);
//     var y = e.beta.toFixed(2);
//     var z = e.gamma.toFixed(2);

//     document.getElementById('x').value = x;
//     document.getElementById('y').value = y;
//     document.getElementById('z').value = z;

//     var translate = "translate(" + x + "px," + y + "px)";
//     ball.style.webkitTransform = translate;
//     ball.style.transform = translate;
// }
// 
// window.ondeviceorientation = handleDeviceOrientation;
(function() {
	var $ = document.querySelectorAll.bind(document),
    	ball = $('.ball')[0],
    	points = $('[class^="p"]'),
        randomize = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        handleMotionEvent = function(e) {

            var x = e.accelerationIncludingGravity.x.toFixed(0) * 10;
            var y = e.accelerationIncludingGravity.y.toFixed(0) * 10;
            var z = e.accelerationIncludingGravity.z.toFixed(0) * 10;

            document.getElementById('x').value = x;
            document.getElementById('y').value = y;
            document.getElementById('z').value = z;

            TweenLite.to(ball, 0.1, { x: -x * 2, y: y * 2, ease: Power1.easeIn });

            var random = randomize(0,15),
            	ball_x = ball.getBoundingClientRect().left.toFixed(0)
            	ball_y = ball.getBoundingClientRect().top.toFixed(0);

           //  if ( (points[random].offsetLeft == ball_x) && (points[random].offsetTop == ball_y) ) {
           //  	TweenLite.to(points[random], 0.5, {autoAlpha: 0, onComplete: function(){
        			// TweenLite.to(points[randomize(0,15)], 0.5, {autoAlpha: 1});
           //  	}});
           //  }
           
        }

    window.addEventListener("devicemotion", handleMotionEvent, true);
    // console.log('randomize: ', randomize(0,15));
    // console.log('P: ', points[0].offsetLeft);
    // console.log('BALL: ',ball.style);
})();