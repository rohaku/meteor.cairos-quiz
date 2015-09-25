/**
 * Created by Ciro on 15/9/25.
 */
Template.SectionPageGiftcodePc.rendered = function(){

};

Template.SectionPageGiftcodePc.helpers({
    "hasGotFriendList" : function(){
        return Session.get("friendListLoaded");
    }
});