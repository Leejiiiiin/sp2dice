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
				scrollEvent == false;
				sec3Sequence();
			}
			
			if(sectionCount == 3){
				wrap.stop().animate({top: '-' + ($('#header').height() + $('.content_wrap').height() - $(window).height() + $('#footer').height()) + 'px'}, 800, scrollStop);
			}
		}
	}

	//주사위 움직이기
	function animateValue(start, end, duration){
		var range = end - start;
		var current = start;
		var increment = end > start? 1 : -1;
		var stepTime = Math.abs(Math.floor(duration / range));

		var timer = setInterval(function(){
			current += increment;
			diceCnt = current;
			if (current == end) {
				clearInterval(timer);
				scrollEvent = false;
			}
			$('.sec3 img').attr('src', './images/dice_' + diceCnt + '.png');
		}, stepTime);
	}


	//section3 sequence
	function sec3Sequence(){
		wrap.off('mousewheel DOMMouseWheel');

		$('.sec3').on('mousewheel DOMMouseWheel', function(e){
			if(sec3EventCheck == true){
				if(scrollEvent == false){
					var sec3delta = e.originalEvent.wheelDelta;
					var sec3UpCheck = sec3Cnt <= 0 && sec3delta > 0;
					var sec3DownCheck = sec3Cnt >= 6 && sec3delta < 0;

					if(sec3UpCheck == false && sec3DownCheck == false){
						scrollEvent = true;
						if(sec3delta > 0){//up
							sec3Cnt--;
							if(sec3Cnt <= 0){
								sec3Cnt = 0;
							}
							animateValue((sec3Cnt+1)*10, Number(sec3Cnt + '1'), 1000);
						}else{//down
							
							if(sec3Cnt >= 0 && sec3Cnt <= 5){
								sec3Cnt++;
								if(sec3Cnt == 1){
									animateValue(sec3Cnt, sec3Cnt*10, 1000);
								}else{
									animateValue(Number((sec3Cnt-1) + '1'), sec3Cnt*10, 1000);
								}
							}
						}
					}else{
						if(sec3UpCheck || sec3DownCheck){
							scrollEvent = false;
							wrap.on('mousewheel DOMMouseScroll', wheelEvent);
						}
					}
				}
			}
		});
	}
});
