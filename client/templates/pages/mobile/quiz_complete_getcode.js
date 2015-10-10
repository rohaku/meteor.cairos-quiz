Template.quizCompleteGetCodeMobile.rendered = function(){
    Meteor.startup(function(){
        var resultUrlCache = Router.current().params.hash;
        FB.getLoginStatus(function(response){
            if(response.status == "connected"){
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                console.log(response);


                var httpParams = {};
                FB.api('/me', function(profile) {
                    //callback(response);
                    httpParams = {
                        game: "cairos",
                        email: profile.email,
                        facebook_id: profile.id,
                        facebook_token: accessToken,
                        facebook_profile: profile
                    };
                    Meteor.call("makeQuizCodeInfo", httpParams);
                });

            }else{
                Router.go('result.reward', {resultBranch: "connect"}, {hash: resultUrlCache});
            }
        }, {scope: 'public_profile,email'});
    });
};

Template.quizCompleteGetCodeMobile.events({
    'click #shareUpBtn': function(){
        var resultUrlCache = Router.current().params.hash;
        var fbShareUserId = $("#rewardShareContainer").data("referId");

        Meteor.call("clickShareButton", resultUrlCache, fbShareUserId);

    }
});
