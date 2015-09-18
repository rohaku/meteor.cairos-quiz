answerListData = [{
	'name': 'Q1',
	'title': 'It’s time for gym class. What are you doing?',
	"option": [{
		'opt': "A",
		'numb': 0,
		'answ': "Playing some team sports."
	}, {
		'opt': "B",
		'numb': 1,
		'answ': "Sitting on the sidelines and studying."
	}, {
		'opt': "C",
		'numb': 3,
		'answ': "Having a swim to clear your thoughts."
	}, {
		'opt': "D",
		'numb': 5,
		'answ': "Proving your strength on the climbing rope."
	}, {
		'opt': "E",
		'numb': 7,
		'answ': "Bragging about how good you are at all sports."
	}]
}, {
	'name': 'Q2',
	'title': 'What’s your favorite type of movie?',
	"option": [{
		'opt': "A",
		'numb': 0,
		'answ': "I’m a sucker for a good rom-com."
	}, {
		'opt': "B",
		'numb': 1,
		'answ': "Documentaries. I came here to learn."
	}, {
		'opt': "C",
		'numb': 3,
		'answ': "Something with a good lesson at the end."
	}, {
		'opt': "D",
		'numb': 5,
		'answ': "The more explosions, the better!"
	}, {
		'opt': "E",
		'numb': 7,
		'answ': "The latest high-fantasy epic."
	}]
}, {
	'name': 'Q3',
	'title': 'What’s your ideal living situation?',
	"option": [{
		'opt': "A",
		'numb': 0,
		'answ': "A cute two-bedroom in a medium-size city."
	}, {
		'opt': "B",
		'numb': 1,
		'answ': "An old Victorian near a top university."
	}, {
		'opt': "C",
		'numb': 3,
		'answ': "Away from everyone else."
	}, {
		'opt': "D",
		'numb': 5,
		'answ': "A surf shack anywhere with big waves."
	}, {
		'opt': "E",
		'numb': 7,
		'answ': "A stone farmhouse in the idyllic countryside."
	}]
}, {
	'name': 'Q4',
	'title': 'What’s your biggest fear?',
	"option": [{
		'opt': "A",
		'numb': 0,
		'answ': "Not being around when my friends need me."
	}, {
		'opt': "B",
		'numb': 1,
		'answ': "Missing the chance to learn something new."
	}, {
		'opt': "C",
		'numb': 3,
		'answ': "Losing sight of my path in life."
	}, {
		'opt': "D",
		'numb': 5,
		'answ': "Not being the best in my chosen field."
	}, {
		'opt': "E",
		'numb': 7,
		'answ': "Not living up to people’s expectations of me."
	}]
}, {
	'name': 'Q5',
	'title': 'Time for a summer holiday. Where are you going?',
	"option": [{
		'opt': "A",
		'numb': 0,
		'answ': "Sightseeing at a national park."
	}, {
		'opt': "B",
		'numb': 1,
		'answ': "Visiting your favorite museums."
	}, {
		'opt': "C",
		'numb': 3,
		'answ': "A meditative retreat in the wilderness. "
	}, {
		'opt': "D",
		'numb': 5,
		'answ': "A top extreme sports destination."
	}, {
		'opt': "E",
		'numb': 7,
		'answ': "You got lost on the way."
	}]
}, {
	'name': 'Q6',
	'title': 'What’s your favorite way to listen to music?',
	"option": [{
		'opt': "A",
		'numb': 0,
		'answ': "On my phone with some headphones."
	}, {
		'opt': "B",
		'numb': 1,
		'answ': "Listening to vinyl at home with a cup of tea."
	}, {
		'opt': "C",
		'numb': 3,
		'answ': "I prefer to play the music myself."
	}, {
		'opt': "D",
		'numb': 5,
		'answ': "I live for epic concerts. The louder the better! "
	}, {
		'opt': "E",
		'numb': 7,
		'answ': "Find me at the craziest rave party."
	}]
}, {
	'name': 'Q7',
	'title': 'What’s your dream job?',
	"option": [{
		'opt': "A",
		'numb': 0,
		'answ': "Mayor of a small town."
	}, {
		'opt': "B",
		'numb': 1,
		'answ': "The top expert in my field."
	}, {
		'opt': "C",
		'numb': 3,
		'answ': "Something that lets me travel the world."
	}, {
		'opt': "D",
		'numb': 5,
		'answ': "Professional athlete."
	}, {
		'opt': "E",
		'numb': 7,
		'answ': "A career military officer."
	}]
}, {
	'name': 'Q8',
	'title': 'Time to get a pet! What will you choose?',
	"option": [{
		'opt': "A",
		'numb': 0,
		'answ': "A friendly, loyal dog."
	}, {
		'opt': "B",
		'numb': 1,
		'answ': "I’m a cat person."
	}, {
		'opt': "C",
		'numb': 3,
		'answ': "A lush aquarium with loads of fish."
	}, {
		'opt': "D",
		'numb': 5,
		'answ': "A massive boa constrictor!"
	}, {
		'opt': "E",
		'numb': 7,
		'answ': "A falcon or a hawk that I can train."
	}]
}];

Template.SectionPageAnswerPc.helpers({
	eachAnswer: function() {
		return answerListData;
	}
});

Template.SectionPageAnswerPc.rendered = function() {
    try {
        FB.XFBML.parse();
    }catch(e) {
        console.log(e.message);
    }

	$(function() {
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


			if (ind == answerListData.length) {
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
