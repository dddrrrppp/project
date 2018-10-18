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

function showProList(id){
    var flag=$("#"+id+"_flag").val();
     var skuIds=$("#"+id+"_skuIds").val();
     
     var mediaPath = "https://res.vmallres.com/pimages/";
     if(skuIds!="" && flag=="no"){
         skuIds=skuIds.substring(0,skuIds.length-1);
         var skuIdArr=skuIds.split(",");

        skuIdArr=removeDuplicatedItem(skuIdArr);
         $("#"+id+"_flag").val("yes");
         $.ajax({
            url :  "/querySbomInfo.json?skuIdsStr="+skuIds,
            async:true,
            type : "GET",
            dataType : "json",
            timeout : 10000,
            success : function(json){
                if(json.success){
                    var infoMap=json.sbomInfoMap;
                    var html = '';
                    for(var i=0;i<skuIdArr.length;i++){
                        var skuId=skuIdArr[i];
                        var sbomInfo=json.sbomInfoMap[skuId];
                        if(sbomInfo!=null){
                            var imgPath = mediaPath + sbomInfo.photoPath+"142_142_"+sbomInfo.photoName;
                            var urlPath = "/product/"+sbomInfo.disPrdId+".html";
                            var proName = $('#name_' + skuId).val();
                            var price;
                            var priceMode = sbomInfo.priceMode;
                            if (priceMode == 2 || sbomInfo.price == 0) {
                                price = "<span>暂无报价</span>";
                            } else {
                                price = "&yen;" + sbomInfo.price;
                            }
                            var oneNavName=$("#"+id+"_name").val();
                            var onShowName="分类导航_"+oneNavName+"_"+sbomInfo.sbomCode;
                            html += '<li class="grid-items" onmouseenter="fixCurrent(this)"  onmouseleave="leaveCurrent(this)" >';
                            html += '     <a class="thumb" target="_blank" href="'+urlPath+'">';
                            html += '         <p class="grid-img">';
                            html += '             <img alt="" src="' + imgPath + '">';
                            html += '          </p>';
                            html += '          <div class="grid-title">' + proName + '</div>';
                            html += '          <p class="grid-price">' + price + '</p>';
                            html += '       </a>';
                            html += '  </li>';
                        }
                    }
                    $("#"+id+"_prolist").html(html);
                }
            },
            error : function() {
                
            }
        }); 
     }
 };
 function fixCurrent(obj){
    $(obj).addClass('current');
 }
 function leaveCurrent(obj){
     $(obj).removeClass('current');
 }
 function removeDuplicatedItem(ar) {
    var ret = [];
    for (var i = 0, j = ar.length; i < j; i++) {
        if (ret.indexOf(ar[i]) === -1) {
            ret.push(ar[i]);
        }
    }
    return ret;
}
(function () {
        var $nav = $('.naver li'),
            $naverSub = $('.naver-sub'),
            navLen = $nav.length,
            navWidth = $nav.width(),
            navListCount = null,
            timer = null;

        $nav.bind({
            mouseenter: function () {
                {
                    var count = $(this).attr('data-id') || null,
                        $naverSubItem = $('#naverSub0' + count),
                        $this = $(this),
                        openItem = null;

                    if ($naverSubItem.length <= 0) {
                        $naverSub
                            .children()
                            .slideUp(200);
                        clearTimeout(timer);
                        return;
                    }
                    navListCount = count;

                    $naverSub
                        .children()
                        .each(function (index, item) {
                            if ($(this).css('display') == 'block') {
                                openItem = true;
                            }
                        });

                    if (timer) clearTimeout(timer);

                    if (openItem) {
                        showProList('zxnav_' + count);
                        $naverSub.show();
                        $naverSubItem
                            .show()
                            .unbind('mouseenter')
                            .mouseleave(function (e) {
                                itemsLeave.call(this, e , $naverSubItem);
                            })
                            .siblings()
                            .hide();

                    } else {
                        showProList('zxnav_' + count);
                        timer = setTimeout(function () {
                            $naverSub
                                .show();
                            $naverSubItem
                                .slideDown(200)
                                .unbind('mouseenter')
                                .mouseleave(function (e) {
                                    itemsLeave.call(this, e , $naverSubItem);
                                })
                            ;
                        }, 200);
                    }
                }
            },
            mouseleave: function (e) {
                var $target = $(e.target),
                    eX = e.pageX,
                    eY = e.pageY,
                    oX = $target.offset().left,
                    oY = $target.offset().top,
                    yy = oY-eY,
                    xx = oX - eX,
                    xx2 = eX - (oX + navWidth),
                    index = $nav.index(this),
                    $naverSubItem = $('#naverSub0' + navListCount);

                if (timer) clearTimeout(timer);

                $naverSubItem.mouseenter(function () {
                    if (timer) clearTimeout(timer);
                });
                if (yy <= 10 && yy > 0 || (xx <= 10 && xx > 0 && index == 0) || (xx2 <= 10 && xx2 > 0 && index == navLen - 1 )) {
                    $naverSubItem.unbind('mouseleave');
                    $naverSub
                        .children()
                        .slideUp(300)
                } else {
                    timer = setTimeout(function () {
                        $naverSubItem.unbind('mouseenter');
                        $naverSub
                            .children()
                            .slideUp(300)
                    }, 200)
                }
            }
        });
        function itemsLeave(e , obj) {
            var $target = $(e.target),
                eX = e.pageX,
                eY = e.pageY,
                oX = $target.offset().left,
                oY = $target.offset().top,
                _this = $(this);

            clearTimeout(timer);
            if ((oY - eY) <= 10 && (oY - eY) > 0 && (eX - oX) > 300) {
                _this
                    .show();
            } else {
                timer = setTimeout(function () {
                    _this.slideUp(200);
                }, 200)
            }
        }
})();


