chrome.runtime.onMessage.addListener((REQ, SDR, RES) => {
    if(REQ.TXT)
    {
        const URL = 'data:text/plain;charset=utf-8,' + encodeURIComponent(REQ.TXT);
        chrome.downloads.download({
            url: URL,
            filename: `${REQ.TIT}.txt`,
            saveAs: false
        });
    }
});