/**
 * Assumes presence of Foundation for site.
 */
var Tabs = {
  onTabChange: function() {
    var activeTabName = $('.tabs-title.is-active').data('tab-name');
    console.log(activeTabName);
    console.log('TODO: change url param');
  },

  init: function() {
    $('.tabs-title').on('click', () => {
      this.onTabChange();
    });
  }
};

module.exports = Tabs;
