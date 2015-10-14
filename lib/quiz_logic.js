/**
 * Created by Ciro on 15/9/18.
 */
checkResult = {};

if(Meteor.isServer){
    Meteor.methods({
        "getDeveloperInfo" : function(){
           return FB_DEVELOPER_INFO;
        }
    });
}

Meteor.methods({
    //答题效果实现
    'answerAnimation':function(){
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
            }, 400);

            $(this).addClass('active');
            total += parseInt($(this).attr("value"));
            ind = $(this).parents("section").index();

            var $this = $(this);
            setTimeout(function() {
                $this.parents("section").fadeOut(350, function() {
                    $this.parents("section").next().fadeIn();
                    $this.parents('form').find('p').find('label').html(ind + 1);
                });
            }, 400);
            
            var lastIdx = answerListData.length; /*answerListData.length*/
            if (ind == lastIdx) {
                var postParams = {
                    fbUserName: "",
                    totalScore: total
                };

                Meteor.call("getAnswerResult", postParams, function(error, result) {
                    if (error) {
                        return alert(error.reason);
                    }
                });

            };
        });

    },
    
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
            //Session.set('quizAnswerResult', _QUIZ_ANSWER_RESULTS_[rangeResult._RANGE_]);      //采用session保存，但手动刷新时会丢失session因此暂不使用Session保存数据
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
        var checkUrlTaile = myAnswerInfo.split(_URL_SPLIT_WORDS_)[1];
        //var nowTime = new Date().getTime();
        //var checkTime = nowTime - parseInt(checkUrlTime);

        if(Meteor.isClient) {
            if (typeof(myAnswerResult) != "undefined" && !isNaN(checkUrlTaile) && checkUrlTaile.length == 13) {
                return myAnswerResult;
            } else {
                return false;
            }
        }

        if(Meteor.isServer){
            if (!isNaN(checkUrlTaile)) {
                return myAnswerResult;
            } else {
                return false;
            }
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

    //点击分享按钮的事件
    "clickShareButton": function(resultUrlCache, fbShareUserId){
        if(Meteor.isClient){
            var myAnswerInfo = Base64.decode(resultUrlCache);
            var answerFlag = myAnswerInfo.split(_URL_SPLIT_WORDS_)[0];
            var shareCallBackUrl = Base64.encode(answerFlag + _URL_SPLIT_WORDS_ + fbShareUserId);

            var shareContext = {
                method: 'share',
                href: 'http://cairos-quiz.lab.fedeen.com/shareQuiz/' + shareCallBackUrl
                //href: 'http://cairos-quiz.fedeen.com/shareQuiz/' + shareCallBackUrl
            };
            FB.ui(shareContext, function (response) {
                if (typeof(response.error_code) == "undefined") {
                    Router.go('reward.thanks');
                }
            });
        }
    },

    //制作facebook的分享META标签 -- server端调用
    "makeShareMetaTags" : function(quizAnswer, sharePlatform){
        var MetaHTMLTags = "";
        if(sharePlatform == 'FB'){
            MetaHTMLTags += '\t\t<meta property="og:title" content="'+ Meteor.faceBookUtil.shareContent.title + quizAnswer.CHARACTER +'" />' + '\n';
            MetaHTMLTags += '\t\t<meta property="og:image" content="https://s3-us-west-1.amazonaws.com/cairos-web/quiz/' + quizAnswer.NAME + '.jpg" />' + '\n';
            MetaHTMLTags += '\t\t<meta property="og:description" content="'+ quizAnswer.CHARACTER + Meteor.faceBookUtil.shareContent.description +'" />' + '\n';
            MetaHTMLTags += '\t\t<meta property="og:type"  content="website" />' + '\n';
            //MetaHTMLTags += '\t\t<meta property="fb:app_id" content="' + FB_DEVELOPER_INFO.FB_APP_ID + '" />' + '\n';
        }

        return MetaHTMLTags;
    },
    //获取答题后得到的兑换码
    "makeQuizCodeInfo" : function(curlParam){
        if(Meteor.isClient) {
            $.ajax({
                url: "/getQuizCode",
                dataType: 'json',
                type: 'post',
                data: curlParam,
                success: function(res){
                    $("#rewardShareContainer").data("referId", res.ref);
                    $("#answerCompleteCode").text(res.code).data("referral");
                }
            });
        }
    },
    //获取答题后得到的兑换码 - 必须通过connect页面重定向
    "makeQuizCodeInfoByConnect" : function(curlParam){
        if(Meteor.isClient) {
            $.ajax({
                url: "/getQuizCode",
                dataType: 'json',
                type: 'post',
                data: curlParam,
                success: function(res){
                    Session.set("answerCode", res.code);
                    Session.set("referId", res.ref);
                    Router.go('result.reward', {resultBranch: curlParam.resultBranch}, {hash: curlParam.paramHash});
                }
            });
        }
    },

    //仅拉取好友列表数据
    "pullFriendListData": function(referral, ifClickConnect){
        if(Meteor.isClient){
            _FRIEND_LIST_ = [];
            $.ajax({
                url: "/getFriendList",
                dataType: 'json',
                type: 'post',
                data: {referral : referral},
                success: function(res){
                    _FRIEND_LIST_ = res.referees;
                    Session.set("friendListLoaded", true);
                    if(ifClickConnect){
                        $("#claimContent").remove();
                        $('#claimCodeResult').show();
                        var listContainer = $('#friendsCodeListTab').find("tbody");
                        listContainer.empty();
                        $.each(_FRIEND_LIST_, function(idx, obj){
                            var rowHTML = "<tr>";
                            var fbUserName =  (typeof(obj.name) == 'undefined') ? 'Anonymous' : obj.name;
                            rowHTML += "<td class='friend-name'><span>"+ fbUserName +"</span></td>";
                            rowHTML += "<td class='received'>received: </td>";
                            rowHTML += "<td class='gift-name'><label>" + obj.item + "</label></td>";
                            rowHTML += "</tr>";
                            listContainer.append(rowHTML);
                        });
                    }
                }
            });
        }
    },

    //获取码和好友列表
    "makeFriendQuizCodeInfo" : function(fbReferId){
        if(Meteor.isClient) {

            FB.getLoginStatus(function(response){
                if (response.status === 'connected') {
                    var uid = response.authResponse.userID;
                    var accessToken = response.authResponse.accessToken;

                    FB.api('/me', function(profile) {
                        httpParams = {
                            game: "cairos",
                            email: profile.email,
                            facebook_id: uid,
                            facebook_token: accessToken,
                            facebook_profile: profile,
                            referral: fbReferId
                        };
                        $.ajax({
                            url: "/getShareQuizCode",
                            dataType: 'json',
                            type: 'post',
                            data: httpParams,
                            success: function(res){
                                var getItems = res.item;
                                var itemClassName = getItems == "A Sack of Gold" ? "sack-gold" : "chest-diamonds";
                                $("#claimCodeNumber").text(res.code);
                                $("#rewardPicture, #rewardDes").attr("class", itemClassName);
                                Meteor.call("pullFriendListData", fbReferId, true);
                            }
                        });
                    });

                }
            });

        }
    },

    //获取分享兑换码人员列表和code
    "getQuizFriendList" : function(){
        if(Meteor.isClient) {
            var getUrlInfo = Base64.decode(Router.current().params.hash);
            var referral = getUrlInfo.split(_URL_SPLIT_WORDS_)[1];

            $.ajax({
                url: "/checkQuizStatue",
                dataType: 'json',
                type: 'post',
                data: {
                    game : "carios",
                    referral : referral
                },
                success: function(data){
                    console.log(data);
                    checkResult = data;
                    Session.set("checkQuizUserOver", true);
                }
            });
        }
    },

    //判断某数的区间范围
    "inNumberRange" : function(current, min, max){
        return Math.max(min, current) == Math.min(current, max);
    },
    
    
});
