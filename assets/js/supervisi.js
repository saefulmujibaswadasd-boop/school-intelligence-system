// supervisi.js
document.addEventListener("DOMContentLoaded", () => {
  loadSupervisi();
});

async function loadSupervisi() {
  try {
    const response = await fetch(CONFIG.SUPERVISI.URL_OBSERVASI);
    const data = await response.text();
    const rows = parseCSV(data);

    renderSupervisi(rows);
  } catch (error) {
    console.error("Gagal load data supervisi:", error);
  }
}

function renderSupervisi(rows) {
  const table = document.getElementById("supervisiTable");
  if (!table) return;

  let html = `
    <tr>
      <th>Guru</th>
      <th>Tanggal</th>
      <th>Semester</th>
      <th>Rata-rata</th>
      <th>Kategori</th>
    </tr>
  `;

  rows.slice(1).forEach(row => {
    html += `
      <tr>
        <td>${row[3]}</td>
        <td>${row[6]}</td>
        <td>${row[7]}</td>
        <td>${row[10]}</td>
        <td>${row[11]}</td>
      </tr>
    `;
  });

  table.innerHTML = html;
}

function parseCSV(text) {
  return text.trim().split("\n").map(r => r.split(","));
}