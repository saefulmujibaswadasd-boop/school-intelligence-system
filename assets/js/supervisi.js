let indikatorList = [];

document.addEventListener("DOMContentLoaded", () => {
  loadTeachers();
  loadIndikator();
});

function loadTeachers() {
  fetch(CONFIG.TEACHERS.URL)
    .then(res => res.text())
    .then(data => {
      const rows = data.split("\n").map(r => r.split(","));
      const header = rows[0];
      const select = document.getElementById("teacherSelect");

      rows.slice(1).forEach(row => {
        const obj = {};
        header.forEach((h,i)=> obj[h.trim()] = row[i]);

        if(obj.status_aktif === "Aktif"){
          const opt = document.createElement("option");
          opt.value = obj.teacher_id;
          opt.textContent = obj.nama;
          select.appendChild(opt);
        }
      });
    });
}

function loadIndikator(){
  fetch(CONFIG.SUPERVISI.URL_INDIKATOR)
    .then(res=>res.text())
    .then(data=>{
      const rows = data.split("\n").map(r=>r.split(","));
      const header = rows[0];
      const container = document.getElementById("indikatorContainer");

      rows.slice(1).forEach(row=>{
        const obj = {};
        header.forEach((h,i)=> obj[h.trim()] = row[i]);

        if(obj.aktif === "TRUE"){
          indikatorList.push(obj);

          const div = document.createElement("div");
          div.innerHTML = `
            <label>${obj.indikator}</label>
            <select class="skorInput">
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
    });
}

function hitungSkor(){
  const skorInputs = document.querySelectorAll(".skorInput");
  let total = 0;

  skorInputs.forEach(s=>{
    total += parseInt(s.value);
  });

  const rerata = total / skorInputs.length;

  document.getElementById("totalSkor").textContent = total;
  document.getElementById("rerataSkor").textContent = rerata.toFixed(2);

  let kategori = "";

  if(rerata >= 4.5) kategori = "Sangat Baik";
  else if(rerata >= 3.5) kategori = "Baik";
  else if(rerata >= 2.5) kategori = "Cukup";
  else kategori = "Perlu Pembinaan";

  document.getElementById("kategoriSkor").textContent = kategori;
}

function generateCatatan(){
  const rerata = parseFloat(document.getElementById("rerataSkor").textContent);

  let teks = "";

  if(rerata >= 4.5){
    teks = "Guru menunjukkan kinerja sangat baik dengan pelaksanaan pembelajaran yang efektif, terstruktur, dan inspiratif.";
  }
  else if(rerata >= 3.5){
    teks = "Guru telah melaksanakan pembelajaran dengan baik, namun masih perlu penguatan pada beberapa aspek teknis.";
  }
  else if(rerata >= 2.5){
    teks = "Pelaksanaan pembelajaran cukup, perlu peningkatan pada strategi dan manajemen kelas.";
  }
  else{
    teks = "Perlu pembinaan intensif terutama pada perencanaan dan pelaksanaan pembelajaran.";
  }

  document.getElementById("catatanOutput").value = teks;
}

function generateRekomendasi(){
  const skorInputs = document.querySelectorAll(".skorInput");
  let skorArray = [];

  skorInputs.forEach((s,i)=>{
    skorArray.push({
      indikator: indikatorList[i].indikator,
      skor: parseInt(s.value)
    });
  });

  skorArray.sort((a,b)=>a.skor-b.skor);

  const terendah = skorArray.slice(0,3);

  let rekom = "Fokus perbaikan pada:\n";

  terendah.forEach(t=>{
    rekom += "- " + t.indikator + "\n";
  });

  document.addEventListener("DOMContentLoaded", () => {
  loadTeachers();
  loadIndikator();
});

