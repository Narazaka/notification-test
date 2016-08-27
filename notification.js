var notificationStarted = false;

var title = 'title';
function options() {
  return {
    body: (new Date()).toString(),
    vibrate: [200, 100, 200],
    // tag: 'a',
    // renotify: true,
  };
}

function notificationStart() {
  var p = document.getElementsByTagName('p')[0];
  p.textContent = 'Notification start';
  if (notificationStarted) return;
  notificationStarted = true;
  if ('ServiceWorkerRegistration' in window && ServiceWorkerRegistration.showNotification) {
    p.textContent = 'Notification start sw';
    navigator.serviceWorker.ready.then(function(registraqtion) {
      setInterval(function() {
        try {
          ServiceWorkerRegistration.showNotification(title, options());
        } catch (error) {
          p.textContent = "" + error;
        }
      }, 5000);
    });
  } else {
    p.textContent = 'Notification start normal';
    setInterval(function() {
      try {
        var notification = new Notification(title, options());
      } catch (error) {
        p.textContent = "" + error;
      }
    }, 5000);
  }
}

window.addEventListener('load', function() {
  var p = document.createElement('p');
  document.getElementsByTagName('body')[0].appendChild(p);
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
        p.textContent = 'Notification request';
        Notification.requestPermission(function(permission) {
          if (permission === 'granted') notificationStart();
        });
      });
    }
  }
});
