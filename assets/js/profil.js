document.addEventListener("DOMContentLoaded", () => {

  const loading = document.getElementById("loading");
  const container = document.getElementById("profilContainer");

  fetch("profil.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Gagal mengambil data");
      }
      return response.json();
    })
    .then(data => {

      loading.style.display = "none";

      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "<p>Data profil tidak tersedia.</p>";
        return;
      }

      data.forEach(profil => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h2>${profil.nama_sekolah || "-"}</h2>
          <p><span class="label">Alamat:</span> ${profil.alamat || "-"}</p>
          <p><span class="label">Kepala Sekolah:</span> ${profil.kepala_sekolah || "-"}</p>
          <p><span class="label">NPSN:</span> ${profil.npsn || "-"}</p>
          <p><span class="label">Akreditasi:</span> ${profil.akreditasi || "-"}</p>
          <p><span class="label">Visi:</span> ${profil.visi || "-"}</p>
          <p><span class="label">Misi:</span> ${profil.misi || "-"}</p>
          <p><span class="label">Tujuan:</span> ${profil.tujuan || "-"}</p>
        `;

        container.appendChild(card);
      });

    })
    .catch(error => {
      loading.style.display = "none";
      container.innerHTML = `<p style="color:red;">Terjadi kesalahan: ${error.message}</p>`;
      console.error(error);
    });

});
