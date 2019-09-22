
var App = {
  select: {
      list_wrap: $('.sort-by'),
      menu_mobile: $('.nav__list'),
      layer: $('.layer'),
      filters_wrap: $('.s-catalog__filters'),
  },
  sort_by () {
    let that = this;
      $('.sort-by__item').on('click', function() {

          $(this).parents('.sort-by')
              .find('.sort-by__item').removeClass('active');
          $(this).addClass('active');

          $(this).parent('.sort_by')
              .find('input').val($(this).text);

          $(this).parent('.sort_by').removeClass('active');
      });

      this.select.list_wrap.on('click', function () {
         $(this).toggleClass('active');
         if($(window).width() < 768 ) {
           that.select.layer.toggleClass('active');
         }
      });
  },
  rater() {
    var options = {
      step_size: 1,
      max_value: 5,
      initial_value: 0,
      readonly: false,
      change_once: true,
    };
    $(".rating").rate(options);
  },
  toggle_filter() {

    let that = this;

      $('.filter__title').on('click', function () {

        $(this).parents('.filter').toggleClass('toggle');
        $(this).parents('.filter').find('.filter__list').stop().slideToggle('fast');
        setTimeout(() => {
          that.filter_accept_btn();
        },300);

      });



  },
  mobile_filters_dropdown() {
    let that = this;
    let filter = $('.js-filters-dropdown');

    filter.on('click', function (e) {
      $(this).toggleClass('active');
      if(that.select.layer.length > 0) {
        if($(window).width() > 540) {
          that.select.layer.toggleClass('active');
        }
        if($(window).width() < 540) {
          $('html').addClass('overflow');
        }
        that.select.filters_wrap.toggleClass('active');
      }
    });
  },
  filter_accept_btn () {
    let btn = $('.btn--accept');
    let filters = $('.s-catalog__filters .filter .filter__form:visible ');
    if(filters.length > 0) {
      btn.addClass('visible');
    }else {
      btn.removeClass('visible');
    }
  },
  check_window_width() {
    let prod_count = 4;
    let width = $(window).width();
    if(width <=960 && width > 768) {
      prod_count = 3;
    }
    if (width < 769) {
      prod_count = 4;
    }
    return prod_count;
  },
  reset_filters() {
    let that = this;
    $('.js-reset-filter').on('click', function () {
      let filters = $('.filter');
      filters.each(function () {
        $(this).addClass('toggle').find('.filter__form').slideUp()
            .find('input').prop('checked',false);
      });
      setTimeout(()=> {
        that.filter_accept_btn();
      },500);

      return
    });

  },
  nice_scroll() {
    let a  = $(".filter__list");
    a.each(function () {
      if($(this).height() > 100) {
        $(this).mCustomScrollbar({
          scrollInertia:400,
          moveDragger:true
        });
      }
    });
    },
  cut_eny_text(selector, condition,neededlength) {
    let text  = document.querySelectorAll(`.${selector}`);

    text.forEach(function (text) {
      let getText = text.textContent;

      text.textContent = getText.length > condition    ?
          text.textContent.slice(0, neededlength) + '...' :
          text.textContent;
    })
  },
  cut_product_text() {
    this.cut_eny_text('product .product__title',68,54);
  },
  close_popups(select,clas) {
    $(`.${select}`).removeClass(`${clas}`);
  },
  open_popups(select,clas) {
    $(`.${select}`).addClass(`${clas}`);
  },
  order_call_popup() {

    $('.js-order-call').on('click', () => {
      this.open_popups('order-call-popup','open');
    });

    $('.js-close').on('click',  () => {
      this.close_popups('order-call-popup','open');
    });

    $(document).on('mouseup', (e) =>{
      let p = $(".order-call-popup__wrap");
      if (!p.is(e.target) && p.has(e.target).length === 0) {
        this.close_popups('order-call-popup','open');
      }
    });
  },
  m_menu(){
    let burger = $('.jsn-nav__mobile');
    let close = () => {
      this.select.menu_mobile.addClass('close');
      this.select.menu_mobile.removeClass('open');
    };
    let open = () => {
      this.select.menu_mobile.removeClass('close');
      this.select.menu_mobile.addClass('open');
    };
    burger.on('click', () =>{
      open();
    });

    $('.js-nav__close').on('click',() => {
      close();
    });

    $(document).on('mouseup', (e) =>{
      let p = $(".nav__list");
      if (!p.is(e.target) && p.has(e.target).length === 0) {
        close();
      }
    });
  },
  m_menu_close() {
  },
  close_mobile_filters() {
    let icon = $('.js-catalog__close');
    icon.on('click', () => {
      $(this.select.filters_wrap).removeClass('active');
      $('.filters-dropdown').removeClass('active');
      $('html').removeClass('overflow');
    });
  },
  init() {
      this.sort_by();
      this.nice_scroll();
      this.cut_product_text();
      this.toggle_filter();
      this.reset_filters();
      this.order_call_popup();
      this.filter_accept_btn();
      this.check_window_width();
      this.m_menu();
      this.m_menu_close();
      this.mobile_filters_dropdown();
      this.close_mobile_filters();
      this.rater();
  },
};

App.init();








