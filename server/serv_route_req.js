/**
 * Created by Ciro on 15/9/25.
 */
/**
 * =================================== 服务端路由 ===================================
 */
Router.route('/getQuizCode', function () {
    var req = this.request;
    var res = this.response;

    res.setHeader("Content-Type", "application/json, charset=utf-8");

    var _getParams_ = req.body;
    HTTP.call('GET', _SERVICE_URL_ + "connect", {params:_getParams_}, function(error, result){
        res.end(JSON.stringify(result.data) + '\n');
    });


}, {where: 'server'});

Router.route('/getShareQuizCode', function () {
    var req = this.request;
    var res = this.response;

    res.setHeader("Content-Type", "application/json, charset=utf-8");
    var _getParams_ = req.body;

    HTTP.call('GET', _SERVICE_URL_ + "connect", {params:_getParams_}, function(error, result){
        res.end(JSON.stringify(result.data) + '\n');
    });


}, {where: 'server'});

Router.route('/getFriendList', function () {
    var req = this.request;
    var res = this.response;

    res.setHeader("Content-Type", "application/json, charset=utf-8");
    var _getParams_ = req.body;

    var _getHttpParams_ = {
        "game" : 'cairos',
        "referral" : _getParams_.referral //referral
    };

    HTTP.call('GET', _SERVICE_URL_ + "spread", {params:_getHttpParams_}, function(error, result){
        res.end(JSON.stringify(result.data) + '\n');
    });


}, {where: 'server'});

Router.route('/shareQuiz/:answerInfo', function(){
    var req = this.request;
    var res = this.response;
    var params64 = decodeURIComponent(this.params.answerInfo);


    var isFaceBookReq = false, isTwiiterReq = false;
    if(Meteor.faceBookUtil){
        isFaceBookReq = req.headers['user-agent'].indexOf(Meteor.faceBookUtil.uaFlag) !== -1;
    }
    if(Meteor.twitterUtil){
        isTwiiterReq = req.headers['user-agent'].indexOf(Meteor.twitterUtil.uaFlag) !== -1;
    }

    var resultUrlCache = Base64.decode(params64);
    if(isFaceBookReq){
        //Todo this is the method of Facebook Sdk will be call what to use share in FB's feed.
        var anwserResult = Meteor.call("getAnswerResultByUrl", resultUrlCache);
        res.write('<!DOCTYPE html>\n');
        res.write('<html>\n');
        res.write('\t<head>\n');
        res.write('\t\t<meta http-equiv="content-type" content="text/html;charset=utf-8">\n');

        if(anwserResult){
            //制作mete标签的方法
            var metaTags = Meteor.call('makeShareMetaTags', anwserResult, 'FB');
            res.write(metaTags);
        }

        res.write('\t</head>\n');
        res.write('\t<body>\n');
        if(anwserResult){
            res.write('\t\t' + anwserResult.CHARACTER + '\n');
        }else{
            res.write('\t\t ERROR_CODE:1051 \n');
        }

        res.write('\t</body>\n');
        res.write('</html>');
        res.end();
    }else if(isTwiiterReq){
        //Todo if need twitter sdk to do something
    }else{
        //Todo check the status of FB's user get the quiz's code .
        var referral = resultUrlCache.split(_URL_SPLIT_WORDS_)[1];

        var _getHttpParams_ = {
            "game" : 'cairos',
            "referral" : referral //referral
        };

        HTTP.call('GET', _SERVICE_URL_ + "spread", {params:_getHttpParams_}, function(error, result){
            var getData = result.data.referees;
            var pageHash = referral + _URL_SPLIT_WORDS_;

            if(getData.length <= 0){
                pageHash += "first";
            }else if(getData.length > 0 && getData.length < 10){
                pageHash += "normal";       //normal
            }else{
                pageHash += "last";
            }

            res.writeHead(302, {
                'Location': '/claimcode.html#' + Base64.encode(pageHash)
            });
            res.end();
        });
    }


}, {name: 'server.share',where: 'server'});