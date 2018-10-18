var login = (function(){
    return {
        init: function(ele) {
            // 获取form表单
            this.$ele = document.querySelector(ele);
            // 获取提交按钮
            this.$loginBtn = this.$ele.querySelector('.button-login');
            this.$usernameInp =   this.$ele.querySelector('.username');
            this.$passwordInp =   this.$ele.querySelector('.password');
            this.$errorN = this.$ele.querySelector('.errorN');
            this.event();
        },
        event: function() {
            var _this = this;
            _this.$usernameInp.onblur = function(){
            	var val = _this.$usernameInp.value;
            	if(val === ""){
            		_this.$errorN.style.display = 'block';
            	}
            }
            // 提交按钮
            this.$loginBtn.onclick = function() {
                // 发送ajax，验证用户名和密码
                var params = {
                    method: 'post',
                    data: {
                        username: _this.$usernameInp.value,
                        password: _this.$passwordInp.value
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        _this.loginSuccess(data);
                    }
                }
                sendAjax('http://localhost/dianshang/php/login.php', params);
            }
        },
        loginSuccess: function(data) {
            if(data.code == 200) {
                document.cookie = "user-id=" + data.data.id;
                document.cookie = "token=" + data.data.token;
                localStorage.userImg = data.data.ataver;
                location.href = 'index.html';
            } else {
                alert(data.msg);
            }
        }
    }

}())






var load = (function(){
	var $loginTitle_left = document.querySelector('.loginTitle-left');
	var $loginTitle_right = document.querySelector('.loginTitle-right');
	var $account = document.querySelector('.account');
	var $accountT = document.querySelector('.accountT');
	return{
		init: function(){
			this.event();
		},
		event: function(){
			var _this = this;
			$loginTitle_right.onclick = function(){
				$loginTitle_left.className = 'loginTitle-left';
				$loginTitle_right.className = 'loginTitle-right active';
				$account.style.display = 'none';
				$accountT.style.display = 'block';
			},
			$loginTitle_left.onclick = function(){
				$loginTitle_left.className = 'loginTitle-left active';
				$loginTitle_right.className = 'loginTitle-right';
				$account.style.display = 'block';
				$accountT.style.display = 'none';
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