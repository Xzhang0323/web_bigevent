// 使用ajaxPrefilter函数，拿到我们给ajax提供的配置对象，在每次调用$.ajax()、$.post()、$.get()时会提前先调用这个函数
$.ajaxPrefilter(function(options) {
    // 在发起真正的Ajax请求时，统一拼接路径
    options.url = 'http://127.0.0.1:3007' + options.url;

    // 统一为有权限的接口，设置header请求头
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }

    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token');
            // 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})