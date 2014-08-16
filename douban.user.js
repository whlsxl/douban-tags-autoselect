// ==UserScript==
// @name AutoDouban
// @author whl
// @description 豆瓣电影，豆瓣读书，豆瓣音乐，评论自动添加标签。
// @version 0.1.0
// @namespace https://github.com/whlsxl/douban-tags-autoselect
// @match http://book.douban.com/*
// @match http://movie.douban.com/*
// @match http://music.douban.com/*
// @run-at document-idle
// @copyright 2014+, Hailong
// ==/UserScript==

if(typeof isChromeExtension == 'undefined'){
  addJQuery(init);
}else{
  function onReadyGM(){
    addJQuery(init);
  };
};

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//upcdn.b0.upaiyun.com/libs/jquery/jquery-2.0.3.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function init() {
  $(document).ajaxSuccess(function(event, xhr, settings) {
    var reg = new RegExp("/j/subject/\\d+/interest","i");
    if (reg.exec(settings.url) != null && $('#advtags li.clearfix .auto_select').length == 0) {
      $('#advtags li.clearfix').each(function() {
        var tagp = $(this);

        var auto_select = '<input class="auto_select" type="checkbox">全选';
        $('dt',tagp).append(auto_select);
        $('.auto_select',tagp).change(function(event) {
          if ($("#dialog").length) {
            var selectClass = 'gract';
            var parent = $(this).parents("li").eq(0);
            var checked = $(this).is(":checked");
            window.localStorage['auto_select' + tagp.attr('id')] = checked;
            if (!checked) {
              selectClass = 'rdact';
            }
            parent.click();
            $('span.' + selectClass, parent).each(function(){
              if ($(this).hasClass(selectClass)) {
                $(this).click();
              };
            });
          };
        });

        var last_auto_select = window.localStorage['auto_select' + tagp.attr('id')];
        if (window.localStorage && !(last_auto_select === undefined) && last_auto_select == 'true') {
          $('.auto_select',tagp).attr('checked', true);
          $('.auto_select',tagp).change();
        }
      });
    };
  });
}
