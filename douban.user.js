// ==UserScript==
// @name AutoDouban
// @author whl
// @description 豆瓣电影，自动添加标签
// @version 0.1.0
// @namespace https://github.com/whlsxl/douban-rate-autoselect
// @match http://movie.douban.com/*
// @run-at document-idle
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
    if (settings.url == "/j/subject/1418190/interest?interest=collect") {
      $('#advtags li.clearfix').each(function() {
        var tagp = $(this);

        var auto_select = '<input class="auto_select" type="checkbox">全选';
        $('dt',tagp).append(auto_select);
        $('.auto_select',tagp).change(function(event) {
          if ($("#dialog").length) {
            var selectClass = 'gract';
            var parent = $(this).parents("li").eq(0);
            var checked = $(this).is(":checked");
            window.localStorage['auto_select' + parent.attr('id')] = checked;
            if (!checked) {
              selectClass = 'rdact';
            }
            console.log(parent.find('span.' + selectClass));
            $('span.' + selectClass, parent).trigger('click');
          };
        });

        var last_auto_select = window.localStorage['auto_select' + tagp.attr('id')];
        if (window.localStorage && !(last_auto_select === undefined) && last_auto_select) {
          $('.auto_select',tagp).click();
        }
      });
    };
  });
}
