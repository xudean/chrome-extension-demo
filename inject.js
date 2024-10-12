// (function () {
//     // 创建一个 div 元素并设置其样式
//     var div = document.createElement('div');
//     div.id = 'pado-dev'
//     div.style.position = 'fixed';
//     div.style.width = '400px';
//     div.style.height = '300px';
//     div.style.bottom = '0';
//     div.style.right = '0';
//     div.style.backgroundColor = 'gray';
//     div.style.color = 'white';
//     div.style.cursor = 'move';
//
//     // 设置 div 元素的内容
//     div.innerHTML = '<button>开始计算</button>';
//
//     // 将 div 元素添加到页面的 body 中
//     document.body.appendChild(div);
//
//     // 使 div 元素可拖动
//     var isDragging = false;
//     var offsetX, offsetY;
//
//     div.addEventListener('mousedown', function (e) {
//         isDragging = true;
//         offsetX = e.clientX - div.getBoundingClientRect().left;
//         offsetY = e.clientY - div.getBoundingClientRect().top;
//     });
//
//     document.addEventListener('mousemove', function (e) {
//         if (isDragging) {
//             div.style.left = (e.clientX - offsetX) + 'px';
//             div.style.top = (e.clientY - offsetY) + 'px';
//         }
//     });
//
//     document.addEventListener('mouseup', function () {
//         isDragging = false;
//     });
//
//     alert('注入完成');
//
// })();


(function () {
    alert('注入完成');
    // 创建一个 div 元素并设置其样式
    window.addEventListener('load', () => {
        const listItems = document.querySelectorAll('.a-pagination li');

        // 检查是否成功获取到 li 元素
        if (listItems.length > 0) {
            listItems.forEach(li => {
                const link = li.querySelector('a');
                if (link) {
                    console.log(`Text: ${li.textContent.trim()}, Href: ${link.href}`);
                } else {
                    console.log(`Text: ${li.textContent.trim()}`);
                }
            });
        } else {
            console.log('没有找到任何 li 元素。');
        }
        // //获取orderId
        // const orderIdSpan = document.querySelectorAll('.yohtmlc-order-id span')[1];
        // const orderId = orderIdSpan.textContent.trim();
        const allOrderCard = document.querySelectorAll(".js-order-card");
        allOrderCard.forEach(card => {
            const elements = card.querySelectorAll(".a-size-base.a-color-secondary");
            const date = elements[0].textContent;
            const total = elements[1].textContent;
            const orderIdSpan = card.querySelectorAll('.yohtmlc-order-id span')[1];
            const orderId = orderIdSpan.textContent.trim();
            const title = card.querySelectorAll('.yohtmlc-product-title')[0].textContent;
            console.log(`orderId is: ${orderId}, title is: ${title}, date is: ${date}, total is: ${total}`);
        });
        const userId =document.getElementById("nav-link-accountList-nav-line-1");
        console.log("UserId:"+userId.textContent)

        const orderDateSpan = document.querySelectorAll('.a-box-group a-spacing-base .a-size-base a-color-secondary')[0];
        const orderDate = orderDateSpan.textContent.trim();
        console.log(`orderDate is: ${orderDate}`)
    });
})();

