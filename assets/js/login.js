$(function() {
    // 点击注册账号的链接
    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    })

    // 点击登录链接
    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    })

    // 获取表单数据进行验证
    var form = layui.form;
    var layer = layui.layer;
    // 自定义密码校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格！'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次密码不一致，请重新输入！"
            }
        }
    })

    // 监听注册表单的提交事件
    $("#form_reg").on("submit", function(e) {
            e.preventDefault();
            var data = {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！');
                $("#link_login").click();
            })
        })
        // 监听登录表单的提交事件
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})