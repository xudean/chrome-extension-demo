(function () {
    // 创建一个 div 元素并设置其样式
    var div = document.createElement('div');
    div.id = 'pado-dev'
    div.style.position = 'fixed';
    div.style.width = '400px';
    div.style.height = '300px';
    div.style.bottom = '0';
    div.style.right = '0';
    div.style.backgroundColor = 'gray';
    div.style.color = 'white';
    div.style.cursor = 'move';

    // 设置 div 元素的内容
    div.innerHTML = '<button>开始计算</button>';

    // 将 div 元素添加到页面的 body 中
    document.body.appendChild(div);

    // 使 div 元素可拖动
    var isDragging = false;
    var offsetX, offsetY;

    div.addEventListener('mousedown', function (e) {
        isDragging = true;
        offsetX = e.clientX - div.getBoundingClientRect().left;
        offsetY = e.clientY - div.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            div.style.left = (e.clientX - offsetX) + 'px';
            div.style.top = (e.clientY - offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });

    alert('注入完成');

})();
