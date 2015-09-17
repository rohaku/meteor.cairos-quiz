Template.SectionPageResultPc.events({
    'click div#startQuizBtn': function(event){
       Router.redirect('answer.do');
    }
});
Template.SectionPageResultPc.rendered = function(){
	var myAnswerResult = Session.get('quizAnswerResult');
    if(typeof(myAnswerResult) == "undefined"){
        Router.go('answer.do');
    }

    $(function(){
        var _className = myAnswerResult.NAME;
        $("#heroesImg, #heroesTitle").attr("class",_className);
    });
};
