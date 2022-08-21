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

    // Set visibility for menus
    const authorized = isUserLoggedIn();

    if (authorized) {
        document.getElementsByClassName("item-login")[0].classList.add("hidden");
        document.getElementsByClassName("item-register")[0].classList.add("hidden");

        document.getElementsByClassName("item-request")[0].classList.remove("hidden");
        document.getElementsByClassName("item-orders")[0].classList.remove("hidden");
        document.getElementsByClassName("item-logout")[0].classList.remove("hidden");
    } else {
        document.getElementsByClassName("item-login")[0].classList.remove("hidden");
        document.getElementsByClassName("item-register")[0].classList.remove("hidden");

        document.getElementsByClassName("item-request")[0].classList.add("hidden");
        document.getElementsByClassName("item-orders")[0].classList.add("hidden");
        document.getElementsByClassName("item-logout")[0].classList.add("hidden");
    }
}

window.addEventListener('load', (event) => {
    renderMenu();
});

function isUserLoggedIn() {
    var user = JSON.parse(localStorage.getItem("user"));
    return user != null && user != undefined && user.role != null && user.role != undefined
}

function formatDate(dateStr) {
    let date = new Date(dateStr);
    return date.toISOString().substring(0, 10);
}