/**
 * Created by Ciro on 15/9/14.
 */
_deviceType = new Object();
if(Meteor.isClient) {
    (function (w) {
        var browserCheck = function () {
            this.app = navigator.appVersion;
        };

        browserCheck.prototype = {
            ver: function () {
                var u = navigator.userAgent;
                //console.log(u);
                return {
                    //移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    //mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/(i[^;]+;( U;))? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, // || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                }
            },
            lan: (navigator.browserLanguage || navigator.language).toLowerCase()
        };

        w.platFormTp = browserCheck;


    })(window);

    var _thisPlatForm = new platFormTp();
    _.extend(_deviceType, _thisPlatForm.ver());
}