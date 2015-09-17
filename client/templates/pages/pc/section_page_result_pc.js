Template.SectionPageResultPc.events({
    'click div#startQuizBtn': function(event){
       Router.go('answer.do');
    },

    'click div#claimRewardBtn': function(event){
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log('Logged in.');
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

    try {
        FB.XFBML.parse();
    }catch(e) {
        console.log(e.message);
    }

    $(function(){
        var _className = myAnswerResult.NAME;
        var _introDesc = myAnswerResult.INTRO;
        $("#heroesImg, #heroesTitle").attr("class",_className);
        $("#heroesIntro").html(_introDesc);
    });
};
