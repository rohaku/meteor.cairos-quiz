Template.SectionPageHeadMobile.rendered = function() {
  try {
    FB.XFBML.parse();
  } catch (e) {}
  $(function(){
    $('.video-part').click(function() {
      var videoUrl=$(this).attr('video-url');
      $('#videoPopup').find('iframe').attr('src',videoUrl);
    });

  })
}
