var googleTE = false;

const setImage = () => {
  const lang = localStorage.lang;
  let key = 'ko';

  switch (lang) {
    case 'en':
      key = 'eng';
      break;
    case 'zh-CN':
      key = 'china';
      break;
  }

  console.log(key);

  const imgData = {
    ko: {
      con: {
        pc: '/images/img/business-con.png',
        mo: '/images/img/business-con-m.png',
      },
      graph: {
        pc: '/images/img/branding.png',
        mo: '/images/img/branding-m.png',
      },
      forei: {
        pc: '/images/img/foreigner-con-pc.png',
        mo: '/images/img/foreigner-con-m.png',
      },
    },
    eng: {
      con: {
        pc: '/images/eng-img/business-pc-eng.png',
        mo: '/images/eng-img/business-m-eng.png',
      },
      graph: {
        pc: '/images/eng-img/branding-pc-eng.png',
        mo: '/images/eng-img/branding-m-eng.png',
      },
      forei: {
        pc: '/images/eng-img/foreigner-con-pc-eng.png',
        mo: '/images/eng-img/foreigner-con-m-eng.png',
      },
    },
    china: {
      con: {
        pc: '/images/china-img/business-pc-ch.png',
        mo: '/images/china-img/business-m-ch.png',
      },
      graph: {
        pc: '/images/china-img/branding-pc-ch.png',
        mo: '/images/china-img/branding-m-ch.png',
      },
      forei: {
        pc: '/images/china-img/foreigner-con-pc-ch.png',
        mo: '/images/china-img/foreigner-con-m-ch.png',
      },
    },
  }[key];

  $('.con-img.pc-img').attr('src', imgData.con.pc);
  $('.con-img.m-img').attr('src', imgData.con.pc);
  $('.img-con-p .pc-img').attr('src', imgData.graph.pc);
  $('.img-con-p .m-img').attr('src', imgData.graph.pc);

  $('.forei .img-pc').attr('src', imgData.forei.pc);
  $('.forei .img-m').attr('src', imgData.forei.pc);
};

function googleTranslateElementInit() {
  googleTE = new google.translate.TranslateElement(
    {
      pageLanguage: 'ko',
      autoDisplay: true,
    },
    'google_translate_element'
  );
}

