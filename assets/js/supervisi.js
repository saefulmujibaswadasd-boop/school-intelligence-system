// ===============================
// e-Supervisi Digital - FINAL
// ===============================

let indikatorList = [];

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  loadTeachers();
  loadIndikator();
});

// ===============================
// LOAD TEACHERS
// ===============================
function loadTeachers() {
  fetch(CONFIG.TEACHERS.URL)
    .then(res => res.text())
    .then(data => {
      const rows = data.trim().split("\n").map(r => r.split(","));
      const header = rows[0];
      const select = document.getElementById("teacherSelect");

      select.innerHTML = '<option value="">-- Pilih Guru --</option>';

      rows.slice(1).forEach(row => {
        if (row.length < header.length) return;

        const obj = {};
        header.forEach((h, i) => obj[h.trim()] = row[i]?.trim());

        if (obj.status_aktif === "Aktif") {
          const opt = document.createElement("option");
          opt.value = obj.teacher_id;
          opt.textContent = obj.nama;
          select.appendChild(opt);
        }
      });
    })
    .catch(err => {
      console.error("Gagal load guru:", err);
      alert("Data guru gagal dimuat.");
    });
}

// ===============================
// LOAD INDIKATOR
// ===============================
function loadIndikator() {
  fetch(CONFIG.SUPERVISI.URL_INDIKATOR)
    .then(res => res.text())
    .then(data => {

      indikatorList = [];

      const rows = data.trim().split("\n").map(r => r.split(","));
      const header = rows[0];
      const container = document.getElementById("indikatorContainer");

      container.innerHTML = "";

      rows.slice(1).forEach(row => {
        if (row.length < header.length) return;

        const obj = {};
        header.forEach((h, i) => obj[h.trim()] = row[i]?.trim());

        if (obj.aktif === "TRUE") {
          indikatorList.push(obj);

          const div = document.createElement("div");
          div.classList.add("indikator-item");

          div.innerHTML = `
            <label>${obj.indikator}</label>
            <select class="skorInput">
              <option value="">-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          `;

          container.appendChild(div);
        }
      });
    })
    .catch(err => {
      console.error("Gagal load indikator:", err);
      alert("Data indikator gagal dimuat.");
    });
}

// ===============================
// VALIDASI FORM
// ===============================
function validasiForm() {
  const guru = document.getElementById("teacherSelect").value;
  const tanggal = document.getElementById("tanggal").value;

  if (!guru || !tanggal) {
    alert("Lengkapi guru dan tanggal terlebih dahulu.");
    return false;
  }
  return true;
}

// ===============================
// HITUNG SKOR
// ===============================
function hitungSkor() {

  if (!validasiForm()) return;

  const skorInputs = document.querySelectorAll(".skorInput");

  if (skorInputs.length === 0) {
    alert("Indikator belum dimuat.");
    return;
  }

  let total = 0;
  let jumlahValid = 0;

  skorInputs.forEach(s => {
    const nilai = parseInt(s.value);
    if (!isNaN(nilai)) {
      total += nilai;
      jumlahValid++;
    }
  });

  if (jumlahValid === 0) {
    alert("Isi skor terlebih dahulu.");
    return;
  }

  const rerata = total / jumlahValid;

  document.getElementById("totalSkor").textContent = total;
  document.getElementById("rerataSkor").textContent = rerata.toFixed(2);

  let kategori = "";
  if (rerata >= 4.5) kategori = "Sangat Baik";
  else if (rerata >= 3.5) kategori = "Baik";
  else if (rerata >= 2.5) kategori = "Cukup";
  else kategori = "Perlu Pembinaan";

  document.getElementById("kategoriSkor").textContent = kategori;

  generateRekomendasi();
}

// ===============================
// GENERATE CATATAN
// ===============================
function generateCatatan() {

  const rerata = parseFloat(document.getElementById("rerataSkor").textContent);

  if (isNaN(rerata)) {
    alert("Hitung skor terlebih dahulu.");
    return;
  }

  let teks = "";

  if (rerata >= 4.5) {
    teks = "Guru menunjukkan kinerja sangat baik dengan pelaksanaan pembelajaran yang efektif dan inspiratif.";
  }
  else if (rerata >= 3.5) {
    teks = "Guru telah melaksanakan pembelajaran dengan baik, namun masih perlu penguatan pada beberapa aspek teknis.";
  }
  else if (rerata >= 2.5) {
    teks = "Pelaksanaan pembelajaran cukup, perlu peningkatan pada strategi dan manajemen kelas.";
  }
  else {
    teks = "Perlu pembinaan intensif terutama pada perencanaan dan pelaksanaan pembelajaran.";
  }

  document.getElementById("catatanOutput").value = teks;
}

