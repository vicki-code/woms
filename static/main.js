function renderMenu() {
    let items = document.getElementsByClassName("main-menu-item");

    let page = window.location.pathname.split("/").pop();
    for (const el of items) {
        let link = el.firstChild
        if (link.href.endsWith(page)) {
            el.classList.add("active")
            break
        }
    }
}

window.addEventListener('load', (event) => {
    renderMenu();
});