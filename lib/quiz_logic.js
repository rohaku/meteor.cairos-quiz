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
            var timestamp = (new Date()).getTime();
            var paramHash = Base64.encode(rangeResult._RANGE_ + _URL_SPLIT_WORDS_ +timestamp);
            Router.go('answer.result', {answerRange: paramHash});
        }

    },

    "makeResultRender": function (resultContent) {
        if(Meteor.isClient) {
            $(function () {
                var _className = resultContent.NAME;
                var _introDesc = resultContent.INTRO;
                $("#heroesImg, #heroesTitle").attr("class", _className);
                $("#heroesIntro").html(_introDesc);
            });
        }
    },

    "makeShareMetaTags" : function(){

    },

    "makeShareCodeInfo" : function(){
        if(Meteor.isClient) {
            Meteor.call("makeShareMetaTags");
            $('head').prepend('<meta property="fb:app_id" content="1469938686648136" />');
            $('head').prepend('<meta property="og:image"  content="http://s3-us-west-1.amazonaws.com/forsaken-world/images/fb_share.jpg" />');
            $('head').prepend('<meta property="og:title"  content="Win a FREE gift in Forsaken World Mobile!" />');
            $('head').prepend('<meta property="og:description"  content="Want a Forsaken World Mobile gift code? How about a fun quiz →" />');
            $('head').prepend('<meta property="og:type"   content="website" />');

            $.post("/test", {a:1},function(data){
                console.log(data);
            });
        }
    },

    //判断某数的区间范围
    "inNumberRange" : function(current, min, max){
        return Math.max(min, current) == Math.min(current, max);
    }
});