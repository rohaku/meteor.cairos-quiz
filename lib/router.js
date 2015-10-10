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
    this.render('SectionPageReward' + _routerDeviceType);

    if(this.params.resultBranch === "connect"){
        this.render('quizCompleteConnect' + _routerDeviceType, {to: "quizComplete"});
    }else{
        this.render('quizCompleteGetCode' + _routerDeviceType, {to: "quizGetCode"});
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
//检测分享领码状态
Router.route('/claimcode.html', function() {
    var getHash = Base64.decode(this.params.hash);

    var reffUserId = getHash.split(_URL_SPLIT_WORDS_)[0];
    var claimStatus = getHash.split(_URL_SPLIT_WORDS_)[1];

    switch(claimStatus){
        case "first":
            this.render('SectionPageFirstclaim'+ _routerDeviceType);
            break;
        case "normal":
            this.render('SectionPageClaim'+ _routerDeviceType);
            break;
        default:
            this.render('SectionPageNorewards'+ _routerDeviceType);
            break;
    }

}, {
    name: 'facebook.check.result'
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

