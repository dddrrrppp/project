var index_js = (function(){
	
    // 展示数据的盒子
    var $ul = $('.sc-empty');
    var shopList = localStorage.shopList || '[]';
    shopList = JSON.parse(shopList);

    return {
        // 初始化函数
        init() {
            this.events();
            this.insertData(shopList);
            this.change();
        },
        insertData(data) {
            var str = `<div class='sc-pro-title clearfix'>
            				<label class='checkbox' style='text-align: initial'><input class='vam' readonly='readonly'>全选</label>
            				<ul class='clearfix'>
            					<li>商品</li>
            					<li>单价</li>
            					<li>数量</li>
            					<li>小计</li>
            					<li>操作</li>
            				</ul>
            			</div>
            			<form autocomplete ='off' method='get'>
            				<div class='sc-pro'>
            					<div>
            						<div class='sc-pro-list clearfix'>
            							<label class='checkbox'>
            								<input readonly='readonly' class='vam'>
            							</label>
            							<div class='sc-pro-area'>
            								<div class='sc-pro-main clearfix'>
            									<a href='https://www.vmall.com/product/10086915330134.html#10086425688564' class='p-img'>
            										<img src='images/shop_img/428_428_1522652355294mp.jpg'>
            									</a>
            									<ul>
            										<li>
            											<a href='#'>
            												HUAWEI P20 6GB+64GB 全网通版（亮黑色）
            											</a>
            										</li>
            										<li>
            											<div class='p-price'>
            												<span>¥&nbsp3388.00</span>
            											</div>
            										</li>
            										<li>
            											<div class='p-stock'>
            												<div class='p-stock-area'>
            													<input type='number' class='p-stock-text'>
            													<p class='p-stock-btn'>
            														<a href="javascript:;">+</a>
            														<a href='javascript:;' class='disabled'>-</a>
            													</p>
            												</div>
            											</div>
            										</li>
            										<li class='p-price-total'>
            											¥&nbsp3388.00
            										</li>
            										<li>
            											<a href='javascript:;' class='p-del'>删除</a>
            										</li>
            									</ul>
            								</div>
            							</div>
            						</div>
            					</div>
            				</div>
            			</form>
            			<div class='sc-total-fixed'>
            				<div class='sc-total-tool layout clearfix'>
            					<div class='sc-total-control'>
            						<label class='checkbox'>
            							<input readonly='readonly' class='vam'>全选
            						</label>
            						<a href='javascript:;'>删除</a>
            					</div>
            					<div class='sc-total-btn'>
            						<a href='javascript:;'>立即结算</a>
            					</div>
            					<div class='sc-total-price'>
            						<p>
            							<label>总计:</label>
            							<span>¥&nbsp3388.00</span>
            						</p>
            					</div>
            				</div>
            			<div>`
            $ul.html(str);
        },
        addShop(obj) {
            var add = true;
            // 没有商品的时候，获取的是undifinde
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
            for(var i= 0; i<shopList.length; i++) {
                if(obj.id == shopList[i].id) {
                    add = false
                    shopList[i].count += obj.count;
                    break;
                }
            }
            if(add) {
                shopList.push(obj);
            }
            localStorage.shopList= JSON.stringify(shopList);
            console.log(localStorage.shopList)
        },
        //  事件函数
        events() {
            var _this = this;
            $ul.on('change', 'input', function() {
                // 获取此tr
                var tr = $(this).closest('tr');
                // 获取文本值(商品更新后的数据)
                var val = $(this).val();
                // 修改对应数据
//              shopList[tr.index()].count = val;
                // 存入本地数据库
                localStorage.shopList = JSON.stringify(shopList);
                
            })
            $ul.on('click', '.del-btn', function() {
               var tr = $(this).closest('tr');
               // 删除数组中对应的数据
               shopList.splice(tr.index(), 1);
               // 存入到本地数据库
               localStorage.shopList = JSON.stringify(shopList);
               // 移出dom元素
               tr.remove()
            })
        },
        change(){
        	var $vamAll = document.querySelectorAll('.vam');
        	$vamAll[0].onclick = function(){
        		var flag = false;
        		if(!flag){
        			$vamAll[0].className = 'vam checked';
        			$vamAll[1].className = 'vam checked';
        			$vamAll[2].className = 'vam checked';
        			flag = true;
        			$vamAll[0].onclick = function(){
        				if(flag){
        					
        					$vamAll[0].className = 'vam';
        					$vamAll[1].className = 'vam';
        					$vamAll[2].className = 'vam';
        					flag = false;
        				}
        			}
        		}
        	}
        	$vamAll[1].onclick = function(){
        		$vamAll[1].className = 'vam checked';
        		$vamAll[1].onclick = function(){
        			$vamAll[1].className = 'vam';
        		}
        	}
        	$vamAll[2].onclick = function(){
        		var flag = false;
        		if(!flag){
        			$vamAll[0].className = 'vam checked';
        			$vamAll[1].className = 'vam checked';
        			$vamAll[2].className = 'vam checked';
        			flag = true;
        			$vamAll[2].onclick = function(){
        				if(flag){
        					
        					$vamAll[0].className = 'vam';
        					$vamAll[1].className = 'vam';
        					$vamAll[2].className = 'vam';
        					flag = false;
        				}
        			}
        		}
        	}
        }
    }
})()
index_js.init()

