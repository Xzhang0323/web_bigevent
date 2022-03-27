// 使用ajaxPrefilter函数，拿到我们给ajax提供的配置对象，在每次调用$.ajax()、$.post()、$.get()时会提前先调用这个函数
$.ajaxPrefilter(function(options) {
    // 在发起真正的Ajax请求时，统一拼接路径
    options.url = 'http://127.0.0.1:3007' + options.url;
})