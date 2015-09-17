/**
 * Created by Ciro on 15/9/14.
 */
if (Meteor.isServer) {
    Meteor.startup(function () {
        _HTTP_REQUEST_URLS_ = {
            '_TEST_URL_': 'http://jsonplaceholder.typicode.com/posts'
        };
    });
}

if(Meteor.isClient){
    Meteor.startup(function () {

        if( _deviceType.android || _deviceType.iPhone || _deviceType.iPad){
            $("head").append('<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui">');
            $("head").append('<meta name="viewport" content="width=750,target-densitydpi=320,user-scalable=no"/>');
        }
    });
}