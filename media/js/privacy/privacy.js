/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/*global $:true, isDoNotTrackEnabled:true */
$(function() {
    "use strict";

    // Detects whether do not track is enabled and takes one of two possible actions:
    // 1. If an element with the id #dnt-enabled exists it will
    // 1.1 if positive, set the element text to the positive message text below
    // 1.2 if negative, set the element text to the negative message text and, change
    //     the class of the element to button insensitive instead of the default of button
    // 2. If an element with the id #dnt-enabled does not exist, the function will simply
    //    either return true or false.
    function setDoNotTrackStatus() {
        var enabled = window.navigator.doNotTrack === "yes",
        dntEnabledButton = document.getElementById("dnt-enabled"),
        msgText = enabled ? document.createTextNode("Do Not Track Is On »") : document.createTextNode("Do Not Track Is Off »");

        if(enabled) {
            if(dntEnabledButton) {
                dntEnabledButton.appendChild(msgText);
            } else {
                return true;
            }
        } else {
            if(dntEnabledButton) {
                dntEnabledButton.appendChild(msgText);
                dntEnabledButton.setAttribute("class", "button insensitive");
            } else {
                return false;
            }
        }
    }

    setDoNotTrackStatus();

    // Accordion widgets in the highlight box
    $('#main-content [role="tablist"]').each(function() {
        var panel_open_text = window.trans('tabpanel-open-text');
        var panel_close_text = window.trans('tabpanel-close-text');

        if (navigator.userAgent.match(/MSIE\s[6-7]\./)) {
            // IE6: attribute selectors are not supported
            // IE7: buggy behavior and layout
            return;
        }

        $(this).find('[role="tab"]').each(function() {
            var expanded = false;
            var $tab = $(this).attr({
              'tabindex': '-1',
              'aria-controls': this.id.replace(/^tab/, 'tabpanel'),
              'aria-expaned': 'false'
            });
            var $panel = $('#' + $(this).attr('aria-controls')).attr({
              'tabindex': '-1',
              'aria-hidden': 'true'
            });
            var $anchor = $('<a href="#" role="button">' + panel_open_text + '</a>');

            $tab.on('click', function (event) {
                event.preventDefault();
                expanded = !expanded;
                $tab.attr('aria-expaned', expanded);
                $panel.attr('aria-hidden', !expanded);
                $anchor.text((expanded) ? panel_close_text : panel_open_text);
            });

            $anchor.on('click', function (event) {
                event.preventDefault();
            }).appendTo(($tab.find(':last-child').length) ? $tab.find(':last-child') : $tab);
        });
    });

    // Open the panel automatically for the Firefox in-product links in the
    // Preferences window > Advanced > Data Choices. Those are #telemetry,
    // #health-report and #crash-reporter.
    if (location.hash && $(location.hash)) {
      $('#tab-' + location.hash.substr(1)).trigger('click');
    } 
});
