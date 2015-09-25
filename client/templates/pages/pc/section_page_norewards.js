/**
 * Created by Ciro on 15/9/25.
 */
Template.SectionPageNorewardsPc.rendered = function () {
    var urlHash = Base64.decode(Router.current().params.hash);
    var refferal = urlHash.split(_URL_SPLIT_WORDS_)[0];
    Meteor.call("pullFriendListData", refferal, false);
}

Template.SectionPageNorewardsPc.helpers({
    "displayContent": function () {
        $("#claimContent").show();
    },
    "hasGotFriendList": function () {
        return Session.get("friendListLoaded");
    },
    "friendListInfo" : function(){
        return _FRIEND_LIST_;
    }
});