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
            }else{
                var accessToken = response.authResponse.accessToken;
                var httpParams = {};
                FB.api('/me', function(profile) {
                    httpParams = {
                        game: "cairos",
                        email: profile.email,
                        facebook_id: profile.id,
                        facebook_token: accessToken,
                        facebook_profile: profile,
                        resultBranch: "share",
                        paramHash:answerCache
                    };
                    Meteor.call("makeQuizCodeInfoByConnect", httpParams);
                });
            }
        });
    }
});
