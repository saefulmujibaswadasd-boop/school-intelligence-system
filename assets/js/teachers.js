// teachers.js
document.addEventListener("DOMContentLoaded", () => {
  loadTeachers();
});

async function loadTeachers() {
  try {
    const response = await fetch(CONFIG.TEACHERS.URL);
    const data = await response.text();
    const rows = parseCSV(data);

    renderTeachers(rows);
  } catch (error) {
    console.error("Gagal load data guru:", error);
  }
}

function renderTeachers(rows) {
  const table = document.getElementById("teachersTable");
  if (!table) return;

  let html = `
    <tr>
      <th>Nama</th>
      <th>Jabatan</th>
      <th>Status</th>
      <th>Kelas</th>
    </tr>
  `;

  rows.slice(1).forEach(row => {
    html += `
      <tr>
        <td>${row[2]}</td>
        <td>${row[7]}</td>
        <td>${row[10]}</td>
        <td>${row[9]}</td>
      </tr>
    `;
  });

  table.innerHTML = html;
}

function parseCSV(text) {
  return text.trim().split("\n").map(r => r.split(","));
}