Template.SectionPageAnswerPc.helpers({
	eachAnswer: function() {
		return answerListData;
	}
});


Template.SectionPageAnswerPc.rendered = function() {
	Meteor.call("answerAnimation");
};