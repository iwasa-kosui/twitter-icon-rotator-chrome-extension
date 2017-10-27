var onPageLoad = function() {
  chrome.storage.local.get('rps', function (keyValuePair) {
    // rps shorts for *rotate per second*
    var rps = keyValuePair['rps'];

    // set 1 as default value if rotate-speed is not set in localStorage
    if (rps === undefined || rps === null) {
      rps = 1;
      chrome.storage.local.set({'rps': 1}, function () {});
    }

    // force formatting "[0-9]+\.[0-9]+"
    if (parseInt(rps) == rps) {
      rps = parseInt(s) + '.0';
    }

    chrome.storage.local.get('inversed', function (keyValuePair) {
      var inversed = keyValuePair['inversed'];
      var spin = inversed ? 'spin-inversed' : 'spin';

      var style = document.createElement('style');

      style.innerText += '.ProfileAvatar-image, .js-action-profile-avatar, .avatar, .Avatar, .MomentUserByline-avatar {';
      style.innerText += '    animation: ' + spin + ' ' + 1.0 / rps + 's linear infinite;';
      style.innerText += '}';

      // WebKit hack
      style.appendChild(document.createTextNode(''));

      document.head.appendChild(style);
    });
  });
};
onPageLoad();

chrome.runtime.onMessage.addListener((message, sender, response) => {
  console.log(message);
  onPageLoad();
});
