document.addEventListener("DOMContentLoaded", () => {

  // Path relatif dari /pages/profil.html
  const filePath = "../assets/data/profil.csv"; // Jika CSV ada di /assets/data

  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error("File tidak ditemukan: " + filePath);
      return res.text();
    })
    .then(text => {
      const lines = text.trim().split(/\r?\n/);
      if (lines.length < 2) throw new Error("CSV tidak valid");

      const headers = lines[0].split(",");
      const values = lines[1].split(",");

      const profil = {};
      headers.forEach((h, i) => profil[h.trim()] = values[i] ? values[i].trim() : "-");

      setText("namaSekolah", profil.nama_sekolah);
      setText("alamatSekolah", profil.alamat);
      setText("kepalaSekolah", profil.kepala_sekolah);
      setText("npsnSekolah", profil.npsn);
      setText("akreditasiSekolah", profil.akreditasi);
      setText("visiSekolah", profil.visi);
      setText("misiSekolah", profil.misi);
      setText("tujuanSekolah", profil.tujuan);
    })
    .catch(err => console.error("Error Profil:", err.message));

});

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "-";
}
