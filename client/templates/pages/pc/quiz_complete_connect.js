/**
 * Created by Ciro on 15/9/21.
 */
Template.quizCompleteConnectPc.events({
    'click div#connectBtn': function (event) {
        var answerCache = Router.current().params.hash;

        var getCodeByConnect = function(token){
            var httpParams = {};
            FB.api('/me', function(profile) {
                httpParams = {
                    game: "cairos",
                    email: profile.email,
                    facebook_id: profile.id,
                    facebook_token: token,
                    facebook_profile: profile,
                    resultBranch: "share",
                    paramHash:answerCache
                };
                Meteor.call("makeQuizCodeInfoByConnect", httpParams);
            });
        };

        FB.login(function (response) {
            if (response.status === 'connected') {
                var accessToken = response.authResponse.accessToken;
                getCodeByConnect(accessToken);
            }

        }, {scope: 'public_profile, email'});
    }
});
