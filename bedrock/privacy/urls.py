# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

from django.conf.urls import patterns, url

from bedrock.mozorg.util import page
from bedrock.privacy import views

urlpatterns = patterns('',
    url(r'^/$', views.privacy, name='privacy'),
    page('/you', 'privacy/privacy-day.html'),
    page('/online-data-tools', 'privacy/online-data-tools.html'),
    page('/principles', 'privacy/principles.html'),
    page('/firefox', 'privacy/firefox/notice.html'),
    page('/firefox/third-party', 'privacy/firefox/third-party.html'),
    page('/firefox-os', 'privacy/firefox-os/notice.html'),
    page('/thunderbird', 'privacy/thunderbird/notice.html'),
    page('/websites', 'privacy/websites/notice.html'),
    url(r'^/facebook/$', views.facebook, name='privacy/facebook'),
)
