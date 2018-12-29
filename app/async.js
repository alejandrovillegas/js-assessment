asyncAnswers = {
  /**
   * Asynchronously returns a value via a promise. Example:
   * async('anyValue').then((result) => { return result === 'anyValue';});
   *
   * @param value - Any value
   * @returns {then: function} A promise like object containing a then property.
   */
  async: function async(value) {
    const p1 = new Promise(
      (resolve, reject) => {
        window.setTimeout(
          () => resolve(value), 100);
      },
    );
    return p1;
  },

  /**
   * Creates a promise that resolves with the data returned from an ajax call to the url url.
   * You may use jquery, XMLHttpRequest, or fetch.
   * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
   * https://api.jquery.com/jQuery.ajax/
   * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API   *
   *
   * @param {String} url - a valid url
   * @returns {then: function} A promise like object containing a then property.
   */
  manipulateRemoteData: function manipulateRemoteData(url) {
    const xmlhttp = new XMLHttpRequest();
    return {
      then: (callback) => {
        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState === 4 && xmlhttp.status >= 200 && xmlhttp.status < 400) {
            const result = JSON.parse(xmlhttp.responseText);
            const names = result.people.map(item => item['name']).sort();
            return callback(names);
          }
        };
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
      },
    };
  },
};
