Template.SectionPageResultMobile.events({

    'click div#claimRewardBtn': function(event){
        var routerHash = $("#resultHashCache").data("resultCacheHash");

        FB.getLoginStatus(function(response){
            Router.go('result.reward', {resultBranch: "connect"}, {hash: routerHash});
        });
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
