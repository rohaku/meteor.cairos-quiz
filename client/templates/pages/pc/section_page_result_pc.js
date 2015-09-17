resultData = {
	'chicken': '<p>ClusterCluck is as loyal and dependable as friends come.<br/> You can always count him to have your back when you need him.</p>',
	'duck': '<p>The good Ductor is never too busy studying to lend a hand with some fierce <br/>fire magic. Just don’t let him talk too much.</p>',
	'orangutan': '<p>Discipline, strength and loyalty are what <br/>Jungle Jim values the most. Those, and a heaping <br/>bowl of pineapple rice.</p>',
	'hammster': '<p>Thor Hammster is a bona fide super <br/>hero – or so he says. Either way, he’ll be the first <br/>to throw himself in harm’s way.</p>',
	'frog': '<p>If you’re in need of some guidance, <br/>Yoga Frog’s your man. He’s full of all sorts of wisdom, <br/>but not necessarily his own.</p>'
};
Template.SectionPageResultPc.events({
	'click div#startQuizBtn': function(event) {
		window.location.href = "/answer.html";
		Router.dircet('quiz.home');
	}
});
Template.SectionPageResultPc.rendered = function() {
	$(function() {
		var total = 0;
		if (-1 < total > 12) {
			console.log(total);
			$('#result-show').find('div#heroes-img').attr('class', 'chicken');
			$('#result-show').find('div#heroes-title').attr('class', 'chicken');
			$('#result-show').find('div.heroes-intro').html(roleIntroData['chicken'])

		};
	})
}