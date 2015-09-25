/**
 * Created by Ciro on 15/9/21.
 */
Template.quizCompleteGetCodePc.rendered = function(){
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
        });
    });
};

Template.quizCompleteGetCodePc.events({
    'click #shareUpBtn': function(){
        var resultUrlCache = Router.current().params.hash;
        var fbShareUserId = $("#rewardShareContainer").data("referId");

        Meteor.call("clickShareButton", resultUrlCache, fbShareUserId);

    }
});

/**
 <meta property="fb:app_id" content="403815316453300" />
 <meta property="og:image"  content="http://s3-us-west-1.amazonaws.com/forsaken-world/images/fb_share.jpg" />
 <meta property="og:title"  content="Win a FREE gift in Forsaken World Mobile!" />
 <meta property="og:description"  content="Want a Forsaken World Mobile gift code? How about a fun quiz →" />
 <meta property="og:type"   content="website" />


 */


