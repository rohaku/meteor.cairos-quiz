/**
 * Created by Ciro on 15/9/17.
 */
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

FB_DEVELOPER_INFO = {
    FB_APP_ID : '1629952820566627',
    FB_APP_SERC: ''
};

_SERVER_URLS_ = [
    {
        URL: 'cairosquiz.ciro.fedeen.com',       //DEVELOPER
        EVN: 'develop',
        FB_APP_ID: '1494613100852445',
        FB_APP_SECR: '00'
    },
    {
        URL: 'coupon-master.lab.fedeen.com',       //TEST
        EVN: 'test',
        FB_APP_ID: '1629952820566627',
        FB_APP_SECR: '01'
    },
    {
        URL: 'coupon-master.staging.fedeen.com',       //PRODUCTION
        EVN: 'production',
        FB_APP_ID: '1629952820566627',
        FB_APP_SECR: '02'
    }
];

_QUIZ_ANSWER_RESULTS_ = {
    RANGE1 : {
        CHARACTER: "ClusterCluck",
        NAME : "chicken",
        TITLE : "You got ClusterCluck!",
        INTRO : "<p>ClusterCluck is as loyal and dependable as friends come.<br/> You can always count him to have your back when you need him.</p>"
    },
    RANGE2 : {
        CHARACTER: "Ductor Quack",
        NAME : "duck",
        TITLE : "You got Ductor Quack!",
        INTRO : "<p>The good Ductor is never too busy studying to lend a hand with some fierce <br/>fire magic. Just don’t let him talk too much.</p>"
    },
    RANGE3 : {
        CHARACTER: "Yoga Frog",
        NAME : "frog",
        TITLE : "You got Yoga Frog!",
        INTRO : "<p>If you’re in need of some guidance, <br/>Yoga Frog’s your man. He’s full of all sorts of wisdom, <br/>but not necessarily his own.</p>"
    },
    RANGE4 : {
        CHARACTER: "Jungle Jim",
        NAME : "orangutan",
        TITLE : "You got Jungle Jim!",
        INTRO : "<p>Discipline, strength and loyalty are what <br/>Jungle Jim values the most. Those, and a heaping <br/>bowl of pineapple rice.</p>"
    },
    RANGE5 : {
        CHARACTER: "Hammster",
        NAME : "hammster",
        TITLE : "You got Thor Hammster!",
        INTRO : "<p>Thor Hammster is a bona fide super <br/>hero – or so he says. Either way, he’ll be the first <br/>to throw himself in harm’s way.</p>"
    }
};

_ANSWER_RESULT_RANGE_ = [
    {
        _RANGE_ : "RANGE1",
        _MAX_ : 11,
        _MIN_ : -1
    },
    {
        _RANGE_ : "RANGE2",
        _MAX_ : 22,
        _MIN_ : 12
    },
    {
        _RANGE_ : "RANGE3",
        _MAX_ : 33,
        _MIN_ : 23
    },
    {
        _RANGE_ : "RANGE4",
        _MAX_ : 44,
        _MIN_ : 34
    },
    {
        _RANGE_ : "RANGE5",
        _MAX_ : 999,
        _MIN_ : 45
    }
];

_URL_SPLIT_WORDS_ = "_CAIROSQUIZ_";
