document.getElementById("run-bot").onclick = () => {
  const input = document.getElementById("bot-input").value.trim();
  const output = document.getElementById("bot-output");

  if (!input) {
    output.textContent = "Lütfen bir rapor yazın.";
    return;
  }

  // Basit komut sistemi
  let response = "Bot çalıştı: ";
  if (input.includes("tema koyulaştır")) {
    document.body.style.background = "#111";
    document.body.style.color = "#eee";
    response += "Tema koyulaştırıldı.";
  } else if (input.includes("logları temizle")) {
    const log = document.getElementById("log");
    if (log) log.textContent = "";
    response += "Loglar temizlendi.";
  } else {
    response += "Komut tanınmadı.";
  }

  output.textContent = response;
};
