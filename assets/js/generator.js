const Generator = {

  kategoriSkor(rerata) {
    if (rerata >= 4.5) return "Sangat Baik";
    if (rerata >= 3.5) return "Baik";
    if (rerata >= 2.5) return "Cukup";
    return "Perlu Pembinaan";
  },

  catatanKepala(rerata) {
    if (rerata >= 4.5)
      return "Pembelajaran berjalan sangat efektif dengan keterlibatan siswa tinggi.";

    if (rerata >= 3.5)
      return "Pembelajaran berjalan baik namun masih perlu penguatan pada beberapa aspek.";

    if (rerata >= 2.5)
      return "Beberapa indikator belum optimal dan perlu peningkatan kualitas pelaksanaan.";

    return "Diperlukan pembinaan intensif untuk meningkatkan mutu pembelajaran.";
  },

  rekomendasi(indikatorTerendah) {
    return `Disarankan melakukan penguatan pada indikator: ${indikatorTerendah.join(", ")} melalui supervisi lanjutan dan pembinaan terstruktur.`;
  }

};
