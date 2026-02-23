// RULE-BASED GENERATOR SIS 2026

function generateCatatan(skorRerata) {
  if (skorRerata >= 4.5) {
    return "Kinerja pembelajaran sangat baik dan menunjukkan profesionalitas tinggi.";
  } else if (skorRerata >= 3.5) {
    return "Pembelajaran berjalan baik dengan beberapa aspek yang perlu penguatan.";
  } else if (skorRerata >= 2.5) {
    return "Perlu peningkatan pada beberapa indikator penting.";
  } else {
    return "Memerlukan pembinaan intensif dan pendampingan khusus.";
  }
}

function generateRekomendasi(indikatorTerendah) {
  return `Fokus peningkatan pada indikator: ${indikatorTerendah.join(", ")}. Disarankan mengikuti pelatihan dan supervisi lanjutan.`;
}