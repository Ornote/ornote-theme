(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.MenuToggle = {
    attach: function (context, settings) {
      $(".navbar", context).click(function () {
        $(".nav-content--inner", context).toggleClass("burger-add");
      });
      $('#nav-toggle', context).click(function () {
        $(this).toggleClass('open');
      });
    }
  }
  Drupal.behaviors.Search = {
    attach: function (context, settings) {
      $('.icon-search', context).click(function () {
        $('.ornote-search', context).toggleClass('search-open')
      });
    }
  }
  Drupal.behaviors.NavAnchor = {
    attach: function (context, settings) {
      $('.global-titre a[href^="#"]', context).bind('click', function (e) {
        e.preventDefault();

        var target = $(this).attr("href");

        $('html, body', context).stop().animate({
          scrollTop: $(target).offset().top
        }, 600, function () {
          location.hash = target;
        });

        return false;
      });
      $(window).scroll(function () {
        var scrollDistance = $(window).scrollTop();

        if (scrollDistance >= 20) {
          $('.global-titre', context).fadeIn("slow");
        } else {
          $('.global-titre', context).fadeOut("slow");
        }

        $('.code-content', context).each(function (i) {
          if ($(this).position().top <= scrollDistance) {
            $('.global-titre a.active', context).removeClass('active');
            $('.global-titre a', context).eq(i).addClass('active');
          }
        });
      }).scroll();
    }
  }
  Drupal.behaviors.Modal = {
    attach: function (context, settings) {
      (function () {
        function fullScreen(state) {
          var e, func, doc;
          if (!this.length) return this;
          e = (this[0]);
          if (e.ownerDocument) {
            doc = e.ownerDocument;
          } else {
            doc = e;
            e = doc.documentElement;
          }
          if (state == null) {
            if (!((doc["exitFullscreen"])
                || (doc["webkitExitFullscreen"])
                || (doc["webkitCancelFullScreen"])
                || (doc["msExitFullscreen"])
                || (doc["mozCancelFullScreen"]))) {
              return null;
            }
            state = !!doc["fullscreenElement"]
                || !!doc["msFullscreenElement"]
                || !!doc["webkitIsFullScreen"]
                || !!doc["mozFullScreen"];
            if (!state) return state;

            return (doc["fullscreenElement"])
                || (doc["webkitFullscreenElement"])
                || (doc["webkitCurrentFullScreenElement"])
                || (doc["msFullscreenElement"])
                || (doc["mozFullScreenElement"])
                || state;
          }
          if (state) {
            func = (e["requestFullscreen"])
                || (e["webkitRequestFullscreen"])
                || (e["webkitRequestFullScreen"])
                || (e["msRequestFullscreen"])
                || (e["mozRequestFullScreen"]);
            if (func) {
              func.call(e);
            }
            return this;
          } else {
            func = (doc["exitFullscreen"])
                || (doc["webkitExitFullscreen"])
                || (doc["webkitCancelFullScreen"])
                || (doc["msExitFullscreen"])
                || (doc["mozCancelFullScreen"]);
            if (func) func.call(doc);
            return this;
          }
        }

        function toggleFullScreen() {
          return (fullScreen.call(this,
              !fullScreen.call(this)));
        }

        function fullScreenChangeHandler(event) {
          jQuery(document).trigger(new jQuery.Event("fullscreenchange"));
        }

        function fullScreenErrorHandler(event) {
          jQuery(document).trigger(new jQuery.Event("fullscreenerror"));
        }


        function installFullScreenHandlers() {
          var e, change, error;

          e = document;
          if (e["webkitCancelFullScreen"]) {
            change = "webkitfullscreenchange";
            error = "webkitfullscreenerror";
          } else if (e["msExitFullscreen"]) {
            change = "MSFullscreenChange";
            error = "MSFullscreenError";
          } else if (e["mozCancelFullScreen"]) {
            change = "mozfullscreenchange";
            error = "mozfullscreenerror";
          } else {
            change = "fullscreenchange";
            error = "fullscreenerror";
          }

          jQuery(document).bind(change, fullScreenChangeHandler);
          jQuery(document).bind(error, fullScreenErrorHandler);
        }

        jQuery.fn["fullScreen"] = fullScreen;
        jQuery.fn["toggleFullScreen"] = toggleFullScreen;
        installFullScreenHandlers();

      })();

      $(".fullscreen").click(function () {
        $(document).toggleFullScreen();
      });


      $(document).on("fullscreenchange", function () {
        if ($(document).fullScreen()) {
          $('.fullscreen', context).addClass('full');
        } else {
          $('.fullscreen', context).removeClass('full');
        }
      });
    }
  }
}(jQuery, Drupal, drupalSettings));

function OrnoteControler($scope) {
  $scope.resluts = ['html', 'css', 'js', 'php', 'mysql', 'drupal'];
  //$scope.resluts = ['{{ content.body.0 }}'];
  $scope.temp = false;
  $scope.isTemp = function (i) {
    return i == $scope.resluts.length - 1 && $scope.temp;
  };
}
