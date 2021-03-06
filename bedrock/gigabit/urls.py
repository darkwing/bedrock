# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

from django.conf.urls import patterns
from bedrock.mozorg.util import page

urlpatterns = patterns('',
    page('', 'gigabit/gigabit.html'),
    page('apply', 'gigabit/apply.html'),
    page('terms', 'gigabit/terms.html')
)
