document.addEventListener("DOMContentLoaded", () => {

  fetch("profil.csv")
    .then(response => {
      if (!response.ok) {
        throw new Error("File profil.csv tidak ditemukan");
      }
      return response.text();
    })
    .then(data => {

      const rows = data.trim().split("\n").map(row => row.split(","));

      if (rows.length < 2) {
        throw new Error("Format CSV tidak valid (minimal 2 baris)");
      }

      const header = rows[0];
      const values = rows[1];

      const profil = {};
      header.forEach((h, i) => {
        profil[h.trim()] = values[i] ? values[i].trim() : "";
      });

      document.getElementById("namaSekolah").textContent = profil.nama_sekolah || "-";
      document.getElementById("alamatSekolah").textContent = profil.alamat || "-";
      document.getElementById("kepalaSekolah").textContent = profil.kepala_sekolah || "-";
      document.getElementById("npsnSekolah").textContent = profil.npsn || "-";
      document.getElementById("akreditasiSekolah").textContent = profil.akreditasi || "-";
      document.getElementById("visiSekolah").textContent = profil.visi || "-";
      document.getElementById("misiSekolah").textContent = profil.misi || "-";
      document.getElementById("tujuanSekolah").textContent = profil.tujuan || "-";

    })
    .catch(error => {
      console.error("Terjadi kesalahan:", error.message);
    });

});
