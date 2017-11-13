require(["gitbook", "jQuery"], function(gitbook, $) {

    gitbook.events.bind("start", function(e, config) {
      console.log('start top nav');
    });

    gitbook.events.bind("page.change", function(e) {
      function createHeader() {
        return '<div class="top-nav-header w-nav" data-animation="default" data-collapse="medium" data-doc-height="1" data-duration="200" data-no-scroll="1"> <div class="w-container"> <a class="brand w-nav-brand w--current" href="https://www.hypertrack.com" target="_blank"> <img class="top-nav-logo" src="https://d2u9qw9tas3lfc.cloudfront.net/bundle/assets/logo_00d361d11845cf724a6901140dee5e81.svg" width="140"> </a> <nav class="navmenu w-nav-menu" role="navigation"> <a class="top-nav-navlink w-nav-link" href="https://dashboard.hypertrack.com/demo" target="_blank" style="max-width: 940px;">demo</a> <a class="top-nav-navlink w-nav-link" href="https://www.hypertrack.com/pricing" style="max-width: 940px;" target="_blank">pricing</a> <a class="top-nav-navlink w-nav-link" href="https://docs.hypertrack.com" target="_blank" style="max-width: 940px;">docs</a> <a class="top-nav-navlink w-nav-link" href="https://www.hypertrack.com/tutorials/service-visit-tracking-android" style="max-width: 940px;" target="_blank">tutorials</a> <a class="top-nav-navlink w-nav-link" href="http://blog.hypertrack.com" target="_blank" style="max-width: 940px;">BLOG</a> <a class="top-nav-navlink w-nav-link" href="https://dashboard.hypertrack.com/login" style="max-width: 940px;" target="_blank">LOGIN</a> <a class="top-nav-navlink signup w-nav-link" href="https://dashboard.hypertrack.com/signup" style="max-width: 940px;" target="_blank">sign Up</a> </nav> </div> </div>';
      }
      // Get configuration.
      var headerTitle = 'NEW HEADER';

      $('.book-body').css('top', '70px');
      $('.book-summary').css('top', '70px');
      $('.book-header').css({'top': '70px', 'border-top': '1px solid #ededed'});

      // Add customize header html.
      var $header = $('<div class="custom-header"></div>');
      var $headerWrapper = $('<div class="header-element-wrapper"></div>');
      var $link = $(createHeader());
      $headerWrapper.append($link);
      //var $headerTitle = $('<div class="header-text">' + headerTitle + '</div>');

      //$headerWrapper.append($headerTitle);
      $header.append($headerWrapper);
      $('.book-summary').before($header);
    });
});