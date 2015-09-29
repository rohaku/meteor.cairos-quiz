/**
 * Created by Ciro on 15/9/14.
 */

if (Meteor.isServer) {
    _SERVICE_URL_ = "";
    Meteor.startup(function () {

        _HTTP_REQUEST_URLS_ = {
            _TEST_URL_: 'http://10.241.32.42:5000/',            //TEST
            _PRODUCTION_URL_: 'http://coupon-master.staging.fedeen.com/',       //PRODUCTION
            _DEVELOPMENT_URL_: 'http://coupon-master.lab.fedeen.com/'           //DEVELOPMENT
        };

        if(_ENV_ == 'production') {
            _SERVICE_URL_ = _HTTP_REQUEST_URLS_._PRODUCTION_URL_;
        }else{
            _SERVICE_URL_ = _HTTP_REQUEST_URLS_._PRODUCTION_URL_;
        }

    });
}

if (Meteor.isClient) {
    Meteor.startup(function () {
        //If not use package do follow codes.
        //(function(d, s, id) {
        //    var js, fjs = d.getElementsByTagName(s)[0];
        //    if (d.getElementById(id)) return;
        //    js = d.createElement(s); js.id = id;
        //    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
        //    fjs.parentNode.insertBefore(js, fjs);
        //}(document, 'script', 'facebook-jssdk'));

        if (_deviceType.android || _deviceType.iPhone || _deviceType.iPad) {
            $("head").append('<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui">');
            $("head").append('<meta name="viewport" content="width=750,target-densitydpi=320,user-scalable=no"/>');
        }

        /**
         * 模板层公共方法helper定义
         */
        UI.registerHelper("isFBLoaded", function () {
            return Session.get("isFBLoaded");
        });
    });
}
