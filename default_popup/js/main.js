var DEFAULT_STORAGE = {
  'rps': 1,
  'inversed': false
};

$(document).ready(function(){
  // rps shorts for *rotate per second*
  var onPageLoad = function() {
    chrome.storage.local.get('rps', function (keyValuePair) {
      var rps = keyValuePair['rps'];
      if (rps === null) {
        $('#input-rps').val(DEFAULT_STORAGE['rps']);
        chrome.storage.local.set({'rps': DEFAULT_STORAGE['rps']}, function () {});
      } else {
        $('#input-rps').val(rps);
      }
    });
    chrome.storage.local.get('inversed', function (keyValuePair) {
      var inversed = keyValuePair['inversed'];
      if (inversed === null) {
        $('#checkbox-inversed').attr('checked', DEFAULT_STORAGE['inversed']);
        chrome.storage.local.set({'inversed': DEFAULT_STORAGE['inversed']}, function () {});
      } else {
        $('#checkbox-inversed').prop('checked', inversed);
      }
    });
  };
  onPageLoad();

  $('#input-rps').on('change', function() {
    chrome.storage.local.set({'rps': $('#input-rps').val()}, function () {});
  });

  $('#checkbox-inversed').on('change', function() {
    chrome.storage.local.set({'inversed': $('#checkbox-inversed').prop('checked')}, function () {});
  });

  $('#button-apply').on('click', function() {
    chrome.tabs.query({url: "*://*.twitter.com/*"}, function (tabs) {
      tabs.forEach(function(tab){
         chrome.tabs.reload(tab.id);
      });
    });
  });
});
