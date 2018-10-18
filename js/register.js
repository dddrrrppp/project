var register = (function(){
	return{
		init: function(){
			this.$phone = document.querySelector('.phone-wrap');
			this.$email = document.querySelector('.mail-wrap');
			this.$node = document.querySelector('.node-input');
			this.$ul = document.querySelector('.dpmenu-EMU5');
			this.$span = this.$node.querySelector('span');
			this.$li = document.querySelectorAll('.dropListEMUI5_li');
			this.$tel = document.querySelector('.tel');
			this.$error1 = document.querySelector('.error1');
			this.$passO = document.querySelector('.passO');
			this.$passT = document.querySelector('.passT');
			this.$error2 = document.querySelector('.error2');
			this.event();
			this.reg();
		},
		event: function(){
			var _this = this;
			_this.$email.onclick = function(){
				window.location.href = 'register-email.html'
			}
			_this.$phone.onclick = function(){
				window.location.href = 'register.html'
			}
			document.onclick = function(e){
				if(e.target == _this.$node){
					_this.$ul.style.display = 'block'
				}
			}
			this.$ul.onclick = function(e){
				e = e || window.event;
				var target = e.target || e.srcElement;
				if(target.nodeName === 'LI'){
					_this.$span.innerHTML = target.innerHTML;
					_this.listShow();
				}
			}
		},
		listShow: function(val) {
            val = val || 'none';
            this.$ul.style.display = val;
        },
		reg: function(){
			var _this = this;
			_this.$tel.onblur = function(){
				var reg = /^1[35789]\d{9}$/;
				var val = _this.$tel.value;
				val = Number(val);
				if(reg.test(val) == false){
					_this.$error1.style.display = 'block';
				}
			}
			_this.$passT.onblur = function(){
				var $one = _this.$passO.value;
				var $two = _this.$passT.value;
				if($one != $two){
					_this.$error2.style.display = 'block';
				}
			}
		}
	}
}())

var registers = (function(){

    return {
        init: function() {
            this.$loginBtn = document.querySelector('.btn');
            this.$tel = document.querySelector('.tel')
            this.event();
        },
        event: function() {
            var _this = this;
            // 注册按钮
            this.$loginBtn.onclick = function() {
                // 发送ajax，验证用户名和密码
                var params = {
                    method: 'post',
                    data: {
                        tel: _this.$tel.value,
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        _this.loginSuccess(data);
                    }
                }
                sendAjax('php/a.php', params);
            }
            
        },
        checkName: function(data) {
            if(data.code == 200) {
                // 用户名称不存在
            } else {
                // 用户名称存在
            }
        },
        loginSuccess: function(data) {
            if(data.code == 200) {
               
                location.href = 'login.html';
            } else {
                alert(data.msg);
            }
        }
    }

}())


function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[attr];
    }
    return ele.currentStyle[attr];
}