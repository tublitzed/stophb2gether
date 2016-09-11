/**
 * Url utils.
 */
var url = {

  /**
   * TODO: move to string util if/when you add one, that's all this is.
   *
   * Does a given query string key exist in url.
   * @param  {string} url
   * @param  {string} key
   * @return {boolean}
   */
  keyExistsInUrl: function(url, key) {
    var patt = key + '=';
    var re = new RegExp(patt, 'i');
    return re.test(url)
  },

  /**
   * Returns url param from query string.
   * @param  {string} str
   * @return {string}
   */
  getParam: function(key) {
    var queryParams = window.location.search;

    if (queryParams && this.keyExistsInUrl(queryParams, key)) {
      var patt = key + '=([^&|\\s]+)';
      var re = new RegExp(patt, 'i');
      var match = queryParams.match(re);
      return match[1] || null;
    }

    return null;
  },

  /**
   * Add param to url string
   * @param {[type]} key         [description]
   * @param {[type]} value       [description]
   * @param {[type]} existingStr [description]
   */
  addParam: function(key, value, existingStr) {
    var str = existingStr || '';
    if (/(\?)/.test(str)) {
      //already have query params, just not this one.
      return str + '&' + key + '=' + value;
    }
    return str + '?' + key + '=' + value;
  },

  /**
   * Replace param value in a url string.
   *
   * @param  {string} key
   * @param  {string} value
   * @param  {str} url
   * @return {str}
   */
  replaceParam: function(key, value, url) {
    var patt = '(' + key + '=[^&|\\s]+)';
    var re = new RegExp(patt, 'i');
    return url.replace(re, key + '=' + value);
  },

  /**
   * Replace query string value if it exists. If the string does not exist in the url, it will be added.
   *
   * @param {string} key
   * @param {string} value
   * @param {existingStr=} optional search string, if not set use url.
   *
   * @return {string} - new url with value added/replaced
   */
  addReplaceParam: function(key, value, existingStr) {
    var str = existingStr || window.location.search;

    if (!str) {
      return this.addParam(key, value, str);
    }

    if (this.keyExistsInUrl(str, key)) {
      return this.replaceParam(key, value, str);
    }
    return this.addParam(key, value, str);
  },
};

module.exports = url;
