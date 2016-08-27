var notificationStarted = false;

function notificationStart() {
  if (notificationStarted) return;
  notificationStarted = true;
  setInterval(function() {
    var notification = new Notification('title', {
      body: (new Date()).toString(),
      vibrate: [200, 100, 200],
      tag: 'a',
      renotify: true,
    });
  }, 5000);
}

window.addEventListener('load', function() {
  var p = document.createElement('p');
  p.textContent = 'no';
  if ('webkitNotifications' in window) {
    p.textContent = 'webkitNotifications';
    Notification = webkitNotifications;
  }
  if ('Notification' in window) {
    p.textContent = 'Notification';
    if (Notification.permission === "granted") {
      notificationStart();
    }else{
      document.getElementsByTagName('button')[0].addEventListener('click', function() {
        Notification.requestPermission(function(permission) {
          if (permission === 'granted') notificationStart();
        });
      });
    }
  }
  document.getElementsByTagName('body')[0].appendChild(p);
});
