/**
 * Created by Ciro on 15/9/25.
 */
Template.quizButton.events({
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

        FB.getLoginStatus(function (response) {
            if (response.status !== 'connected') {
                FB.login(function(loginRes){
                    if (loginRes.status === 'connected') {
                        var accessToken = loginRes.authResponse.accessToken;
                        getCodeByConnect(accessToken);
                    }
                }, {scope: 'public_profile,email'});
            }else{
                var accessToken = response.authResponse.accessToken;
                getCodeByConnect(accessToken);
            }
        });
    },


    'click div#connectShareQuizCode' : function(){
        var urlHashB64 = Router.current().params.hash;
        var urlHash = Base64.decode(urlHashB64);
        var quizReferId = urlHash.split(_URL_SPLIT_WORDS_)[0];

        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                //Router.go('firstclaim.giftcode', {},{hash: urlHash});
                Meteor.call("makeFriendQuizCodeInfo", quizReferId);
            } else {
                FB.login(function(loginRes){
                    if (loginRes.status === 'connected') {
                        var uid = loginRes.authResponse.userID;
                        var accessToken = loginRes.authResponse.accessToken;
                        console.log(loginRes);
                        console.log(uid);
                        console.log(accessToken);
                        Meteor.call("makeFriendQuizCodeInfo", quizReferId);
                        //Router.go('firstclaim.giftcode', {},{hash: urlHashB64});
                    }
                }, {scope: 'public_profile, email'});
            }
        });
    }
});