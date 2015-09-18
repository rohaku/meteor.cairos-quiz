Template.SectionPageAnswerMobile.helpers({
	eachAnswer: function() {
		return answerListData;
	}
});
Template.SectionPageAnswerMobile.rendered = function() {
	$(function() {
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


			if (ind == answerListData.length) {

            //answerListData.length
			
				$('form').submit(function() {
					$('input').val(total);

				});


                var postParams = {
                    fbUserName : "",
                    totalScore : total
                };

                Meteor.call("getAnswerResult", postParams, function(error, result){
                    if(error){
                        return alert(error.reason);
                    }
                });

			};
		});

	});
};