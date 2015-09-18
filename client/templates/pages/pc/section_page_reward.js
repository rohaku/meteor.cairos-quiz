/**
 * Created by Ciro on 15/9/18.
 */
Template.SectionPageRewardPc.events({
    'click div#connectBtn': function (event) {
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                console.log('Logged in.');
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;

                console.log(uid);
                console.log(accessToken);

            } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook,
                // but has not authenticated your app
            } else {
                FB.login();
            }
        });
    }
});


Template.SectionPageRewardPc.rendered = function(){
    try {
        FB.XFBML.parse();
    }catch(e) {
    }
};