var commod = (function(){
	return{
		init: function(){
			this.$text = document.querySelector('.text');
			this.$search = document.querySelector('.search-bar-key');
			this.event();
		},
		event: function(){
			var _this = this;
			_this.$text.onclick = function(){
				_this.$search.style.display = 'none';
			}
		}
	}
}())

commod.init();

var fn = (function(){
	 var timer = null;
	return{
		init: function(){
			this.$top = document.querySelector('.top-banner-min');
			this.$btnO = document.querySelector('.button-top-banner-close');
			this.$p_notice = document.querySelector('.p-notice-content');
			this.$p_ul = this.$p_notice.querySelector('ul');
			this.$p_li = this.$p_ul.querySelectorAll('li');
			this.$goods = document.querySelectorAll('.goods-rolling');
			this.$g_ul = document.querySelectorAll('.swiper-wrapper')
			this.$btnL = document.querySelectorAll('.grid-btnL');
			this.$btnR = document.querySelectorAll('.grid-btnR');
			this.index = 0;
			this.autoPlay();
			this.event();
			
		},
		event: function(){
			var _this = this;
			_this.$btnO.onclick = function(){
				_this.$top.style.display = 'none';
			}
			_this.$btnL[0].onclick = function(){
				_this.$g_ul[0].style.left = 0 + 'px';
			}
			_this.$btnR[0].onclick = function(){
				_this.$g_ul[0].style.left = -1200 + 'px';
			}
			_this.$btnL[1].onclick = function(){
				_this.$g_ul[1].style.left = 0 + 'px';
			}
			_this.$btnR[1].onclick = function(){
				_this.$g_ul[1].style.left = -1200 + 'px';
			}
			_this.$btnL[2].onclick = function(){
				_this.$g_ul[2].style.left = 0 + 'px';
			}
			_this.$btnR[2].onclick = function(){
				_this.$g_ul[2].style.left = -1200 + 'px';
			}
			_this.$btnL[3].onclick = function(){
				_this.$g_ul[3].style.left = 0 + 'px';
			}
			_this.$btnR[3].onclick = function(){
				_this.$g_ul[3].style.left = -1200 + 'px';
			}
			_this.$btnL[4].onclick = function(){
				_this.$g_ul[4].style.left = 0 + 'px';
			}
			_this.$btnR[4].onclick = function(){
				_this.$g_ul[4].style.left = -1200 + 'px';
			}
		},
        showImage: function(index) {
            var maxIndex = this.$p_li.length - 1;
            if(index > maxIndex) {
                index = 0;
                this.$p_ul.style.marginTop = 0;
            } else if(index < 0) {
                index = maxIndex;
                this.$p_ul.style.marginTop = -48 * (maxIndex + 2) + 'px';
            }
            this.index = index;
            move(this.$p_ul, 'marginTop', -48 * index);
        },
        autoPlay(index) {
        	var maxIndex = this.$p_li.length;
        	clearInterval(timer);
            index = index || 0;
            var _this = this;
            timer = setInterval(function(){
           	index++;
           	if(index > maxIndex){
           		index = 1;
           	}
           	_this.showImage(index);
           }, 2000)
        }
	}
}())


var fade = (function(){
	$dotBox = $('.ec-slider-nav-1');
	$imgBox = $('.banner-image');
	var timer;
	return {
		init(){
			this.events();
			this.autoPlay(0);
		},
		showImg(index){
			$dotBox.children().removeClass();
			$dotBox.children().eq(index).addClass('active');
			$imgBox.children('li').eq(index).fadeIn().siblings().fadeOut();
		},
		autoPlay(index){
			var _this = this;
			clearInterval(timer);
			timer = setInterval(function(){
				index++;
				if (index==$('.banner-image li').length) {
					index = 0;
				}
				_this.showImg(index);
			},5000);
		},
		events(){
			var _this = this;
			$dotBox.find('span').on('mouseenter	',function(){
				_this.showImg($(this).index());
				_this.autoPlay($(this).index());
			});
		}
	}
})();
fade.init();


var fadeT = (function(){
	$dotBoxT = $('.ec-slider-nav');
	$imgBoxT = $('.ec-slider-list');
	var timer;
	return {
		init(){
			this.events();
			this.autoPlay(0);
		},
		showImg(index){
			$dotBoxT.children().removeClass();
			$dotBoxT.children().eq(index).addClass('current');
			$imgBoxT.children('li').eq(index).fadeIn().siblings().fadeOut();
		},
		autoPlay(index){
			var _this = this;
			clearInterval(timer);
			timer = setInterval(function(){
				index++;
				if (index==$('.ec-slider-list li').length) {
					index = 0;
				}
				_this.showImg(index);
			},5000);
		},
		events(){
			var _this = this;
			$dotBoxT.find('span').on('mouseenter',function(){
				_this.showImg($(this).index());
				_this.autoPlay($(this).index());
			});
		}
	}
})();
fadeT.init();



function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[attr];
    }
    return ele.currentStyle[attr];
}


function move(ele, attr, target) {
    if (typeof ele == 'string') {
        ele = document.querySelector(ele);
    }
    clearInterval(ele.timer);
    var init = parseFloat(getStyle(ele, attr));
    if (attr == 'opacity') {
        init *= 100;
    }
    ele.timer = setInterval(function () {
        var speed = (target - init) / 20;
        if(speed > 0) {
            speed = Math.ceil(speed);
        } else {
            speed = Math.floor(speed);
        }
        init += speed
        if ((speed >= 0 && init >= target) || (speed <= 0 && init <= target)) {
            init = target;
            clearInterval(ele.timer);
        }
        if (attr == 'opacity') {
            ele.style[attr] = init / 100;
        } else {
            ele.style[attr] = init + 'px';
        }
    }, 10)

}



//返回顶部
$('.hungBar-top').gotoTop({
    offset: 500, //距离顶部的位置
    speed: 300, //移动到顶部的速度
    /*     iconSpeed : 300, //icon动画样式的速度*/
    animationShow: {
        'transform': 'translate(0,0)',
        'transition': 'transform .5s ease-in-out'
    }, //icon动画样式显示时
    animationHide: {
        'transform': 'translate(80px,0)',
        'transition': 'transform .5s ease-in-out'
    } //icon动画样式隐藏时
});


