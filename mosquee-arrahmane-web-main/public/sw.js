self.addEventListener('push', function(event) {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  const data = event.data ? event.data.json() : {};
  
  const title = data.title || 'Mosquée Ar-Rahmane';
  const options = {
    body: data.body || 'Nouvelle notification',
    icon: '/pwa-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
      url: data.url || '/'
    },
    actions: [
      { action: 'explore', title: 'Voir' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      const url = event.notification.data.url;
      
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});