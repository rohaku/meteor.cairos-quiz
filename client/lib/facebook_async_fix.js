/**
 * Created by Ciro on 15/9/18.
 */

window.fbAsyncInit = function() {
    // PRETTY USELESS ACTUALLY for mobile
    // fb login won't work on ios devices with local app id due to some strange cordova bugs
    // so it works only for in-browser development purposes

    //console.log('[window.fbAsyncInit] running with appId ' + FB_DEVELOPER_INFO.FB_APP_ID);

    window.facebookInitStarted = true;
    FB.init({
        appId      : FB_DEVELOPER_INFO.FB_APP_ID,
        xfbml      : true,
        version    : 'v2.3'
    });
    FB.getLoginStatus(function(response){
        window.facebookInited = true;
        Session.set("isFBLoaded", true);
        //console.log("FB is defined");
    });
};


