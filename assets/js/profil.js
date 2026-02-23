// LOAD PROFIL SEKOLAH

async function loadProfil() {
  const response = await fetch(CONFIG.PROFIL.URL);
  const data = await response.text();
  const rows = data.split("\n");
  const cols = rows[1].split(",");

  document.getElementById("namaSekolah").innerText = cols[1];
  document.getElementById("alamatSekolah").innerText = cols[2];
  document.getElementById("kepalaSekolah").innerText = cols[9];
}

document.addEventListener("DOMContentLoaded", loadProfil);