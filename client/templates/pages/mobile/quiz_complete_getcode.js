/**
 * Created by Jenny on 15/10/09.
 */

Template.quizCompleteGetCodeMobile.rendered = function(){
    //第一层条件，如果没有获取过code直接返回首页
    if (Session.get("answerCode") && Session.get("referId")) {
        Meteor.startup(function () {
            var resultUrlCache = Router.current().params.hash;
            $("#rewardShareContainer").data("referId", Session.get("referId"));
            $("#answerCompleteCode").text(Session.get("answerCode"));
            //第二层条件，如果没有登录或授权则返回connect路由(一般不会直接进入)
            FB.getLoginStatus(function (response) {
                if (response.status !== "connected") {
                    Router.go('result.reward', {resultBranch: "connect"}, {hash: resultUrlCache});
                }
            });
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

