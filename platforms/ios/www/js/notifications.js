var pushNotification;

document.addEventListener("deviceready",onNotifyDeviceReady,false);

// device APIs are available
//
function onNotifyDeviceReady() {
    pushNotification = window.plugins.pushNotification;
}

