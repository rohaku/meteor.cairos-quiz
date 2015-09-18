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
        //(function(d, s, id) {
        //    var js, fjs = d.getElementsByTagName(s)[0];
        //    if (d.getElementById(id)) return;
        //    js = d.createElement(s); js.id = id;
        //    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
        //    fjs.parentNode.insertBefore(js, fjs);
        //}(document, 'script', 'facebook-jssdk'));

        if( _deviceType.android || _deviceType.iPhone || _deviceType.iPad){
            $("head").append('<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui">');
            $("head").append('<meta name="viewport" content="width=750,target-densitydpi=320,user-scalable=no"/>');
        }
    });

    UI.registerHelper('isFBLoaded', function() {
        return Session.get("fbSdkLoadStatue");
    });

    UI.registerHelper('showConnectContent', function() {
        FB.getLoginStatus(function(response){

            console.log(response.status);
            if (response.status === 'connected') {
                //$("#rewardConnectContainer").remove();
                $("#rewardShareContainer").removeClass("hide");
            }else{
                console.log(template.find("#rewardConnectContainer").size());
                //$("#rewardShareContainer").remove();
                $("#rewardConnectContainer").removeClass("hide");
            }
        });
    });

    UI.registerHelper('logOutFB', function() {
        FB.getLoginStatus(function(response){
            if (response.status === 'connected') {
                FB.logout();
                console.log("FB account has been logout");
            }
        });
    });
}