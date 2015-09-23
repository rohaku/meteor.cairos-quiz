/**
 * Created by Ciro on 15/9/21.
 */
Template.quizCompleteGetCodePc.rendered = function(){
    Meteor.startup(function(){
        FB.getLoginStatus(function(response){
            if(response.status == "connected"){
                console.log(HTTP);
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                console.log(uid);
                console.log(accessToken);

                Meteor.call("makeShareCodeInfo");
            }else{
                Router.go('result.reward', {resultBranch: "connect"});
            }
        });
    });
};

Template.quizCompleteGetCodePc.events({
    'click #shareUpBtn': function(){
        var shareContext = {
            method: 'share',
            //href: 'http://121.40.55.65/default.html'
            href: 'http://cairos-quiz.lab.fedeen.com/reward/connect'
        };
        console.log(shareContext);

        FB.ui(shareContext, function(response){
            console.log(response)
        });
    }
});

/**
 <meta property="fb:app_id" content="403815316453300" />
 <meta property="og:image"  content="http://s3-us-west-1.amazonaws.com/forsaken-world/images/fb_share.jpg" />
 <meta property="og:title"  content="Win a FREE gift in Forsaken World Mobile!" />
 <meta property="og:description"  content="Want a Forsaken World Mobile gift code? How about a fun quiz →" />
 <meta property="og:type"   content="website" />


 */


