/**
 * Created by Ciro on 15/9/18.
 */
Template.SectionPageHeadPc.rendered = function() {
	try {
		FB.XFBML.parse();
	} catch (e) {}
	$(function() {
		$('.video-part').click(function() {
			var videoUrl = $(this).attr('video-url');
			$('#videoPopup').find('iframe').attr('src', videoUrl);
		});

	})
};