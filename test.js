document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('page').addEventListener('click', function () {
        newPage();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('request').addEventListener('click', function () {
        request().then(r => {});
    });
});


function newPage() {
    chrome.tabs.create({url: 'https://www.binance.com/zh-CN/my/dashboard'}, function (tab) {
        var tabId = tab.id;
        alert('新标签页的tabId为：'+ tabId);
        // 监听标签页状态，确保标签页加载完成后再执行注入操作
        chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo) {
            if (updatedTabId === tabId && changeInfo.status === 'complete') {
                chrome.scripting
                    .executeScript({
                        target : {tabId : tabId},
                        files : [ "inject.js" ],
                    })
                    .then(() => console.log("script injected"));

                // 移除监听器，以免重复执行代码
                chrome.tabs.onUpdated.removeListener(listener);
            }
        });
    });

}


async function request() {
    const data1 = await chrome.storage.local.get(['binance_url']);
    const data2 = await chrome.storage.local.get(['binance_method']);
    const data3 = await chrome.storage.local.get(['binance_body']);
    const data4 = await chrome.storage.local.get(['binance_header']);
    const url = data1['binance_url'];
    const method = data2['binance_method'];
    const body = data3['binance_body'];
    const header = data4['binance_header'];

    alert("request")
    sendRequest(url, method, body, JSON.parse(header), function(response) {
        // 处理响应数据
        alert('Received response:'+ response);
    },function(response) {
        // 处理响应数据
        alert('Error response:'+ response);
    });
}
function sendRequest(url, method, body, headers, successCallback, errorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // 请求成功，执行成功回调并传递响应数据
                successCallback(xhr.responseText);
            } else {
                // 请求失败，执行错误回调并传递错误信息
                errorCallback('Request failed with status: ' + xhr.status);
            }
        }
    };
    xhr.onerror = function() {
        // 发生网络错误，执行错误回调并传递错误信息
        errorCallback('Network error occurred');
    };
    xhr.open(method, url, true);

    // 设置请求头
    for (var i = 0; i < headers.length; i++) {
        xhr.setRequestHeader(headers[i].name, headers[i].value);
    }

    xhr.send(body); // 发送请求主体
}
