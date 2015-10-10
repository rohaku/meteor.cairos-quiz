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
         }, {scope: 'public_profile,email'});
    }

});
Template.SectionPageResultMobile.rendered = function(){
    try{
        //获取用户答题后的结果并分配显示
        Meteor.call("makeResultRender");
    }catch(e){
        Router.go('answer.do');
    }
};
