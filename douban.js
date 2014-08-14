// ==UserScript==
// @name AutoDouban
// @author whl
// @description 豆瓣电影，自动添加标签
// @version 0.1.0
// @namespace http://userscripts.org/users/Kawaiiushio
// @icon http://extensiondl.maxthon.cn/skinpack/17276781/1366787326/icons/icon_48.png
// @include http://movie.douban.com/*
// @run-at document-start
// ==/UserScript==

(function() {
  var old_populate_tag_btns = populate_tag_btns;
  populate_tag_btns = function(g, h, b, e) {
    old_populate_tag_btns.apply(this, arguments);
    var auto_select = '<input class="auto_select" type="checkbox">全选';
    $('dt',h).append(auto_select);
    $('.auto_select',h).change(function(event) {
      if ($("#dialog").length) {
        var selectClass = 'gract';
        var parent = $(this).parents("li").eq(0);
        var checked = $(this).is(":checked");
        window.localStorage['auto_select' + parent.attr('id')] = checked;
        if (!checked) {
          selectClass = 'rdact';
        }
        parent.find('span.' + selectClass).trigger('click');
      };
    });
  }

  $('.a_collect_btn,.collect_btn').each(function() {
    $(this).click(function(){
      if(window.localStorage) {
        console.log($('#advtags li.clearfix').length);
        $('#advtags li.clearfix').each(function() {
          var h = $(this);
          var auto_select = window.localStorage['auto_select' + h.attr('id')];
          console.log('ssss');
          console.log('auto_select' + h.attr('id'));
          console.log(auto_select);
          if (!(auto_select === undefined)) {
            $('.auto_select',h).attr('checked', window.localStorage['auto_select' + h.attr('id')]);
          }
        });
      }
    });
  });
})();
