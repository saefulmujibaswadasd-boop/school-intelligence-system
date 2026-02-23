document.addEventListener("DOMContentLoaded", () => {

  fetch(CONFIG.SUPERVISI.URL_OBSERVASI)
    .then(res => res.text())
    .then(data => {

      const rows = data.split("\n").map(r => r.split(","));
      const header = rows[0];

      const tbody = document.querySelector("#supervisiTable tbody");

      rows.slice(1).forEach(row => {

        if (!row.length || row[0] === "") return;

        const sup = {};
        header.forEach((h, i) => {
          sup[h.trim()] = row[i];
        });

        if (sup.assessor_role !== "kepala") return; // hanya nilai kepala sekolah

        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${sup.teacher_name}</td>
          <td>${sup.tanggal_observasi}</td>
          <td>${sup.semester}</td>
          <td>${sup.tahun_ajaran}</td>
          <td>${sup.skor_rerata}</td>
          <td>${sup.kategori}</td>
          <td>${sup.assessor_role}</td>
        `;

        tbody.appendChild(tr);

      });

    })
    .catch(err => {
      console.error("Gagal memuat data supervisi:", err);
    });

});
