async function fetchCSV(url) {
  const response = await fetch(url);
  const data = await response.text();
  return data.split("\n").slice(1);
}

function hitungKategori(rata) {
  if (rata >= 4.5) return "Sangat Unggul";
  if (rata >= 3.5) return "Baik";
  if (rata >= 2.5) return "Cukup";
  return "Perlu Pembinaan";
}

async function loadMonitoring() {
  try {

    // Teachers
    const guruData = await fetchCSV(CONFIG.TEACHERS.URL);
    const totalGuru = guruData.filter(r => r.trim() !== "").length;
    document.getElementById("totalGuru").innerText = totalGuru;

    // Students
    const siswaData = await fetchCSV(CONFIG.STUDENTS.URL);
    const totalSiswa = siswaData.filter(r => r.trim() !== "").length;
    document.getElementById("totalSiswa").innerText = totalSiswa;

    // Supervisi
    const supervisiData = await fetchCSV(CONFIG.SUPERVISI.URL_OBSERVASI);
    const rows = supervisiData.filter(r => r.trim() !== "");

    document.getElementById("totalSupervisi").innerText = rows.length;

    let totalSkor = 0;
    rows.forEach(row => {
      const cols = row.split(",");
      const skor = parseFloat(cols[10]); // skor_rerata (sesuaikan jika beda posisi)
      if (!isNaN(skor)) totalSkor += skor;
    });

    const rata = rows.length ? (totalSkor / rows.length).toFixed(2) : 0;

    document.getElementById("rataSkor").innerText = rata;
    document.getElementById("kategoriMutu").innerText = hitungKategori(rata);

  } catch (error) {
    console.error("Monitoring error:", error);
  }
}

loadMonitoring();
