/**
 * Created by Ciro on 15/9/17.
 */
FBAppId = "0", FBAppSecert = "0";

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
