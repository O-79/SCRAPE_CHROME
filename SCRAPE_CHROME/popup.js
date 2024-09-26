document.getElementById('RUN').addEventListener('click', E => {
    chrome.tabs.query({active: true, currentWindow: true}, (TAB_LST) => {
        chrome.scripting.executeScript({
            target: {tabId: TAB_LST[0].id},
            func: SCRAPE,
            args: [TAB_LST[0].title]
        });
    });
});

function SCRAPE(TIT)
{
    TIT = TIT.replace(/[\/\\:*?"<>| ]/g, '_');
    const NOW = new Date();
    TIT = TIT + 
    `_${NOW.getFullYear()}` +
    `${(NOW.getMonth() + 1).toString().padStart(2, '0')}` +
    `${NOW.getDate().toString().padStart(2, '0')}` +
    `${NOW.getHours().toString().padStart(2, '0')}` +
    `${NOW.getMinutes().toString().padStart(2, '0')}` +
    `${NOW.getSeconds().toString().padStart(2, '0')}`;

    const DOM_LST = document.querySelectorAll('*');

    let TXT_LST = [];

    DOM_LST.forEach(E => {
        const E_TXT = E.innerText;
        if(E_TXT)
            TXT_LST.push(E_TXT.trim());
    });

    const TXT = TXT_LST.join('\n');

    console.log('====== SCRAPE START ======');
    console.log(TXT);
    console.log('====== SCRAPE  END  ======');

    chrome.runtime.sendMessage({TXT: TXT, TIT: TIT});
}