
Template.SectionPageAnswerPc.helpers({
	eachAnswer: function() {
		return answerListData;
	}
});

Template.SectionPageAnswerPc.rendered = function() {

	$(function() {
		//logoutFB
		try {
			FB.XFBML.parse();
		} catch (e) {};


		$('.video-part').hide();
		var total = 0;
		var ind = 0;
		var lock = false;
		$("#answer li").click(function() {
			if (lock) {
				return;
			}
			lock = true;

			setTimeout(function() {
				lock = false;
			}, 600);

			$(this).addClass('active');
			total += parseInt($(this).attr("value"));
			ind = $(this).parents("section").index();

			var $this = $(this);
			setTimeout(function() {
				$this.parents("section").fadeOut(500, function() {
					$this.parents("section").next().fadeIn();
				});
			}, 200);
			$(this).parents('form').find('p').find('label').html(ind + 1);
			var lastIdx = answerListData.length; /*answerListData.length*/
			if (ind == lastIdx) {
				var postParams = {
					fbUserName: "",
					totalScore: total
				};

				FB.getLoginStatus(function(response) {
					if (response.status === 'connected') {
						//console.log("you are logined")
					} else {
						//console.log("u are not login");
					}
				});

				Meteor.call("getAnswerResult", postParams, function(error, result) {
					if (error) {
						return alert(error.reason);
					}
				});

			};
		});

	});
};