//放大镜
var big = (function(){
	return{
		init: function(){
			// 获取最大的盒子
			this.$product = document.querySelector('.product');
			// 获取展示图片的盒子
			this.$showImage = this.$product.querySelector('.product-gallery-img');
			// 获取放大图片的盒子
			this.$showBigImage = this.$product.querySelector('.show-big-image');
			// 获取放大的图片
			this.$bigImage = this.$showBigImage.firstElementChild;
			// 获取小图片的盒子
			this.$ulbox = this.$product.querySelector('.img-box');
			// 获取每一张图片的li集合
            this.$liAll = this.$ulbox.children;
            // 获取移动的小黑块(放大镜)
            this.$filter = this.$showImage.querySelector('.filter');
            // 给每一li添加索引， 方便获取
	        for(var i = 0; i < this.$liAll.length; i++) {
	           this.$liAll[i].index = i;
	        }
			this.event();
		},
		event: function(){
			var _this = this;
			this.$ulbox.onmouseover = function(ev){
				ev = ev || window.event;
				var target = ev.target || ev.srcElement;
				if(target.nodeName == 'A'){
					_this.showImage(target.parentNode.index);
				}else if(target.nodeName == 'IMG'){
					_this.showImage(target.parentNode.parentNode.index);
				}
			}
			// 这里用onmouseenter： 子元素不触发事件
            this.$showImage.onmouseenter = function() {
            // 放大镜显示
            _this.$filter.style.display = 'block';
            // 展示大图片显示
            _this.$showBigImage.style.display = 'block';
            // 注意: 需要放大镜显示以后,才可以获取真正的放大镜尺寸
            _this.maxX = this.clientWidth - _this.$filter.offsetWidth;
            _this.maxY = this.clientHeight - _this.$filter.offsetHeight;
         	}
            this.$showImage.onmouseleave = function() {
                _this.$filter.style.display = 'none';
                _this.$showBigImage.style.display = 'none';
            }
            this.$showImage.onmousemove = function(ev) {
                // 计算放大镜的位置
                var x = ev.pageX -  _this.$filter.offsetWidth - _this.$showImage.offsetLeft;
                var y = ev.pageY -_this.$filter.offsetHeight - _this.$showImage.offsetTop;
                // 边界处理
                if(x < 0) {
                  x = 0;
                } else if(x > _this.maxX) {
                  x = _this.maxX;
                }
                if(y < 0) {
                  y = 0;
                } else if(y > _this.maxY) {
                  y = _this.maxY;
                }
                _this.$filter.style.left = x + 'px';
                _this.$filter.style.top = y + 'px';

                // 移动大图片
                _this.$bigImage.style.left = x * -1.61 - 50 + 'px';
                _this.$bigImage.style.top = y * -1.8 + 'px';

            }
		},
		showImage: function(index) {
          for(var i = 0; i < this.$liAll.length; i++) {
            this.$liAll[i].firstElementChild.removeAttribute('class');
        }
          this.$liAll[index].firstElementChild.className = 'active';
          var src = this.$liAll[index].firstElementChild.firstElementChild.src;
          this.$showImage.firstElementChild.firstElementChild.src = src.replace('small', 'largest');
          this.$bigImage.src = src.replace('small', 'largest');
        }
	}
}())

