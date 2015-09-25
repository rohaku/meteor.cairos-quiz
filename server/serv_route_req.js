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

Router.route('/checkQuizStatue', function () {
    var req = this.request;
    var res = this.response;

    res.setHeader("Content-Type", "application/json, charset=utf-8");

    var _getParams_ = req.body;
    var _getParams_ = {
        "game" : 'cairos',
        "referral" : '1472046509770687'
    }


    HTTP.call('GET', _SERVICE_URL_ + "spread", {params:_getParams_}, function(error, result){
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

    if(isFaceBookReq){
        var resultUrlCache = Base64.decode(params64);
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
    }else if(isTwiiterReq){
        //Todo if need twitter sdk do ...
    }else{
        res.writeHead(302, {
            'Location': '/claimcode.html#' + params64
        });
    }

    res.end();
}, {name: 'server.share',where: 'server'});