/**
 * Created by Ciro on 15/9/21.
 */
Template.quizCompleteGetCodePc.rendered = function () {
    if (Session.get("answerCode") && Session.get("referId")) {
        Meteor.startup(function () {
            var resultUrlCache = Router.current().params.hash;
            $("#rewardShareContainer").data("referId", Session.get("referId"));
            $("#answerCompleteCode").text(Session.get("answerCode"));
            //FB.getLoginStatus(function (response) {
            //
            //    if (response.status == "connected") {
            //        console.log(response);
            //
            //    } else {
            //        Router.go('result.reward', {resultBranch: "connect"}, {hash: resultUrlCache});
            //    }
            //}, {scope: 'public_profile,email'});
        });
    } else {
        Router.go('quiz.home');
    }
};

Template.quizCompleteGetCodePc.events({
    'click #shareUpBtn': function () {
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


