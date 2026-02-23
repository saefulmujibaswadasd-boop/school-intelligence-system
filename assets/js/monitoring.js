// MONITORING SIS 2026

async function loadMonitoring() {
  const response = await fetch(CONFIG.TEACHERS.URL);
  const data = await response.text();
  const rows = data.split("\n").slice(1);

  let totalGuru = rows.length;
  let guruAktif = rows.filter(r => r.includes("Aktif")).length;

  document.getElementById("totalGuru").innerText = totalGuru;
  document.getElementById("guruAktif").innerText = guruAktif;
}

document.addEventListener("DOMContentLoaded", loadMonitoring);