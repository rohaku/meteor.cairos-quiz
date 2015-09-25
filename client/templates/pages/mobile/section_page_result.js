Template.SectionPageResultMobile.events({
    'click div#startQuizBtn': function(event){
       Router.go('answer.do');
    },

     'click div#claimRewardBtn': function(event){
         FB.getLoginStatus(function(response){
             if (response.status === 'connected') {
                 Router.go('result.reward', {resultBranch: "share"});
             }else{
                 Router.go('result.reward', {resultBranch: "connect"});
             }
         });
     }

});
Template.SectionPageResultMobile.rendered = function(){

    var myAnswerResult = Session.get('quizAnswerResult');
    if(typeof(myAnswerResult) == "undefined"){
        Router.go('answer.do');
        return false;
    }

    //获取用户答题后的结果并分配显示
    Meteor.call("makeResultRender", myAnswerResult);
};