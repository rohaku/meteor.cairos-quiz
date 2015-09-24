/**
 * Created by Ciro on 15/9/14.
 */

_DEVICE_TYPE_ = {
    _PC_: "Pc",
    _MOBILE_: "Mobile"
};

var _routerDeviceType;
if( _deviceType.android || _deviceType.iPhone || _deviceType.iPad){
    _routerDeviceType = _DEVICE_TYPE_._MOBILE_;
}else{
    _routerDeviceType = _DEVICE_TYPE_._PC_;
}

/**
 * =================================== 客户端路由 ===================================
 */

//路由总配置
Router.configure({
    layoutTemplate: 'layout' + _routerDeviceType,
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

//首页
Router.route('/', function(){
    this.render('mainPage' + _routerDeviceType);
},{
    name: 'quiz.home'
});

Router.route('/blog',{
    name:'blogPosts',
    action: function(){
        this.render('mainPage' + _routerDeviceType);
    }
});

//答题
Router.route('/answer.html', function() {
    this.render('SectionPageAnswer' + _routerDeviceType);
},{
    name: 'answer.do'
});

//答题结果
Router.route('/result/:answerRange', function() {
    this.render('SectionPageResult' + _routerDeviceType);
}, {
    name: 'answer.result'
});

//答题后的code获取
Router.route('/reward/:resultBranch', function() {
    //this.layout('SectionPageReward' + _routerDeviceType);
    this.render('SectionPageReward' + _routerDeviceType);

    if(this.params.resultBranch === "connect"){
        this.render('quizCompleteConnect' + _routerDeviceType, {to: "quizComplete"});
    }else{
        this.render('quizCompleteGetCode' + _routerDeviceType, {to: "quizComplete"});
    }
}, {
    name: 'result.reward'
});
//谢谢
Router.route('/thanks.html', function() {
    this.render('SectionPageThanks' + _routerDeviceType);
}, {
    name: 'reward.thanks'
});
//首次领取激活码
Router.route('/firstclaim.html', function() {
    this.render('SectionPageFirstclaim' + _routerDeviceType);
}, {
    name: 'facebook.firstclaim'
});
//2-10个领取激活码
Router.route('/claim.html', function() {
    this.render('SectionPageClaim' + _routerDeviceType);
}, {
    name: 'facebook.claim'
});
//最后一个领取激活码
Router.route('/norewards.html', function() {
    this.render('SectionPageNorewards' + _routerDeviceType);
}, {
    name: 'facebook.norewards'
});
//查看领取到的激活码
Router.route('/giftcode.html', function() {
    this.render('SectionPageGiftcode' + _routerDeviceType);
}, {
    name: 'firstclaim.giftcode'
});

/**
 * =================================== 服务端路由 ===================================
 */
Router.route('/test', function () {
    var req = this.request;
    var res = this.response;

    var _anwserResult = this.params._id;

    res.setHeader("Content-Type", "application/json, charset=utf-8");

    HTTP.post( _HTTP_REQUEST_URLS_._TEST_URL_, {}, function(error, result){
        res.end(JSON.stringify(result.data) + '\n');
    });


}, {where: 'server'});

Router.route('/shareOpenGraph/:answerInfo', function(){
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
    var anwserResult = Meteor.call("getAnswerResultByUrl", resultUrlCache);

    //console.log(this);





    //制作mete标签的方法
    var metaTags = Meteor.call('makeShareMetaTags', anwserResult, 'FB');

    if(isFaceBookReq){
        res.write('<!DOCTYPE html>\n');
        res.write('<html>\n');
        res.write('\t<head>\n');
        res.write('\t\t<meta http-equiv="content-type" content="text/html;charset=utf-8">\n');

        res.write(metaTags);

        res.write('\t</head>\n');
        res.write('\t<body>\n');
        res.write('\t\t' + anwserResult.CHARACTER + '\n');
        res.write('\t</body>\n');
        res.write('</html>');
    }else if(isTwiiterReq){
        //Todo if need twitter sdk do ...
    }else{
        res.writeHead(302, {
            'Location': 'http://cairosquiz.ciro.fedeen.com/firstclaim.html'
        });
    }

    res.end();
}, {name: 'server.share',where: 'server'});
