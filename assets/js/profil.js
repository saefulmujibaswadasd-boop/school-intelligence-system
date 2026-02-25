document.addEventListener("DOMContentLoaded", () => {

  // Ganti filePath dengan link publik Google Sheets
  const filePath = "https://docs.google.com/spreadsheets/d/e/YOUR_PUBLIC_ID/pub?output=tsv";

  const container = document.querySelector(".sis-container");
  const spinner = document.getElementById("spinner");

  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error("File tidak ditemukan: " + filePath);
      return res.text();
    })
    .then(text => {

      if (spinner) spinner.remove();

      const lines = text.trim().split(/\r?\n/);
      if (lines.length < 2) throw new Error("Sheet kosong atau tidak valid");

      const headers = lines[0].split("\t"); // TSV

      lines.slice(1).forEach(line => {
        if (!line.trim()) return;

        const values = line.split("\t");
        const profil = {};
        headers.forEach((h, i) => profil[h.trim()] = values[i] ? values[i].trim() : "");

        const card = document.createElement("section");
        card.className = "sis-card";

        card.innerHTML = `
          <div class="sis-card__header">
            <h2>${profil.nama_sekolah || "-"}</h2>
          </div>
          <div class="sis-card__body">
            ${profil.alamat ? `<div><b>Alamat:</b> ${profil.alamat}</div>` : ""}
            ${profil.kepala_sekolah ? `<div><b>Kepala Sekolah:</b> ${profil.kepala_sekolah}</div>` : ""}
            ${profil.npsn ? `<div><b>NPSN:</b> ${profil.npsn}</div>` : ""}
            ${profil.akreditasi ? `<div><b>Akreditasi:</b> ${profil.akreditasi}</div>` : ""}
            ${profil.visi ? `<h3>Visi</h3><p>${profil.visi}</p>` : ""}
            ${profil.misi ? `<h3>Misi</h3><p>${profil.misi}</p>` : ""}
            ${profil.tujuan ? `<h3>Tujuan</h3><p>${profil.tujuan}</p>` : ""}
          </div>
        `;

        container.appendChild(card);
      });

    })
    .catch(err => {
      if (spinner) spinner.remove();
      container.innerHTML = `<p style="color:red; text-align:center;">Gagal memuat data: ${err.message}</p>`;
      console.error("Error Profil:", err.message);
    });

});
