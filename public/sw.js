// ===== INSTALL & ACTIVATE =====
self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(clients.claim());
});

// ===== PUSH NOTIFICATION (iOS + Android compatible) =====
self.addEventListener('push', function (event) {
  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { body: event.data.text() };
    }
  }

  const title = data.title || 'Mosquée Ar-Rahmane';
  const options = {
    body: data.body || 'Nouvelle notification',
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    vibrate: [200, 100, 200],
    renotify: true,
    tag: data.tag || 'default',
    data: {
      dateOfArrival: Date.now(),
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// ===== NOTIFICATION CLICK =====
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  var targetUrl = '/';
  if (event.notification.data && event.notification.data.url) {
    targetUrl = event.notification.data.url;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      // Chercher un onglet/fenêtre déjà ouvert(e) sur notre app
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if ('focus' in client) {
          return client.navigate(targetUrl).then(function (c) {
            return c.focus();
          });
        }
      }
      // Aucun onglet ouvert → en ouvrir un nouveau
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