$(document).ready(function () {
  $('.quick-inner .navy').click(function () {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      400
    );
    return false;
  });

  $('.nav-item').on('mouseover', function () {
    $(this).addClass('active');
    $(this).children('.hd-item-sub').stop().fadeIn(300);
    $('.nav-sub-bg').stop().fadeIn(300);

    if ($(this).hasClass('pr')) {
      $('.nav-sub-bg').stop().fadeOut();
    }
  });

  $('.nav-item').on('mouseleave', function () {
    $(this).removeClass('active');
    $(this).children('.hd-item-sub').stop().fadeOut();
    $('.nav-sub-bg').stop().fadeOut(300);
  });

  $('.hd-item-sub').on('mouseover', function () {
    // $('header').css('background-color', '#000');
    $(this).children('.hd-item-sub').stop().fadeIn(300);
    $('.nav-sub-bg').stop().fadeIn(300);
  });

  $('.hd-lang').on('click', function () {
    $(this).children('.lang-list').stop().toggle();
    return false;
  });

  var burger = $('.menu-trigger');
  burger.each(function (index) {
    var $this = $(this);
    $this.on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass('active-' + (index + 1));
      $('.m-nav-wrap').toggleClass('show');
    });
  });

  var didScroll;
  var lastScrollTop = 0;
  var delta = 0;
  var navbarHeight = $('#header').outerHeight();

  $(window).scroll(function (event) {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  });

  if ($(window).scrollTop() == 0) {
    $('#header').addClass('trans').removeClass('scroll-down');
    $('.menu-trigger').removeClass('scroll');
    $('#snb-wrap').addClass('top').removeClass('scroll');
    $('.nav-item').mouseenter(function () {
      $('#header').removeClass('trans');
    });
    $('.nav-item').mouseleave(function () {
      $('#header').addClass('trans');
    });
  } else {
    $('#header').removeClass('trans').addClass('scroll-down');
    $('.menu-trigger').addClass('scroll');
    $('#snb-wrap').removeClass('top').addClass('scroll');
    $('.nav-item').mouseleave(function () {
      $('#header').removeClass('trans');
    });
  }

  function hasScrolled() {
    var st = $(this).scrollTop();
    var scrollTop = $(window).scrollTop();
    if (scrollTop == 0) {
      $('#header').addClass('trans').removeClass('scroll-down');
      $('.menu-trigger').removeClass('scroll');
      $('#snb-wrap').addClass('top').removeClass('scroll');
      $('.nav-item').mouseenter(function () {
        $('#header').removeClass('trans');
      });
      $('.nav-item').mouseleave(function () {
        $('#header').addClass('trans');
      });
    } else {
      $('#snb-wrap').removeClass('top');
      $('#header').removeClass('trans');
      $('.nav-item').mouseleave(function () {
        $('#header').removeClass('trans');
      });
      if (Math.abs(lastScrollTop - st) <= delta) {
        return;
      }
      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('#header').removeClass('scroll-up').addClass('scroll-down');
        $('.menu-trigger').addClass('scroll');
        $('#snb-wrap').addClass('scroll').removeClass('scroll-up');
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $('#header').removeClass('scroll-down').addClass('scroll-up');
          $('.menu-trigger').removeClass('scroll');
          $('#snb-wrap').addClass('scroll scroll-up');
        }
      }
    }
    lastScrollTop = st;
  }

  $('.blue').click(function () {
    if ($('.quick-menu').hasClass('on')) {
      $('.quick-menu').removeClass('on');
    } else {
      $('.quick-menu').addClass('on');
    }

    return false;
  });

  $('.lang-list a').on('click', function () {
    console.log('test');

    if (!googleTE) {
      googleTranslateElementInit();
      alert('언어 모듈이 로드되지 않았습니다. 다시 시도해주세요.');
      return;
    }

    changeLang($(this).data('lang'));
    setImage();
  });

  function changeLang(lang) {
    try {
      var gtcombo = $('.goog-te-combo')[0];

      localStorage.lang = lang;
      gtcombo.value = lang;
      gtcombo.dispatchEvent(new Event('change'));
    } catch (error) {
      console.log(error);
      setTimeout(function () {
        changeLang(lang);
      }, 700);
    }
  }

  changeLang(localStorage.lang);

  $('body').append(`
    <div class="call-modal">
      <div class="close" onclick="$('.call-modal').removeClass('show')">
        <img src="/images/img/workway-con11.png" alt="Close Button">
      </div>
      <div class="img-box2"> 
          
      </div>
      
      <div class="title">Yohan Do</div>
      <div class="phone">Email: ydo@gmu.edu</div>
      <div class="phone">Phone: 010-9903-7702</div>
    </div>
  `);

  $('#call').click(() => {
    const isMobile = /mobile|android|ios|iphone|ipad|ipod|blackberry|opera mini|iemobile/i.test(
      window.navigator.userAgent
    );

    if (isMobile) {
      window.open('tel:010-9903-7702');
    } else {
      $('.call-modal').toggleClass('show');
    }
  });
    // 모달 닫기 버튼 클릭 이벤트 처리 (이미 정의된 닫기 기능을 유지)
  $('.close').on('click', function () {
    $('.call-modal').removeClass('show');
  });

  $(document).on('click', function (e) {
    // 모달이 열려있고, 클릭한 요소가 모달 내부가 아닌 경우 모달 닫기
    if ($('.call-modal').hasClass('show') && !$(e.target).closest('.call-modal').length && !$(e.target).is('#call')) {
      $('.call-modal').removeClass('show');
    }
  });

});
