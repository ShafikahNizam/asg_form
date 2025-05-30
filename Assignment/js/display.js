document.addEventListener("DOMContentLoaded", () => {
  function formatDate(dateStr) {
    if (!dateStr || !dateStr.includes("-")) return dateStr;
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }

  const params = new URLSearchParams(window.location.search);

  const data = {
    nama: params.get("name"),
    program: params.get("program"),
    semester: params.get("semester"),
    mula: formatDate(params.get("start")),
    tamat: formatDate(params.get("end")),
    telefon: params.get("phone"),
    organisasi: params.get("org_name"),
    alamat: params.get("org_address"),
    poskod: params.get("postcode"),
    bandar: params.get("city"),
    negeri: params.get("state"),
    penyelia: params.get("supervisor"),
    jawatan: params.get("position")
  };

  const output = document.getElementById("output");

  if (data.nama) {
    output.innerHTML = `
      <h3 class="form-title">BORANG MAKLUMAT LATIHAN INDUSTRI PELAJAR</h3>
      <h4>MAKLUMAT PELAJAR</h4>
      <p><strong>Nama:</strong> ${data.nama}</p>
      <p><strong>Program:</strong> ${data.program}</p>
      <p><strong>Semester:</strong> ${data.semester}</p>
      <p><strong>Tempoh Latihan:</strong> ${data.mula} hingga ${data.tamat}</p>
      <p><strong>No Telefon:</strong> ${data.telefon}</p>

      <h4>MAKLUMAT ORGANISASI</h4>
      <p><strong>Nama Organisasi:</strong> ${data.organisasi}</p>
      <p><strong>Alamat:</strong> ${data.alamat}</p>
      <p><strong>Poskod:</strong> ${data.poskod}</p>
      <p><strong>Bandar:</strong> ${data.bandar}</p>
      <p><strong>Negeri:</strong> ${data.negeri}</p>
      <p><strong>Nama Penyelia:</strong> ${data.penyelia}</p>
      <p><strong>Jawatan Penyelia:</strong> ${data.jawatan}</p>
    `;
  } else {
    output.innerHTML = "<p>Tiada data dijumpai. Sila isi borang terlebih dahulu.</p>";
  }
});
