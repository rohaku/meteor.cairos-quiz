/**
 * Created by Ciro on 15/9/18.
 */

window.fbAsyncInit = function() {
    //FB.init({
    //    appId      : '1494613100852445',
    //    xfbml      : true,
    //    version    : 'v2.4'
    //});

    // PRETTY USELESS ACTUALLY for mobile
    // fb login won't work on ios devices with local app id due to some strange cordova bugs
    // so it works only for in-browser development purposes
    var appId, urls = ['http://quiz.cairostale.fedeen.com', 'http://192.168.1.1'];
    appId = Meteor.faceBookUtil.cnst.fbAppIdDevelop;
    urls.forEach(function (url) {
        if (Meteor.absoluteUrl().substr(0, url.length) == url)
            appId = Meteor.util.cnst.fbAppIdProduction;
    });
    console.log('[window.fbAsyncInit] running with appId ' + appId);
    window.facebookInitStarted = true;
    FB.init({
        appId      : appId,
        xfbml     : true,
        version      : 'v2.4'
    });
    FB.getLoginStatus(function(response){
        window.facebookInited = true;
        Session.set("isFBLoaded", true);
        console.log("FB is defined");
    });
};


