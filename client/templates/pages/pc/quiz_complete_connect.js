/**
 * Created by Ciro on 15/9/21.
 */
Template.quizCompleteConnectPc.events({
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
                FB.login(function(loginRes){
                    if (loginRes.status === 'connected') {
                        var uid = loginRes.authResponse.userID;
                        var accessToken = loginRes.authResponse.accessToken;
                        console.log(loginRes);
                        console.log(uid);
                        console.log(accessToken);

                        Router.go('result.reward', {resultBranch: "share"});
                    }
                });
            }
        });
    }
});