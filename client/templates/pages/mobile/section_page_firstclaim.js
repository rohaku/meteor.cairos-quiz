 Template.SectionPageFirstclaimMobile.events({
     'click div#startQuizBtn': function(event){
        Router.go('answer.do');
    }

 });

Template.SectionPageFirstclaimMobile.helpers({
    displayContent: function () {
        $("#claimContent").show();
    }
});