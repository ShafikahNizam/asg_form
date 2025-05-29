document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("trainingForm");
  const resetBtn = document.getElementById("resetBtn");

  function clearErrors() {
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
      input.classList.remove("invalid");
      const errorSpan = input.parentElement.querySelector(".error-msg");
      if (errorSpan) errorSpan.textContent = "";
    });
  }

  function setError(input, message) {
    input.classList.add("invalid");
    const errorSpan = input.parentElement.querySelector(".error-msg");
    if (errorSpan) errorSpan.textContent = message;
  }

  function formatDate(dateStr) {
    if (!dateStr || !dateStr.includes("-")) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }

  function validateForm(event) {
    event.preventDefault();
    clearErrors();

    let isValid = true;
    let firstInvalidInput = null;

    const name = form.name.value.trim();
    const program = form.program.value;
    const semester = form.semester.value.trim();
    const start = form.start.value;
    const end = form.end.value;
    const phone = form.phone.value.trim();
    const orgName = form.org_name.value.trim();
    const address = form.org_address.value.trim();
    const postcode = form.postcode.value.trim();
    const city = form.city.value.trim();
    const state = form.state.value;
    const supervisor = form.supervisor.value.trim();
    const position = form.position.value.trim();

    function check(value, input, name, pattern = /.*/, msg = "Format tidak sah") {
      if (!value) {
        setError(input, `${name} diperlukan.`);
        if (!firstInvalidInput) firstInvalidInput = input;
        isValid = false;
      } else if (!pattern.test(value)) {
        setError(input, `${name}: ${msg}`);
        if (!firstInvalidInput) firstInvalidInput = input;
        isValid = false;
      }
    }

    check(name, form.name, "Nama Pelajar", /^[a-zA-Z\s]+$/);
    if (program === "") {
      setError(form.program, "Program diperlukan.");
      if (!firstInvalidInput) firstInvalidInput = form.program;
      isValid = false;
    }
    check(semester, form.semester, "Semester", /^[1-9][0-9]?$/);
    check(start, form.start, "Tarikh Mula");
    check(end, form.end, "Tarikh Tamat");
    check(phone, form.phone, "No Telefon", /^[0-9\-+ ]+$/);
    check(orgName, form.org_name, "Nama Organisasi");
    check(address, form.org_address, "Alamat");
    check(postcode, form.postcode, "Poskod", /^[0-9]{5}$/, "Mesti 5 digit");
    check(city, form.city, "Bandar");
    if (state === "") {
      setError(form.state, "Negeri diperlukan.");
      if (!firstInvalidInput) firstInvalidInput = form.state;
      isValid = false;
    }
    check(supervisor, form.supervisor, "Nama Penyelia");
    check(position, form.position, "Jawatan Penyelia");

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (endDate <= startDate) {
        setError(form.end, `Tarikh Tamat (${formatDate(end)}) mestilah selepas Tarikh Mula (${formatDate(start)}).`);
        if (!firstInvalidInput) firstInvalidInput = form.end;
        isValid = false;
      }
    }

    if (!isValid) {
      firstInvalidInput.focus();
      return false;
    }

    const params = new URLSearchParams({
        name,
        program,
        semester,
        start: formatDate(start),
        end: formatDate(end),
        phone,
        org_name: orgName,
        org_address: address,
        postcode,
        city,
        state,
        supervisor,
        position
    });


    window.location.href = "display.html?" + params.toString();
    return true;
  }

  function resetForm() {
    form.reset();
    clearErrors();
    form.name.focus();
  }

  form.addEventListener("submit", validateForm);
  resetBtn.addEventListener("click", resetForm);
});
