// ==UserScript==
// @name         YouTube Speed Control with Keys
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Control YouTube speed with Shift + ArrowUp/ArrowDown
// @author       Harshjeet Kumar
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('keydown', function(e) {
        if (e.shiftKey) {
            const video = document.querySelector('video');
            if (!video) return;

            if (e.code === 'ArrowUp') {
                video.playbackRate = Math.min(video.playbackRate + 0.25, 4.0);
                showSpeedNotification(video.playbackRate);
                e.preventDefault();
            } else if (e.code === 'ArrowDown') {
                video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25);
                showSpeedNotification(video.playbackRate);
                e.preventDefault();
            }
        }
    });

    function showSpeedNotification(speed) {
        let notice = document.getElementById('yt-speed-notice');
        if (!notice) {
            notice = document.createElement('div');
            notice.id = 'yt-speed-notice';
            notice.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 9999;
                font-size: 16px;
                pointer-events: none;
                transition: opacity 1s ease;
            `;
            document.body.appendChild(notice);
        }

        notice.textContent = `Speed: ${speed.toFixed(2)}x`;
        notice.style.opacity = '1';

        clearTimeout(notice.timer);
        notice.timer = setTimeout(() => {
            notice.style.opacity = '0';
        }, 1000);
    }
})();