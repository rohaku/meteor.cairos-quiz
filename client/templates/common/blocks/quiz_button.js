/**
 * Created by Ciro on 15/9/25.
 */
Template.quizButton.events({
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
    },
    'click div#connectShareQuizCode' : function(){
        var urlHashB64 = Router.current().params.hash;
        var urlHash = Base64.decode(urlHashB64);
        var quizReferId = urlHash.split(_URL_SPLIT_WORDS_)[0];

        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                //Router.go('firstclaim.giftcode', {},{hash: urlHash});
                Meteor.call("makeFriendQuizCodeInfo", quizReferId);
                console.log(urlHash);
            } else {
                FB.login(function(loginRes){
                    if (loginRes.status === 'connected') {
                        var uid = loginRes.authResponse.userID;
                        var accessToken = loginRes.authResponse.accessToken;
                        console.log(loginRes);
                        console.log(uid);
                        console.log(accessToken);

                        Router.go('firstclaim.giftcode', {},{hash: urlHash});
                    }
                }, {scope: 'public_profile, email'});
            }
        });
    }
});