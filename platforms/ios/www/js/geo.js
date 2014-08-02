    var watchID = null;

    // device APIs are available
    //
    function locateMe() {
        // Throw an error if no update is received every 30 seconds
        var options = { timeout: 30000 };
        watchID = navigator.geolocation.watchPosition(onGeoSuccess, onGeoError, options);
    }

    // onSuccess Geolocation
    //
    function onGeoSuccess(position) {
        var element = $('#geolocation');
        element.html('Latitude: '  + position.coords.latitude      + '<br />' +
                     'Longitude: ' + position.coords.longitude);
    }

        // onError Callback receives a PositionError object
        //
        function onGeoError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
