/**
 * Created by Ciro on 15/9/16.
 */
Template.HomePagePc.events({
    'click div#startQuizBtn': function(event){
       Router.go('answer.do');
    },
});