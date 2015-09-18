Template.SectionPageResultPc.events({
    'click div#startQuizBtn': function(event){
       Router.go('answer.do');
    },

    'click div#claimRewardBtn': function(event){
       Router.go('result.reward');
    }

});
Template.SectionPageResultPc.rendered = function(){

    var myAnswerResult = Session.get('quizAnswerResult');
    if(typeof(myAnswerResult) == "undefined"){
        Router.go('answer.do');
        return false;
    }

    //获取用户答题后的结果并分配显示
    Meteor.call("getAnswerResultRender", myAnswerResult);
};
