document.addEventListener("DOMContentLoaded", () => {

  fetch(CONFIG.PROFIL.URL)
    .then(res => res.text())
    .then(data => {

      const rows = data.split("\n").map(r => r.split(","));
      const header = rows[0];
      const values = rows[1];

      const profil = {};
      header.forEach((h, i) => {
        profil[h.trim()] = values[i];
      });

      document.getElementById("namaSekolah").textContent = profil.nama_sekolah;
      document.getElementById("alamatSekolah").textContent = profil.alamat;
      document.getElementById("kepalaSekolah").textContent = profil.kepala_sekolah;

    });

});
