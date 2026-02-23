// AUTH SIS 2026 (Simple Role-Based)

let currentUser = null;

async function login(loginId) {
  const response = await fetch(CONFIG.TEACHERS.URL);
  const data = await response.text();
  const rows = data.split("\n").slice(1);

  for (let row of rows) {
    const cols = row.split(",");
    if (cols[11] === loginId) { // login_id
      currentUser = {
        teacher_id: cols[0],
        nama: cols[2],
        role: cols[10]
      };
      localStorage.setItem("sis_user", JSON.stringify(currentUser));
      return true;
    }
  }
  return false;
}

function getUser() {
  return JSON.parse(localStorage.getItem("sis_user"));
}

function logout() {
  localStorage.removeItem("sis_user");
  window.location.href = "../index.html";
}