big.init();

var moveLeft = (function(){
	return{
		init: function(){
			this.$left = document.querySelector('.product-gallery-back');
			this.$right = document.querySelector('.product-gallery-forward')
			this.$ul = document.querySelector('.img-box');
			this.event();
		},
		event: function(){
			var _this = this;
			this.$left.onclick = function(){
				if(parseInt(_this.$ul.style.left) >= 0){
					_this.$ul.style.left = 0 + 'px'
				}else{
					_this.$ul.style.left = parseInt(_this.$ul.style.left) + 74 + 'px'
				}
			}
			this.$right.onclick = function(){
				if(parseInt(_this.$ul.style.left) <= -148){
					_this.$ul.style.left = -148 + 'px'
				}else{
					_this.$ul.style.left = parseInt(_this.$ul.style.left) - 74 + 'px';
				}
			}
		}
	}
}())

moveLeft.init();

//选择颜色
var color = (function(){
	return{
		init: function(){
			this.$detail = document.querySelector('.product-choose-detail');
			this.$product_selected = document.querySelector('.product-selected');
			this.$ul = this.$detail.firstElementChild;
			this.$liAll = this.$ul.children;
			for(var i = 0; i < this.$liAll.length; i++) {
	           this.$liAll[i].index = i;
	       }
			this.event();
		},
		event: function(){
			var _this = this;
			this.$ul.onclick = function(ev){
				ev = ev || window.event;
				var target = ev.target || ev.srcElement;
				if(target.nodeName == 'A'){
					_this.showImage(target.parentNode.parentNode.index);
				}else if(target.parentNode.nodeName == 'A'){
					_this.showImage(target.parentNode.parentNode.parentNode.index);
				}else if(target.parentNode.parentNode.nodeName == 'A'){
					_this.showImage(target.parentNode.parentNode.parentNode.parentNode.index);
				}
			}
		},
		showImage: function(index) {
          for(var i = 0; i < this.$liAll.length; i++) {
            this.$liAll[i].removeAttribute('class');
        }
          this.$liAll[index].className = 'selected';
        }
	}
}())

color.init();

var versions = (function(){
	return{
		init: function(){
			this.$detail = document.querySelector('.detail-two');
			this.$ul = this.$detail.firstElementChild;
			this.$liAll = this.$ul.children;
			for(var i = 0; i < this.$liAll.length; i++) {
	           this.$liAll[i].index = i;
	       }
			this.event();
		},
		event: function(){
			var _this = this;
			this.$ul.onclick = function(ev){
				ev = ev || window.event;
				var target = ev.target || ev.srcElement;
				if(target.nodeName == 'A'){
					_this.showImage(target.parentNode.parentNode.index);
				}else if(target.parentNode.nodeName == 'A'){
					_this.showImage(target.parentNode.parentNode.parentNode.index);
				}else if(target.parentNode.parentNode.nodeName == 'A'){
					_this.showImage(target.parentNode.parentNode.parentNode.parentNode.index);
				}
			}
		},
		showImage: function(index) {
          for(var i = 0; i < this.$liAll.length; i++) {
            this.$liAll[i].removeAttribute('class');
        }
          this.$liAll[index].className = 'selected';
        }
	}
}())

versions.init();

