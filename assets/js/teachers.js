document.addEventListener("DOMContentLoaded", () => {

  fetch(CONFIG.TEACHERS.URL)
    .then(res => res.text())
    .then(data => {

      const rows = data.split("\n").map(r => r.split(","));
      const header = rows[0];

      let html = `
        <tr>
          <th>Foto</th>
          ${header.map(h => `<th>${h}</th>`).join("")}
        </tr>
      `;

      rows.slice(1).forEach(row => {

        const teacherId = row[0];
        const foto = `../assets/img/guru/${teacherId}.jpg`;

        html += `
          <tr>
            <td>
              <img src="${foto}" class="avatar-guru"
              onerror="this.src='../assets/img/ui/default-avatar.png'">
            </td>
            ${row.map(col => `<td>${col}</td>`).join("")}
          </tr>
        `;
      });

      document.getElementById("teachersTable").innerHTML = html;

    });

});
