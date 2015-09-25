Template.VideoPopupMobile.rendered = function() {
	$(function(){
	 $('#videoPopup').on('hide.bs.modal', function () {
          $(this).find('iframe').attr('src','');
        });
       
})
}