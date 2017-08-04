/* global geolocator, $ */

(function () {

    function config() {
        geolocator.config({
            language: $('#cmb-config-lang').val(),
            https: $('#chk-config-https').is(':checked'),
            google: {
                version: $('#txt-config-gversion').val(),
                key: $('#txt-config-gk').val() || '' // YOUR-GOOGLE-API-KEY
            }
        });
    }

    var apis = {
        geocode: function (callback) {
            var options = {
                address: $('#txt-geocode-address').val(),
                map: 'map-canvas',
                staticMap: false
            };
            geolocator.geocode(options, callback);
        }
    };

    $(document).ready(function () {

        var currentAPI = 'geocode',
            menuBtns = $('#btn-menu .btn'),
            panels = $('.menu-panel'),
            btnExec = $('#btn-exec'),
            mapCanvas = $('#map-canvas');

        menuBtns.on('click', function () {
            var btn = $(this);

            btnExec.text(btn.attr('data-caption'));
        });
        menuBtns.eq(0).trigger('click');

        btnExec.on('click', function () {
            var btn = $(this),
                caption = btn.text();
            btn.attr('disabled', 'disabled');
            btn.text('Requesting... Please wait...');
            console.log('——————————————————————————————');
            console.info('geolocator.' + currentAPI + '() called...');
            config();
            apis[currentAPI](function (err, result) {
                btn.removeAttr('disabled');
                btn.text(caption);
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('result =', result);
                if (result.map && result.map.instance) {
                    mapCanvas.show();
                }
            });
        });

        // ---------------------------
        // UI CONTROLS
        // ---------------------------

        $.fn.bootstrapSwitch.defaults.size = 'medium';
        $.fn.bootstrapSwitch.defaults.onColor = 'primary';
        $.fn.bootstrapSwitch.defaults.offColor = '#ecf0f1';
        $("input[type='checkbox']").bootstrapSwitch({ // eslint-disable-line
            labelWidth: 25,
            handleWidth: 25
        });
        $('.bootstrap-switch-label').html('|||');

        $('[data-toggle="tooltip"]').tooltip({
            container: 'body',
            placement: 'top'
        });

        function requireHttps(win) {
            return win ? win.location.protocol.toLowerCase() !== 'https:' : false;
        }

        if (requireHttps(window) || requireHttps(window.top)) {
            $('#alert-https').removeClass('hidden').fadeIn();
        }

    });

})();
