Template.SectionPageHeadMobile.rendered = function() {
	$(function(){
	$('.video-part').click(function() {
   var videoUrl=$(this).attr('video-url');
   $('#videoPopup').find('iframe').attr('src',videoUrl);
  });
       
})
}