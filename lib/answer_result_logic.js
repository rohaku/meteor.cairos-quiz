/**
 * Created by Ciro on 15/9/17.
 */
_QUIZ_ANSWER_RESULTS_ = {
    RANGE1 : {
        NAME : "ClusterCluck",
        TITLE : "You got ClusterCluck!",
        INTRO : "ClusterCluck is as loyal and dependable as friends come. You can always count him to have your back when you need him."
    },
    RANGE2 : {
        NAME : "Quack",
        TITLE : "You got Ductor Quack!",
        INTRO : "The good Ductor is never too busy studying to lend a hand with some fierce fire magic. Just don’t let him talk too much."
    },
    RANGE3 : {
        NAME : "Frog",
        TITLE : "You got Yoga Frog!",
        INTRO : "If you’re in need of some guidance, Yoga Frog’s your man. He’s full of all sorts of wisdom, but not necessarily his own."
    },
    RANGE4 : {
        NAME : "Jim",
        TITLE : "You got Jungle Jim!",
        INTRO : "Discipline, strength and loyalty are what Jungle Jim values the most. Those, and a heaping bowl of pineapple rice."
    },
    RANGE5 : {
        NAME : "Hammster",
        TITLE : "You got Thor Hammster!",
        INTRO : "Thor Hammster is a bona fide super hero – or so he says. Either way, he’ll be the first to throw himself in harm’s way."
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


Meteor.methods({
    "getAnswerResult" : function(answerPost){
        check(answerPost, {
            fbUserName : String,
            totalScore : Number
        });

        var answerNumber= "";
        var rangeResult = _.find(_ANSWER_RESULT_RANGE_, function(rangeObj){

            var minNum = rangeObj._MIN_;
            var maxNum = rangeObj._MAX_;
            var currentNum = answerPost.totalScore;


            var inRange = Meteor.call("inNumberRange", currentNum, minNum, maxNum);
            if(inRange){
                answerNumber = rangeObj._RANGE_;
                return _QUIZ_ANSWER_RESULTS_[answerNumber];
            }
        });

        console.log(rangeResult);
        Session.set('quizAnswerResult', _QUIZ_ANSWER_RESULTS_[rangeResult._RANGE_]);

        Router.go('/result.html');
    },

    //判断某数的区间范围
    "inNumberRange" : function(current, min, max){
        return Math.max(min, current) == Math.min(current, max);
    }
});