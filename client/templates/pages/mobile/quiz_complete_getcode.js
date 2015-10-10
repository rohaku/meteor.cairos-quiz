/**
 * Created by Jenny on 15/10/09.
 */

Template.quizCompleteGetCodeMobile.rendered = function(){
    if (Session.get("answerCode") && Session.get("referId")) {
        Meteor.startup(function () {
            var resultUrlCache = Router.current().params.hash;
            $("#rewardShareContainer").data("referId", Session.get("referId"));
            $("#answerCompleteCode").text(Session.get("answerCode"));
        });
    } else {
        Router.go('quiz.home');
    }
};


Template.quizCompleteGetCodeMobile.events({
    'click #shareUpBtn': function(){
        var resultUrlCache = Router.current().params.hash;
        var fbShareUserId = $("#rewardShareContainer").data("referId");

        Meteor.call("clickShareButton", resultUrlCache, fbShareUserId);

    }
});

