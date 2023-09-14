

// 监听请求头信息
chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
        requestHeaders = JSON.stringify(details.requestHeaders);
        if(details.url ==="https://www.binance.com/bapi/composite/v2/private/account/user/current/profile/query"){
            chrome.storage.local.set({ "binance_url": details.url }, function() {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                } else {
                    console.log("Data saved to local storage:", details.url);
                }
            });

            chrome.storage.local.set({ "binance_method": details.method }, function() {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                } else {
                    console.log("Data saved to local storage:", details.url);
                }
            });

            chrome.storage.local.set({ "binance_header": requestHeaders }, function() {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                } else {
                    console.log("Data saved to local storage:", details.url);
                }
            });
        }
        console.log(`url:${details.url}, method:${details.method}`)
        console.log('Request Headers:', requestHeaders);
    },
    { urls: ["<all_urls>"] },
    ["requestHeaders"]
);


chrome.webRequest.onBeforeRequest.addListener(
    (subDetails) => {
        // requestHeaders = subDetails.requestHeaders;
        // console.log(`url:${subDetails.url}, method:${subDetails.method}`)
        // console.log('Request Headers:', requestHeaders);
        if (subDetails.requestBody && subDetails.requestBody.raw) {
            const rawBody = subDetails.requestBody.raw[0];
            if (rawBody && rawBody.bytes) {
                const byteArray = new Uint8Array(rawBody.bytes);
                const bodyText = new TextDecoder().decode(byteArray);
                console.log(`url:${subDetails.url}, method:${subDetails.method} Request Body: ${bodyText}`);
                if(subDetails.url ==="https://www.binance.com/bapi/composite/v2/private/account/user/current/profile/query"){
                    chrome.storage.local.set({ "binance_body": bodyText }, function() {
                        if (chrome.runtime.lastError) {
                            console.error(chrome.runtime.lastError);
                        } else {
                            console.log("Data saved to local storage:", bodyText);
                        }
                    });
                }
            }


        }
    },
    { urls: ["<all_urls>"] },
    ["requestBody"]
);


chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.action === 'getBackgroundData') {
        // 在这里获取或处理 background.js 中的数据
        const data1 = await chrome.storage.local.get(['binance_url']);
        const data2 = await chrome.storage.local.get(['binance_method']);
        const data3 = await chrome.storage.local.get(['binance_body']);
        const data4 = await chrome.storage.local.get(['binance_header']);
        const url = data1['binance_url'];
        const method = data2['binance_method'];
        const body = data3['binance_body'];
        const header = data4['binance_header'];
        console.log("url is " + url)
        console.log("method is " + method)
        console.log("body is " + body)
        console.log("header is " + header)
        // 将数据发送回前台页面
        // sendResponse({data: {url:url,method:method,header:header}});
        sendResponse({data: "test data"});
    }
});