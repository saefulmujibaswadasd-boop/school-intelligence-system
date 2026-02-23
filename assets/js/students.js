// students.js
document.addEventListener("DOMContentLoaded", () => {
  loadStudents();
});

async function loadStudents() {
  try {
    const response = await fetch(CONFIG.STUDENTS.URL);
    const data = await response.text();
    const rows = parseCSV(data);

    renderStudents(rows);
  } catch (error) {
    console.error("Gagal load data siswa:", error);
  }
}

function renderStudents(rows) {
  const table = document.getElementById("studentsTable");
  if (!table) return;

  let html = `
    <tr>
      <th>Nama</th>
      <th>JK</th>
      <th>Kelas</th>
      <th>Tahun Masuk</th>
      <th>Status</th>
    </tr>
  `;

  rows.slice(1).forEach(row => {
    html += `
      <tr>
        <td>${row[2]}</td>
        <td>${row[3]}</td>
        <td>${row[4]}</td>
        <td>${row[5]}</td>
        <td>${row[6]}</td>
      </tr>
    `;
  });

  table.innerHTML = html;
}

function parseCSV(text) {
  return text.trim().split("\n").map(r => r.split(","));
}