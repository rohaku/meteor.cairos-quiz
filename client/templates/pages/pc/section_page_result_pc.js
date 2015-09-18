Template.SectionPageResultPc.events({
    'click div#startQuizBtn': function(event){
       Router.go('answer.do');
    },

    'click div#claimRewardBtn': function(event){
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log('Logged in.');

                FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        // the user is logged in and has authenticated your
                        // app, and response.authResponse supplies
                        // the user's ID, a valid access token, a signed
                        // request, and the time the access token
                        // and signed request each expire
                        var uid = response.authResponse.userID;
                        var accessToken = response.authResponse.accessToken;

                        console.log(uid);
                        console.log(accessToken);
                    } else if (response.status === 'not_authorized') {
                        // the user is logged in to Facebook,
                        // but has not authenticated your app
                    } else {
                        // the user isn't logged in to Facebook.
                    }
                });
            }
            else {
                FB.login();
            }
        });
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




    try {
        FB.XFBML.parse();
    }catch(e) {
        console.log(e.message);
    }
};
