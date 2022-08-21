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
        var user = JSON.parse(localStorage.getItem("user"));
        document.getElementById("lblCurrentUser").innerText = user.first_name+" "+user.last_name+" ("+user.role+")";
        document.getElementsByClassName("item-login")[0].classList.add("hidden");
        document.getElementsByClassName("item-register")[0].classList.add("hidden");

        document.getElementsByClassName("item-request")[0].classList.remove("hidden");
        document.getElementsByClassName("item-orders")[0].classList.remove("hidden");
        document.getElementsByClassName("item-logout")[0].classList.remove("hidden");

        if (user.role == "admin" || user.role == "technician") {
            document.getElementsByClassName("item-contact")[0].classList.add("hidden");
            document.getElementsByClassName("item-messages")[0].classList.remove("hidden");
        } else {
            document.getElementsByClassName("item-contact")[0].classList.remove("hidden");
            document.getElementsByClassName("item-messages")[0].classList.add("hidden");
        }
    } else {
        document.getElementById("lblCurrentUser").innerText = "";
        document.getElementsByClassName("item-login")[0].classList.remove("hidden");
        document.getElementsByClassName("item-register")[0].classList.remove("hidden");

        document.getElementsByClassName("item-request")[0].classList.add("hidden");
        document.getElementsByClassName("item-orders")[0].classList.add("hidden");
        document.getElementsByClassName("item-logout")[0].classList.add("hidden");

        document.getElementsByClassName("item-contact")[0].classList.remove("hidden");
        document.getElementsByClassName("item-messages")[0].classList.add("hidden");
    }
}

window.addEventListener('load', (event) => {
    renderMenu();
});

function isUserLoggedIn() {
    var user = JSON.parse(localStorage.getItem("user"));
    return user != null && user != undefined && user.role != null && user.role != undefined
}

function isTechnicianOrAdmin() {
    var user = JSON.parse(localStorage.getItem("user"));
    return isUserLoggedIn() && (user.role == "technician" || user.role == "admin")
}

function formatDate(dateStr) {
    let date = new Date(dateStr);
    return date.toISOString().substring(0, 10);
}