/**
 StartUp Functions Can be edited here
 Created By Ciro
 */

//Handlebars注册全局Helper标签(全局模板变量判断客户端类型)
Handlebars.registerHelper('isMobile', function () {
    if (_deviceType.android || _deviceType.iPhone || _deviceType.iPad) {
        return true;
    } else {
        return false;
    }
});

var fbTrys = 0;
Session.set("fbSdkLoadStatue", false);
function ensureFBInit () {
    fbTrys++;
    if (fbTrys > 60) {
        console.log('[ensureFBInit] giving up');
        return;
    }
    if (typeof(FB) == 'undefined') {
        //console.log('[ensureFBInit] wating for FB to init...');
        setTimeout(ensureFBInit, 500);
        return;
    }
    if (!window.facebookInitStarted){
        window.fbAsyncInit();
    }
    Session.set("fbSdkLoadStatue", true);
}
Meteor.startup(function () {
    ensureFBInit();
});