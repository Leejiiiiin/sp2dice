$(function(){
	var wrap = $('#wrap');
	var scrollEvent = false;
	var sec3EventCheck = false;
	var sectionCount = 0;
	var diceCnt = 1;
	var sec3Cnt = 0;



	$('.sec1').height($(window).height() - $('#header').outerHeight());

	$(window).on('resize', function(){
		$('.sec1').height($(window).height() - $('#header').outerHeight());
	});

	wrap.on('mousewheel DOMMouseScroll', wheelEvent);


	function scrollStop(){
		scrollEvent = false;
		if(sectionCount != 2){
			sec3EventCheck = false;
		}else{
			sec3EventCheck = true;
		}
	}

	function sectionMove(){
		wrap.stop().animate({top: '-' + (100 * sectionCount) + '%'}, 800, scrollStop);
	}
	
	//마우스 휠 이벤트
	function wheelEvent(e){
		e.preventDefault();
		var wheelDelta = e.originalEvent.wheelDelta;
		var sectionLength = $('.section').length;

		if(scrollEvent == false){
			scrollEvent = true;

			if(wheelDelta > 0){//up
				
				sectionCount--;
				if(sectionCount <= 0){
					sectionCount = 0;
				}
				sectionMove();
			}else{//down
				if(sectionCount >= 0 && sectionCount < sectionLength){
					sectionCount++;
					sectionMove();
				}
			}
			
			if(sectionCount == 2){
				sec3Sequence();
			}
			
			if(sectionCount == 3){
				wrap.stop().animate({top: '-' + ($('#header').height() + $('.content_wrap').height() - $(window).height() + $('#footer').height()) + 'px'}, 800, scrollStop);
			}
		}
	}

	//주사위 움직이기
	var diceIntervalCheck = false;
	function animateValue(start, end, duration){ // 11, 20, 1s
		var range = end - start; //9
		var current = start; // 1
		var increment = end > start? 1 : -1;
		var stepTime = Math.abs(Math.floor(duration / range)); // 1000 / 9



		var timer = setInterval(function(){
			current += increment;
			diceCnt = current;
			if (current == end) {
				clearInterval(timer);
				diceIntervalCheck = false;
			}
			$('.sec3 img').attr('src', './images/dice_' + diceCnt + '.png');
			
			// sec3EventCheck = false;
			scrollEvent = false;
			// console.log(current);
		}, stepTime);

		// return false;

	}


	//section3 sequence
	function sec3Sequence(){
		wrap.off('mousewheel DOMMouseWheel');

		$('.sec3').on('mousewheel DOMMouseWheel', function(e){
			// e.preventDefault();
			if(sec3EventCheck == true){
				if(scrollEvent == false){
					scrollEvent = true;
					var sec3delta = e.originalEvent.wheelDelta;
					var sec3UpCheck = sec3Cnt <= 0 && sec3delta > 0;
					var sec3DownCheck = sec3Cnt >= 6 && sec3delta < 0;

					if(sec3delta > 0){//up
						sec3Cnt--;
						if(sec3Cnt <= 0){
							sec3Cnt = 0;
						}

						if(diceIntervalCheck == false){
							diceIntervalCheck = true;
							animateValue((sec3Cnt+1)*10, Number(sec3Cnt + '1'), 1000);
						}

						// console.log((sec3Cnt+1)*10, Number(sec3Cnt + '1'), diceCnt);
						
					}else{//down
						sec3Cnt++; //2

						if(sec3Cnt >= 0 && sec3Cnt <= 5){
							if(sec3Cnt == 1){
								if(diceIntervalCheck == false){
									diceIntervalCheck = true;
									animateValue(sec3Cnt, sec3Cnt*10, 1000);
								}
							}else{
								if(diceIntervalCheck == false){
									diceIntervalCheck = true;
									animateValue(Number((sec3Cnt-1) + '1'), sec3Cnt*10, 1000);
								}
							}
						}else if(sec3Cnt >= 6){
							wrap.on('mousewheel DOMMouseScroll', wheelEvent);
						}
					}

					if(sec3UpCheck || sec3DownCheck){
						sec3EventCheck = false;
						wrap.on('mousewheel DOMMouseScroll', wheelEvent);
						// console.log(sec3UpCheck, sec3DownCheck, sec3EventCheck);
					}
					
				}
				

			}
			
			// console.log(sec3Cnt);
		});
	}
});

console.log(1);

