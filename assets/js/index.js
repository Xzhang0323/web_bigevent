$(function() {
    getUserInfo();

    var layer = layui.layer;
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败！")
            }
            renderAvatar(res.data);
        }
    })
}

// 将用户信息渲染到页面上
function renderAvatar(user) {
    var uname = user.nickname || user.username;
    $("#welcome").html(uname);
    // 如果用户头像不为空，则渲染图片；为空，则渲染文本头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        var first = uname[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}