// ===============================
// GENERATE REKOMENDASI
// ===============================
function generateRekomendasi() {

  const skorInputs = document.querySelectorAll(".skorInput");

  if (skorInputs.length === 0) {
    alert("Indikator belum dimuat.");
    return;
  }

  const rerata = parseFloat(document.getElementById("rerataSkor").textContent);

  if (isNaN(rerata)) {
    alert("Hitung skor terlebih dahulu.");
    return;
  }

  const mode = document.getElementById("modeBahasa")?.value || "pendek";

  let skorArray = [];

  skorInputs.forEach((s, i) => {
    const nilai = parseInt(s.value);
    if (!isNaN(nilai)) {
      skorArray.push({
        indikator: indikatorList[i]?.indikator || "Indikator",
        skor: nilai
      });
    }
  });

  skorArray.sort((a, b) => a.skor - b.skor);
  const terendah = skorArray.slice(0, 3);

  let rekom = "";

  if (mode === "pendek") {
    rekom = "Perlu peningkatan pada: ";
    rekom += terendah.map(t => t.indikator).join(", ");
  }
  else if (mode === "mendalam") {
    rekom = "Berdasarkan hasil supervisi, aspek yang perlu diperkuat:\n\n";
    terendah.forEach(t => {
      rekom += "- " + t.indikator + " (Skor: " + t.skor + ")\n";
    });
    rekom += "\nDisarankan refleksi pembelajaran dan coaching terstruktur.";
  }
  else {
    rekom = `Rerata skor supervisi adalah ${rerata}. Indikator dengan capaian terendah:\n\n`;
    terendah.forEach(t => {
      rekom += `• ${t.indikator} (Skor ${t.skor})\n`;
    });
    rekom += "\nRekomendasi berbasis data ini menunjukkan perlunya intervensi terstruktur.";
  }

  document.getElementById("rekomendasiOutput").value = rekom;
}

// ===============================
// SIMPAN HASIL
// ===============================
function simpanHasil() {

  const data = {
    guru: document.getElementById("teacherSelect").value,
    tanggal: document.getElementById("tanggal").value,
    total: document.getElementById("totalSkor").textContent,
    rerata: document.getElementById("rerataSkor").textContent,
    kategori: document.getElementById("kategoriSkor").textContent,
    catatan: document.getElementById("catatanOutput").value,
    rekomendasi: document.getElementById("rekomendasiOutput").value
  };

  localStorage.setItem("hasilSupervisi", JSON.stringify(data));
  alert("Data supervisi berhasil disimpan.");
}
// ===============================
// EXPORT PDF RESMI SUPERVISI
// ===============================
async function exportPDF() {

  if (!validasiForm()) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const guruSelect = document.getElementById("teacherSelect");
  const guruNama = guruSelect.options[guruSelect.selectedIndex].text;

  const penilai = document.getElementById("assessorRole").value === "kepala"
    ? "Kepala Sekolah"
    : "Pengawas";

  const tanggal = document.getElementById("tanggal").value;

  const total = document.getElementById("totalSkor").textContent;
  const rerata = document.getElementById("rerataSkor").textContent;
  const kategori = document.getElementById("kategoriSkor").textContent;
  const catatan = document.getElementById("catatanOutput").value;
  const rekomendasi = document.getElementById("rekomendasiOutput").value;

  if (!rerata || rerata === "0") {
    alert("Hitung skor terlebih dahulu sebelum export PDF.");
    return;
  }

  let y = 15;

  // HEADER
  doc.setFontSize(14);
  doc.text("LAPORAN SUPERVISI PEMBELAJARAN", 105, y, { align: "center" });

  y += 10;
  doc.setFontSize(11);

  doc.text(`Nama Guru : ${guruNama}`, 14, y); y += 6;
  doc.text(`Penilai     : ${penilai}`, 14, y); y += 6;
  doc.text(`Tanggal     : ${tanggal}`, 14, y); y += 10;

  // TABEL SKOR
  doc.text("RINCIAN INDIKATOR:", 14, y); 
  y += 6;

  const skorInputs = document.querySelectorAll(".skorInput");

  skorInputs.forEach((s, i) => {
    const indikator = indikatorList[i]?.indikator || "Indikator";
    const skor = s.value || "-";

    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.text(`${i + 1}. ${indikator} : ${skor}`, 14, y);
    y += 6;
  });

  y += 4;

  doc.text(`Total Skor : ${total}`, 14, y); y += 6;
  doc.text(`Rata-rata  : ${rerata}`, 14, y); y += 6;
  doc.text(`Kategori   : ${kategori}`, 14, y); y += 10;

  // CATATAN
  doc.text("Catatan:", 14, y);
  y += 6;
  const catatanSplit = doc.splitTextToSize(catatan, 180);
  doc.text(catatanSplit, 14, y);
  y += catatanSplit.length * 6 + 6;

  // REKOMENDASI
  doc.text("Rekomendasi:", 14, y);
  y += 6;
  const rekomSplit = doc.splitTextToSize(rekomendasi, 180);
  doc.text(rekomSplit, 14, y);
  y += rekomSplit.length * 6 + 20;

  // TANDA TANGAN
  doc.text("Mengetahui,", 140, y);
  y += 20;
  doc.text("(_______________________)", 130, y);

  // SAVE FILE
  doc.save(`Supervisi_${guruNama}_${tanggal}.pdf`);
}
