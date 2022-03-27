$(function() {
    var form = layui.form;
    var layer = layui.layer;

    // 对表单信息进行验证
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度须在1~6个字符之间！';
            }
        }
    })
    initUserInfo();

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！');
                }
                console.log(res.data);
                form.val('formUserInfo', res.data);
                // $(".cropper-box img").attr('src', res.data.user_pic)
                // $(".cropper-canvas img").attr('src', res.data.user_pic)
            }
        })
    }

    // 重置表单数据
    $("#btnReset").on("click", function(e) {
        e.preventDefault();
        initUserInfo();
    });

    // 监听表单的提交数据
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！');
                }
                layer.msg('更新用户信息成功！');
                window.parent.getUserInfo();
            }
        })
    });
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    };

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })

    // 为文件选择框绑定 change 事件
    $('#file').on('change', function(e) {
        // 获取用户选择的文件
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0];
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file);
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域
    })

    // 为确定按钮，绑定点击事件
    $('#btnUpload').on('click', function() {
        // 1. 要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2. 调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUserInfo()
            }
        })
    })
})