var Mouse = (function(){
	return{
		init: function(){
			this.$box = document.querySelector('.product-service');
			this.$boxT = document.querySelector('.product-service-two');
			this.event();
		},
		event: function(){
			var _this = this;
			this.$box.onmouseenter = function(ev){
				ev = ev || window.event;
				var target = ev.target || ev.srcElement;
				if(target.nodeName == 'DIV'){
					_this.$box.lastElementChild.style.display = 'block'
				}
			}
			this.$box.onmouseleave = function(ev){
				ev = ev || window.event;
				_this.$box.lastElementChild.style.display = 'none';
			}
			this.$boxT.onmouseenter = function(ev){
				ev = ev || window.event;
					_this.$boxT.lastElementChild.style.display = 'block';
			}
			this.$boxT.onmouseleave = function(ev){
				ev = ev || window.event;
				_this.$boxT.lastElementChild.style.display = 'none';
			}
		}
	}
}())

Mouse.init();

var addBtn = (function(){
	return{
		init: function(){
			this.$btnBox = document.querySelector('.product-stock-btn');
			this.$first = this.$btnBox.firstElementChild;
			this.$last = this.$btnBox.lastElementChild;
			this.$val = document.querySelector('.product-stock-text');
			this.event();
		},
		event: function(){
			var _this = this;
			this.$first.onclick = function(){
				_this.$val.value = parseInt(_this.$val.value) + 1;
				if(_this.$val.value > 1){
					_this.$last.removeAttribute('class');
				}
			}
			this.$last.onclick = function(){
				if(_this.$val.value <= 1){
					_this.$last.className = 'disabled'
					_this.$val.value = 1;
				}else{
					_this.$val.value = parseInt(_this.$val.value) - 1;
				}
			}
		}
	}
}())

addBtn.init();




//弹出框
var popup = (function(){
	return{
		init: function(){
			this.$product = document.querySelector('.product-button01');
			this.$ol_box_mask = document.querySelector('.ol_box_mask');
			this.$ol_box = document.querySelector('.ol_box_4');
			this.$box_cancel = document.querySelector('.box-cancel');
			this.$box_ok = document.querySelector('.box-ok');
			this.event();
		},
		event: function(){
			var _this = this;
			this.$product.onclick = function(){
				_this.$ol_box_mask.style.visibility = 'visible';
				_this.$ol_box.style.visibility = 'visible';
				_this.$box_cancel.onclick = function(){
					_this.$ol_box_mask.style.visibility = 'hidden';
					_this.$ol_box.style.visibility = 'hidden';
				}
			}
		}
	}
}())

popup.init();



var index_js = (function(){
	var $ul = $('.product-property');
    var shopList = localStorage.shopList || '[]';
    shopList = JSON.parse(shopList);
    return {
        init() {
            this.events();
        },
        addShop(obj) {
            
            // 从本地数据库获取数据， 查看商品是否已拥有。
            // -> 拥有 在原来的基础上累加数量
            // -> 未拥有 新增一条新的数据
            // 假设把商品存到了shopList属性里

            // 在没有添加数据时，字段值为undefined，给一个默认数组
            // var shopList = localStorage.shopList || '[]'
            // shopList = JSON.parse(shopList);
            // 添加一个锁
            var add = true;
            for(var i= 0; i<shopList.length; i++) {
                // 判断已添加商品列表中是否含有现添加的商品
                if(obj.id == shopList[i].id) {
                    // 如果函数能进来的话，证明现添加的商品，已经存在购物车内，不需要添加新的数据
                    add = false
                    //商品数量进行累加
                    shopList[i].count += obj.count;
                    // 找到商品以后，终止循环
                    break;
                } 
            }
            if(add) {
                // 如果没找到， 把当前商品数据添加到本地数据库
                shopList.push(obj);
            }
            // 真正意义把数据存储到本地数据库
            localStorage.shopList= JSON.stringify(shopList);
            console.log(localStorage.shopList)
        },
        events() {
        	this.$product_selected = document.querySelector('.product-selected');
        	var $val = this.$product_selected.innerText;
        	var $id = $val.split('/')[0];
        	var $name = $val.split('/')[1];
        	var $num = document.querySelector('.product-stock-text');
            var _this = this;
            $ul.on('click', '.product-button01', function() {
                var obj = {
                	id: $id,
                	count: Number($num.value),
                	name: $name,
                	price: 3388.00
                }
                _this.addShop(obj);
            })
        }
    }
})()
index_js.init()


function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[attr];
    }
    return ele.currentStyle[attr];
}