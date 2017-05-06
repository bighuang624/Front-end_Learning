/**
 * Created by huang on 17/5/3.
 */

var
    PHONE_REGEXP = /^((13[0-9])|(15[^4])|(18[0-3,5-9])|(17[0-8])|(147))\d{8}$/,
    HONGKONG_PHONE_REGEXP = /^(5|6|8|9)\d{7}$/,
    PASSWORD_REGEXP = /^[0-9a-zA-Z]{8,14}$/,
    LOGIN_SUCEESS_INFO_URL = '',
    LOGINED_NAV_HTML = 'pages/loginNav.html',
    LOGINED_HANDHELDS_NAV_HTML = 'pages/loginHandheldsNav.html',
    QUERY_PHONE_URL = '',
    GET_VALID_CODE_URL = 'user/code',
    REGISTER_URL = 'user/signup';

var login_form = new Vue({
    el: '#login-form',
    data: {
        phone: '',
        password: '',
        phone_warning: '',
        password_warning: '',
        remembered: false
    },
    methods: {
        phoneWarning: function () {
            if (this.phone === '') {
                this.phone_warning = '手机号不能为空！';
                return false;
            } else if (!PHONE_REGEXP.test(this.phone) && !HONGKONG_PHONE_REGEXP.test(this.phone)) {
                this.phone_warning = '手机号格式有误！';
                return false;
            } else {
                this.phone_warning = '';
                return true;
            }
        },
        passwordWarning: function () {
            if (this.password === '') {
                this.password_warning = '密码不能为空！';
                return false;
            } else {
                this.password_warning = '';
                return true;
            }
        },
        loginFormSubmit: function () {
            if (this.phoneWarning() && this.passwordWarning()) {
                alert("可以登录，记住我状态: " + this.remembered);
            }

        }
    }
});

var register_form = new Vue({
    el: '#register-form',
    data: {
        phone: '',
        password: '',
        valid_password: '',
        valid_code: '',

        phone_warning: '',
        password_warning: '',
        valid_password_warning: '',
        valid_code_warning: '',

        valid_code_state: '获取',
        get_valid_code: false,
        wait_time: 60
    },
    methods: {
        phoneWarning: function () {
            if (this.phone === '') {
                this.phone_warning = '手机号不能为空！';
                return false;
            } else if (!PHONE_REGEXP.test(this.phone) && !HONGKONG_PHONE_REGEXP.test(this.phone)) {
                this.phone_warning = '手机号格式有误！';
                return false;
            } else {
                this.phone_warning = '';
                return true;
            }
        },
        passwordWarning: function () {
            if (this.password === '') {
                this.password_warning = '密码不能为空！';
                return false;
            } else if (!PASSWORD_REGEXP.test(this.password)) {
                this.password_warning = '密码格式有误！';
                return false;
            } else {
                this.password_warning = '';
                return true;
            }
        },
        validPasswordWarning: function () {
            if (this.valid_password === '') {
                this.valid_password_warning = '重复密码不能为空！';
                return false;
            } else if (this.valid_password !== this.password) {
                this.valid_password_warning = '重复密码与原密码不一致！';
                return false;
            } else {
                this.valid_password_warning = '';
                return true;
            }
        },
        validCodeWarning: function () {
            if (this.valid_code === '') {
                this.valid_code_warning = '验证码不能为空！';
                return false;
            } else {
                this.valid_code_warning = '';
                return true;
            }
        },
        getValidCode: function () {
            if (this.phoneWarning()) {
                this.valid_code_state = this.wait_time + '秒后重新获取';
                this.get_valid_code = true;
                var _this = this;
                var valid_code_timer = setInterval(function () {
                    if (_this.wait_time === 1) {
                        clearInterval(valid_code_timer);
                        _this.get_valid_code = false;
                        _this.valid_code_state = "获取";
                        _this.wait_time = 60;
                    } else {
                        _this.wait_time--;
                        _this.valid_code_state = _this.wait_time + '秒后重新获取';
                    }
                }, 1000);

                $.ajax(GET_VALID_CODE_URL, {
                    type: 'PUT',
                    dataType: 'text',
                    data: {
                        phone: _this.phone
                    }
                }).done(function (data) {
                    alert("验证码已发送");
                    console.log('获取验证码成功, 收到的数据: ' + data);
                }).fail(function (xhr, status) {
                    console.log('获取验证码失败: ' + xhr.status + ', 原因: ' + status);
                });

            }
        },
        registerFormSubmit: function () {
            if (this.phoneWarning() && this.passwordWarning() &&
                this.validPasswordWarning() && this.validCodeWarning()) {
                var _this = this;
                var registerData = {
                    username: _this.phone,
                    password: _this.password
                };
                $.ajax(REGISTER_URL + '?code=' + _this.valid_code, {
                    method: 'POST',
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify(registerData)
                }).done(function (data) {
                    if (data === 'success') {
                        alert("注册成功");
                        $('#cover').remove();
                        $('script[src="js/register.js"]').remove();

                    } else {
                        alert("注册失败，请重新注册");
                    }
                    console.log('注册成功, 收到的数据: ' + data);
                }).fail(function (xhr, status) {
                    console.log('失败: ' + xhr.status + ', 原因: ' + status);
                });

            }

        }
    }
});