/**
 * Created by Ciro on 15/9/18.
 */
if(Meteor.isServer){
    Meteor.methods({
        "getDeveloperInfo" : function(){
           return FB_DEVELOPER_INFO;
        }
    });
}

Meteor.methods({
    //获取生成的答案结果
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
            Router.go('answer.result', {answerRange: 'complete'}, {hash: paramHash});
        }

    },
    //渲染答案结果的模板页面
    "makeResultRender": function () {
        if(Meteor.isClient) {
            $(function () {
                Meteor.call("putHiddenUrlTag");

                var resultContent = Meteor.call("getAnswerResultByUrl");
                if(resultContent){
                    var _className = resultContent.NAME;
                    var _introDesc = resultContent.INTRO;
                    $("#heroesImg, #heroesTitle").attr("class", _className);
                    $("#heroesIntro").html(_introDesc);
                }else{
                    Router.go('answer.do');
                }
            });
        }
    },
    //通过Url的参数继承答案用于页面间的传递
    "getAnswerResultByUrl": function(serverUrl){
        if(Meteor.isClient) {
            var answerCache = Router.current().params.hash;
            var myAnswerInfo = Base64.decode(answerCache);
        }

        if(Meteor.isServer){
            var myAnswerInfo = serverUrl;
        }

        var myAnswerResult = _QUIZ_ANSWER_RESULTS_[myAnswerInfo.split(_URL_SPLIT_WORDS_)[0]];
        var checkUrlTime = myAnswerInfo.split(_URL_SPLIT_WORDS_)[1];
        //var nowTime = new Date().getTime();
        //var checkTime = nowTime - parseInt(checkUrlTime);

        if(typeof(myAnswerResult) != "undefined" && !isNaN(checkUrlTime) && checkUrlTime.length == 13){
            return myAnswerResult;
        }else{
            return false;
        }
    },

    //放置一个隐藏域用于保存页面答案的URL信息
    "putHiddenUrlTag": function(){
        if(Meteor.isClient){
            if($("#resultHashCache").size() == 0){
                $("body").append("<input type='hidden' id='resultHashCache' value='' />");
            }
            $("#resultHashCache").data("resultCacheHash", Router.current().params.hash);
        }
    },

    //制作facebook的分享META标签 -- server端调用
    "makeShareMetaTags" : function(quizAnswer, sharePlatform){
        var MetaHTMLTags = "";
        if(sharePlatform == 'FB'){
            MetaHTMLTags += '\t\t<meta property="fb:app_id" content="' + FB_DEVELOPER_INFO.FB_APP_ID + '" />' + '\n';
            MetaHTMLTags += '\t\t<meta property="og:image" content="http://s3-us-west-1.amazonaws.com/forsaken-world/images/fb_share.jpg" />' + '\n';
            MetaHTMLTags += '\t\t<meta property="og:title" content="'+ Meteor.faceBookUtil.shareContent.title + quizAnswer.CHARACTER +'" />' + '\n';
            MetaHTMLTags += '\t\t<meta property="og:description" content="'+ quizAnswer.CHARACTER + Meteor.faceBookUtil.shareContent.description +'" />' + '\n';
            MetaHTMLTags += '\t\t<meta property="og:type"  content="website" />' + '\n';
        }

        return MetaHTMLTags;
    },
    //获取答题后得到的兑换码
    "makeShareCodeInfo" : function(){
        if(Meteor.isClient) {
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