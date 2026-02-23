const Auth = {

  setRole(role) {
    localStorage.setItem("role", role);
  },

  getRole() {
    return localStorage.getItem("role");
  },

  isKepala() {
    return this.getRole() === "kepala";
  }

};
