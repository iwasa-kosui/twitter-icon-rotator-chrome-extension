var DEFAULT_RPS = 1;

$(document).ready(function(){
  // rps shorts for *rotate per second*
  var onPageLoad = function() {
    chrome.storage.local.get('rps', function (keyValuePair) {
      var rps = keyValuePair['rps'];
      if (rps === null) {
        $('#input-rps').val(DEFAULT_RPS);
        localStorage.setItem('rps', DEFAULT_RPS);
        chrome.storage.local.set({'rps': DEFAULT_RPS}, function () {});
      } else {
        $('#input-rps').val(rps);
      }
    });
  };
  onPageLoad();

  $('#input-rps').on('change', function() {
    chrome.storage.local.set({'rps': $('#input-rps').val()}, function () {});
  });

  $('#button-apply').on('click', function() {
    chrome.storage.local.set({'rps': $('#input-rps').val()}, function () {});
    chrome.tabs.query({url: "*://*.twitter.com/*"}, function (tabs) {
      tabs.forEach(function(tab){
         chrome.tabs.reload(tab.id);
      });
    });
  });
});
