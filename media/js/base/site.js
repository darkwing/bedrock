/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function () {
    'use strict';
    window.site = {
        getPlatform: function (ua, pf) {
            // Firefox OS navigator.platform is an empty string, which equates to a falsey value in JS
            // Ths means we must use an ugly ternary statement here to make testing easier.
            pf = (pf === '') ? '' : pf || navigator.platform;
            ua = ua || navigator.userAgent;

            if (/Win(16|9[x58]|NT( [1234]| 5\.0| [^0-9]|[^ -]|$))/.test(ua) ||
                    /Windows ([MC]E|9[x58]|3\.1|4\.10|NT( [1234]| 5\.0| [^0-9]|[^ ]|$))/.test(ua) ||
                    /Windows_95/.test(ua)) {
                /**
                 * Officially unsupported platforms are Windows 95, 98, ME, NT 4.x, 2000
                 * These regular expressions match:
                 *  - Win16
                 *  - Win9x
                 *  - Win95
                 *  - Win98
                 *  - WinNT (not followed by version or followed by version <= 5)
                 *  - Windows ME
                 *  - Windows CE
                 *  - Windows 9x
                 *  - Windows 95
                 *  - Windows 98
                 *  - Windows 3.1
                 *  - Windows 4.10
                 *  - Windows NT (not followed by version or followed by version <= 5)
                 *  - Windows_95
                 */
                return 'oldwin';
            }
            if (ua.indexOf("MSIE 6.0") !== -1 &&
                    ua.indexOf("Windows NT 5.1") !== -1 &&
                    ua.indexOf("SV1") === -1) {
                // Windows XP SP1
                return 'oldwin';
            }
            if (pf.indexOf("Win32") !== -1 ||
                    pf.indexOf("Win64") !== -1) {
                return 'windows';
            }
            if (/android/i.test(ua)) {
                return 'android';
            }
            if (/armv[6-7]l/.test(pf)) {
                return 'android';
            }
            if (pf.indexOf("Linux") !== -1) {
                return 'linux';
            }
            if (pf.indexOf("MacPPC") !== -1) {
                return 'oldmac';
            }
            if (/Mac OS X 10.[0-5]/.test(ua)) {
                return 'oldmac';
            }
            if (pf.indexOf('iPhone') !== -1 ||
                    pf.indexOf('iPad') !== -1 ||
                    pf.indexOf('iPod') !== -1 ) {
                return 'ios';
            }
            if (ua.indexOf("Mac OS X") !== -1) {
                return 'osx';
            }
            if (ua.indexOf("MSIE 5.2") !== -1) {
                return 'oldmac';
            }
            if (pf.indexOf("Mac") !== -1) {
                return 'oldmac';
            }
            if (pf === '' &&
                    /Firefox/.test(ua) &&
                    /Mobile|Tablet/.test(ua) &&
                    !(/Android/.test(ua))) {
                return 'fxos';
            }

            return 'other';
        },
        platform: 'other'
    };
    (function () {
        // if other than 'windows', immediately replace the platform classname on the html-element
        // to avoid lots of flickering
        var h = document.documentElement;
        window.site.platform = window.site.getPlatform();
        if (window.site.platform !== 'windows') {
            h.className = h.className.replace("windows", window.site.platform);
        }
        // Add class to reflect javascript availability for CSS
        h.className = h.className.replace(/\bno-js\b/, 'js');
    })();

    // Read cookies
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }

            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }

        return null;
    }

    // Add class if MWC cookie is true
    if (readCookie('seen_mwc2014') === 'true') {
        document.documentElement.className += ' mwc2014';
    }
})();
