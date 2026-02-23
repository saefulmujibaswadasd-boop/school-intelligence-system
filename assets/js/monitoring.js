document.addEventListener("DOMContentLoaded", () => {

  // ===== HITUNG GURU =====
  fetch(CONFIG.TEACHERS.URL)
    .then(res => res.text())
    .then(data => {
      const rows = data.split("\n").map(r => r.split(","));
      const header = rows[0];
      let total = 0;

      rows.slice(1).forEach(row => {
        const obj = {};
        header.forEach((h, i) => obj[h.trim()] = row[i]);

        if (obj.status_aktif === "Aktif") total++;
      });

      document.getElementById("totalGuru").textContent = total;
    });

  // ===== HITUNG SISWA =====
  fetch(CONFIG.STUDENTS.URL)
    .then(res => res.text())
    .then(data => {
      const rows = data.split("\n").map(r => r.split(","));
      const header = rows[0];
      let total = 0;

      rows.slice(1).forEach(row => {
        const obj = {};
        header.forEach((h, i) => obj[h.trim()] = row[i]);

        if (obj.status_aktif === "Aktif") total++;
      });

      document.getElementById("totalSiswa").textContent = total;
    });

  // ===== ANALISIS SUPERVISI =====
  fetch(CONFIG.SUPERVISI.URL_OBSERVASI)
    .then(res => res.text())
    .then(data => {
      const rows = data.split("\n").map(r => r.split(","));
      const header = rows[0];

      let totalSkor = 0;
      let jumlah = 0;
      let kategoriCount = {};

      rows.slice(1).forEach(row => {
        const obj = {};
        header.forEach((h, i) => obj[h.trim()] = row[i]);

        if (obj.assessor_role !== "kepala") return;

        totalSkor += parseFloat(obj.skor_rerata || 0);
        jumlah++;

        kategoriCount[obj.kategori] =
          (kategoriCount[obj.kategori] || 0) + 1;
      });

      const rata = jumlah ? (totalSkor / jumlah).toFixed(2) : 0;
      document.getElementById("rataSupervisi").textContent = rata;

      let dominan = "-";
      let max = 0;

      for (let k in kategoriCount) {
        if (kategoriCount[k] > max) {
          max = kategoriCount[k];
          dominan = k;
        }
      }

      document.getElementById("kategoriDominan").textContent = dominan;
    });

});
