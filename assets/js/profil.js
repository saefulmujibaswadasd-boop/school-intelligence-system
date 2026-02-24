document.addEventListener("DOMContentLoaded", () => {

  const BASE_PATH = window.location.origin + window.location.pathname.split("/pages")[0];

  const filePath = BASE_PATH + "/assets/data/profil.csv";

  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error("File tidak ditemukan di: " + filePath);
      }
      return response.text();
    })
    .then(text => {

      const lines = text.trim().split(/\r?\n/);

      if (lines.length < 2) {
        throw new Error("Format CSV tidak valid");
      }

      const headers = lines[0].split(",");
      const values = lines[1].split(",");

      const profil = {};

      headers.forEach((h, i) => {
        profil[h.trim()] = values[i] ? values[i].trim() : "-";
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
    .catch(error => {
      console.error("Error Profil:", error.message);
    });

});

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "-";
}
