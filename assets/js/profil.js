document.addEventListener("DOMContentLoaded", function () {

  // Path dari profil.html (di /pages) ke file data
  const filePath = "../assets/data/profil.csv";

  fetch(filePath)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("File tidak ditemukan: " + filePath);
      }
      return response.text();
    })
    .then(function (text) {

      const lines = text.trim().split(/\r?\n/);

      if (lines.length < 2) {
        throw new Error("Format CSV tidak valid");
      }

      const headers = lines[0].split(",");
      const values = lines[1].split(",");

      const profil = {};

      headers.forEach(function (header, index) {
        profil[header.trim()] = values[index]
          ? values[index].trim()
          : "-";
      });

      setText("namaSekolah", profil.nama_sekolah);
      setText("alamatSekolah", profil.alamat);
      setText("kepalaSekolah", profil.kepala_sekolah);
      setText("npsnSekolah", profil.npsn);
      setText("akreditasiSekolah", profil.akreditasi);
      setText("visiSekolah", profil.visi);
      setText("misiSekolah", profil.misi);
      setText("tujuanSekolah", profil.tujuan);

    })
    .catch(function (error) {
      console.error("Error Profil:", error.message);
    });

});

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value || "-";
  }
}
