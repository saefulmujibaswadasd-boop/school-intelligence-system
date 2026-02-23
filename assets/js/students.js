document.addEventListener("DOMContentLoaded", () => {

  fetch(CONFIG.STUDENTS.URL)
    .then(res => res.text())
    .then(data => {

      const rows = data.split("\n").map(r => r.split(","));
      const header = rows[0];

      const tbody = document.querySelector("#studentsTable tbody");

      rows.slice(1).forEach(row => {

        if (!row.length || row[0] === "") return;

        const siswa = {};
        header.forEach((h, i) => {
          siswa[h.trim()] = row[i];
        });

        if (siswa.status_aktif !== "Aktif") return;

        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${siswa.nama}</td>
          <td>${siswa.jk}</td>
          <td>${siswa.kelas}</td>
          <td>${siswa.tahun_masuk}</td>
          <td>${siswa.status_aktif}</td>
        `;

        tbody.appendChild(tr);

      });

    })
    .catch(err => {
      console.error("Gagal memuat data siswa:", err);
    });

});
