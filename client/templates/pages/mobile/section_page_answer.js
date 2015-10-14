Template.SectionPageAnswerMobile.helpers({
	eachAnswer: function() {
		return answerListData;
	}
});

Template.SectionPageAnswerMobile.rendered = function() {
	Meteor.call("answerAnimation");
};