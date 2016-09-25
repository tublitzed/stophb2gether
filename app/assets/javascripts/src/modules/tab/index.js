var urlUtil = require('../../util/url');

/**
 * Assumes the presence of Foundation, using the Tabs API.
 * @link http://foundation.zurb.com/sites/docs/tabs.html
 */
var Tab = {
  /**
   * Adjust url param on tab change.
   */
  onTabChange: function() {
    var activeTabName = $('.tabs-title.is-active').data('tab-name');
    var path = document.location.pathname;
    var params = urlUtil.addReplaceParam('tab', activeTabName);
    if (params) {
      path += params;
    }
    window.history.pushState(null, window.document.title, path);
  },


  /**
   * Init tabs
   */
  init: function() {
    $('.tabs').bind('change.zf.tabs', () => {
      setTimeout(() => {
        this.onTabChange();
      });
    });
  }
};

module.exports = Tab;
