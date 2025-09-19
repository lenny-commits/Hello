document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion-btn");
  accordions.forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains("active");
      document.querySelectorAll(".accordion-item").forEach(i => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });
  const form = document.getElementById("applicationForm");
  if (!form) return;

  const roleSelect = document.getElementById("role");
  const devUpload = document.getElementById("devUpload");
  const statusMessage = document.getElementById("statusMessage");
  roleSelect.addEventListener("change", () => {
    if (roleSelect.value === "Developer") {
      devUpload.classList.add("active");
    } else {
      devUpload.classList.remove("active");
    }
  });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const webhookURL = "https://discord.com/api/webhooks/1415457793166671942/rvLOam7etOkCIODJSZg5iFdIFfmsfrqLH_ikB0DsDSURBCwh66M-6d5_09eiKXg9BIo5";

    const username = document.getElementById("username").value;
    const discord = document.getElementById("discord").value;
    const age = document.getElementById("age").value;
    const role = roleSelect.value;
    const reason = document.getElementById("reason").value;
    const files = document.getElementById("files")?.files;
    const embed = {
      title: "📩 Neue Bewerbung",
      description: `Eine neue Bewerbung wurde eingereicht!`,
      color: 0xFF7F50, 
      thumbnail: { url: "https://media.discordapp.net/attachments/1417547945041203210/1417555148875628554/698ba9caf301ae314abf8c0a9603b493tplv-tiktokx-cropcenter_720_720.webp?ex=68cd8b9c&is=68cc3a1c&hm=0efac6e60cbe07adcdbfb4c6f54be646263c38b026e78e17eb2f80c5dbb81c9f&=&format=webp&width=160&height=160" }, // öffentliche URL hier einfügen
      fields: [
        { name: "Rolle", value: role, inline: true },
        { name: "Roblox Name", value: username, inline: true },
        { name: "Discord Name", value: discord, inline: true },
        { name: "Alter", value: age, inline: true },
        { name: "Motivation", value: reason }
      ],
      footer: { text: "Wiesbaden-RP Bewerbungen" },
      timestamp: new Date().toISOString()
    };
    if (files && files.length > 0) {
      const fileList = Array.from(files).map(f => `📎 ${f.name}`).join("\n");
      embed.fields.push({ name: "Dateien", value: fileList });
    }
    const formData = new FormData();
    formData.append("payload_json", JSON.stringify({
      content: "@here",
      embeds: [embed]
    }));

    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        formData.append("files[]", file, file.name);
      });
    }
    try {
      await fetch(webhookURL, {
        method: "POST",
        body: formData
      });
      statusMessage.textContent = "✅ Bewerbung erfolgreich gesendet!";
      statusMessage.style.color = "lightgreen";
      form.reset();
      devUpload.classList.remove("active");
    } catch (err) {
      console.error(err);
      statusMessage.textContent = "❌ Fehler beim Senden!";
      statusMessage.style.color = "red";
    }
  });
});

