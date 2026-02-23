document.addEventListener("DOMContentLoaded", () => {

  fetch(CONFIG.TEACHERS.URL)
    .then(res => res.text())
    .then(data => {

      const rows = data.split("\n").map(r => r.split(","));
      const header = rows[0];

      const tbody = document.querySelector("#teachersTable tbody");

      rows.slice(1).forEach(row => {

        if (!row.length || row[0] === "") return;

        const guru = {};
        header.forEach((h, i) => {
          guru[h.trim()] = row[i];
        });

        if (guru.status_aktif !== "Aktif") return;

        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${guru.nama}</td>
          <td>${guru.jabatan}</td>
          <td>${guru.kelas_diampu || "-"}</td>
          <td>${guru.status_aktif}</td>
          <td>${guru.pendidikan}</td>
        `;

        tbody.appendChild(tr);

      });

    })
    .catch(err => {
      console.error("Gagal memuat data guru:", err);
    });

});
