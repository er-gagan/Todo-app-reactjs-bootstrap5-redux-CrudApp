document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("id_password")
    if (el) {
        // el.parentElement.style.pointerEvents="none";
        el.parentElement.setAttribute('hidden', 'true')
    }
})