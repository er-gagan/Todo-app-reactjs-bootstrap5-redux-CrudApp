document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("id_password")
    if (el) {
        el.setAttribute("disabled", "true")
    }
})