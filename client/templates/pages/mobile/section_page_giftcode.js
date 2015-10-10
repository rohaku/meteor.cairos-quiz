Template.SectionPageGiftcodeMobile.events({
    'click div#startQuizBtn': function(event){
       Router.go('answer.do');
    }

});
Template.SectionPageGiftcodeMobile.helpers({
    "hasGotFriendList" : function(){
        return Session.get("friendListLoaded");
    }
});