const Generator = {

  generateKategori: function (rerata) {
    if (rerata >= 4.5) return "Sangat Baik";
    if (rerata >= 3.5) return "Baik";
    if (rerata >= 2.5) return "Cukup";
    return "Perlu Pembinaan";
  },

  generateCatatan: function (rerata, teacherName) {
    if (rerata >= 4.5)
      return `Guru ${teacherName} menunjukkan kinerja sangat baik dengan penguasaan pembelajaran yang optimal.`;

    if (rerata >= 3.5)
      return `Guru ${teacherName} memiliki kinerja baik dan perlu penguatan pada beberapa aspek pembelajaran.`;

    if (rerata >= 2.5)
      return `Guru ${teacherName} perlu peningkatan dalam pelaksanaan pembelajaran agar lebih efektif.`;

    return `Guru ${teacherName} memerlukan pembinaan intensif untuk meningkatkan kualitas pembelajaran.`;
  },

  generateRekomendasi: function (indikatorList) {
    if (!indikatorList || indikatorList.length === 0)
      return "Pertahankan kinerja yang sudah baik.";

    const top3 = indikatorList
      .sort((a, b) => a.skor - b.skor)
      .slice(0, 3);

    let rekom = "Rekomendasi Pembinaan:\n";

    top3.forEach(ind => {
      rekom += `- Perlu peningkatan pada indikator: ${ind.nama}\n`;
    });

    return rekom;
  }

};
