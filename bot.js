(function() {
  const status = {
    indexExists: false,
    linksWorking: true,
    lastChecked: new Date().toISOString()
  };

  // index.html kontrolü
  fetch("index.html")
    .then(res => {
      status.indexExists = res.ok;
      return res.text();
    })
    .then(html => {
      // Bağlantı kontrolü (örnek)
      const links = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
      return Promise.all(links.map(link => fetch(link).then(r => r.ok).catch(() => false)));
    })
    .then(results => {
      status.linksWorking = results.every(ok => ok);
      console.log("Site Durumu:", status);
      document.getElementById("bot-status").textContent = JSON.stringify(status, null, 2);
    })
    .catch(err => {
      console.error("Bot hatası:", err);
    });
})();
