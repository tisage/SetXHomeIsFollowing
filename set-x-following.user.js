// ==UserScript==
// @name         Set X Home to Following
// @namespace    https://github.com/tisage/SetXHomeIsFollowing
// @version      0.0.21
// @description  Automatically switch to the "Following" tab on X (Twitter).
// @author       Longmanmaxtor
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    let hasSwitched = false;

    const trySwitch = () => {
        if (hasSwitched || !window.location.pathname.includes('/home')) return;

        const tabs = document.querySelectorAll('div[role="tab"]');
        for (const tab of tabs) {
            const text = tab.innerText || "";
            if (text.includes('Following') || text.includes('正在关注')) {
                if (tab.getAttribute('aria-selected') === 'true') {
                    hasSwitched = true;
                    return;
                }
                tab.click();
                hasSwitched = true;
                console.log('[SetXHome] Switched to Following.');
                break;
            }
        }
    };

    const observer = new MutationObserver(() => {
        if (!hasSwitched) trySwitch();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // 处理单页应用路由跳转
    let lastUrl = location.href;
    setInterval(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            if (lastUrl.endsWith('/home')) {
                hasSwitched = false; 
            }
        }
    }, 1000);
})();