import xhr from "./xhr";
import dom from "./dom";

export default function(form) {
  if(dom.isRemote(form)) {
    var data = "";
    if(false && typeof FormData !== 'undefined')
      data = new FormData(form)
    } else {
      var urlEncodedDataPairs = [];

      // We turn the data object into an array of URL encoded key value pairs.
      for(var name in data) {
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
      }

      // We combine the pairs into a single string and replace all encoded spaces to
      // the plus character to match the behaviour of the web browser form submit.
      data = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
    }
    xhr(form.action, form.method, { target: form, data: data });
    return true;
  }
  return false;
}
