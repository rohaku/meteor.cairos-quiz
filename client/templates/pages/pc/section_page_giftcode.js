/**
 * Created by Ciro on 15/9/25.
 */
Template.SectionPageGiftcodePc.rendered = function(){

};

Template.SectionPageGiftcodePc.helpers({
    "getCodeAndFriendList" : function(){
        alert(123);
        var urlHash = Base64.decode(Router.current().params.hash);
        var quizReferId = urlHash.split(_URL_SPLIT_WORDS_)[0];
        Meteor.call("makeFriendQuizCodeInfo", quizReferId);
    }
});