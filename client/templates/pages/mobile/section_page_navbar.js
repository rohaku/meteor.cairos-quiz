Template.SectionPageNavbarMobile.rendered = function() {
	$(function(){
		$(".navbar-header button").click(function() {
          $(this).hide();
          $('div.down-content').removeClass('collapse');
        });
        $(".prev-btn").click(function() {
          $(this).parent("div.down-content").removeClass('in').animate({height: "0px"},500,function(){
            $(this).addClass('collapse');
            $(".navbar-header button").show().addClass('collapsed');
          });
        });
})
}