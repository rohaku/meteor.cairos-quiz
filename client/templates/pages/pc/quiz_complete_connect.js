/**
 * Created by Ciro on 15/9/21.
 */
Template.quizCompleteConnectPc.events({
    'click div#connectBtn': function (event) {
        var answerCache = Router.current().params.hash;

        FB.getLoginStatus(function (response) {
            if (response.status !== 'connected') {
                FB.login(function(loginRes){
                    if (loginRes.status === 'connected') {
                        var uid = loginRes.authResponse.userID;
                        var accessToken = loginRes.authResponse.accessToken;

                        Router.go('result.reward', {resultBranch: "share"}, {hash: answerCache});
                    }
                }, {scope: 'public_profile,email'});
            }
        });
    }
});
