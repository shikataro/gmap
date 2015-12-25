$(function(){
  // ロードされたときに#backToTopを消す
  var bkt = $('#backTop');
  // bkt.hide();

  // window の幅が狭いときはbackToTopを半透過
  var resizeTimer = false;
  $(window).resize(function() {
    if (resizeTimer !== false) {
        clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function() {
        var w = $(window).width();
        if( w <= 1200){
          bkt.fadeTo(200, 0.35);
        } else{
          bkt.fadeTo(200, 1);
        }
    }, 100);
  });
  
  // ある一定の高さまでスクロールされたらbackToTopを表示、そうでないときは非表示
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      bkt.fadeIn();
    } else {
      bkt.fadeOut();
    }   
  });

  $('a[href^=#]').on('click.anchorScroll', function(){
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "easeOutSine");
    return false;
  });
});