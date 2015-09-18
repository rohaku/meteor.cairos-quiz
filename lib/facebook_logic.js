/**
 * Created by Ciro on 15/9/18.
 */
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

        if(Meteor.isClient){
            Session.set('quizAnswerResult', _QUIZ_ANSWER_RESULTS_[rangeResult._RANGE_]);
            Router.go('answer.result');
        }

    },

    "getAnswerResultRender": function (resultContent) {
        if(Meteor.isClient) {
            $(function () {
                var _className = resultContent.NAME;
                var _introDesc = resultContent.INTRO;
                $("#heroesImg, #heroesTitle").attr("class", _className);
                $("#heroesIntro").html(_introDesc);
            });
        }
    },

    "checkFBLoginStatus" : function(){
        if(Meteor.isClient) {
            ensureFBInit();
            //console.log(FB);
            //FB.getLoginStatus(function (response) {
            //    if (response.status === 'connected') {
            //        FB.logout();
            //    }
            //});
        }
    },

    //判断某数的区间范围
    "inNumberRange" : function(current, min, max){
        return Math.max(min, current) == Math.min(current, max);
    }
});