 Template.SectionPageClaimMobile.events({
     'click div#startQuizBtn': function(event){
        Router.go('answer.do');
     }

 });

Template.SectionPageClaimMobile.rendered = function(){
	var urlHash = Base64.decode(Router.current().params.hash);
    var refferal = urlHash.split(_URL_SPLIT_WORDS_)[0];
    Meteor.call("pullFriendListData", refferal, false);
};

Template.SectionPageClaimMobile.helpers({
    "displayContent": function () {
        $("#claimContent").show();
    },
    "hasGotFriendList" : function(){
        return Session.get("friendListLoaded");
    }
});