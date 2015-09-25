/**
 * Created by Ciro on 15/9/25.
 */
Template.SectionPageClaimPc.rendered = function(){
    var urlHash = Base64.decode(Router.current().params.hash);
    var refferal = urlHash.split(_URL_SPLIT_WORDS_)[0];
    Meteor.call("pullFriendListData", refferal, false);
};

Template.SectionPageClaimPc.helpers({
    "displayContent": function () {
        $("#claimContent").show();
    },
    "hasGotFriendList" : function(){
        return Session.get("friendListLoaded");
    }
});