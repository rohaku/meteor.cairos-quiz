Template.FriendGift.rendered = function () {
    $(function () {
        //滚动框效果
        var swiper = new Swiper('.swiper-container', {
            scrollbar: '.swiper-scrollbar',
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheelControl: true,
            freeMode: true,
            scrollbarHide: false
        });
    });
};

Template.FriendGift.helpers({
    "friendListInfo" : function(){
        return _FRIEND_LIST_;
    }
});