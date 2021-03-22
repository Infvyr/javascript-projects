const { hash } = window.location;
const message = atob(hash.replace("#", ""));

if (message) {
    document.getElementById("messageForm").classList.add("hide");
    document.getElementById("messageShow").classList.remove("hide");

    document.querySelector("h1").innerHTML = message;
}

document.querySelector("#messageForm").addEventListener("submit", (event) => {
    event.preventDefault();

    document.getElementById("messageForm").classList.add("hide");
    document.getElementById("linkForm").classList.remove("hide");

    const messageInput = document.getElementById("messageInput");
    const encrypted = btoa(messageInput.value);
    const linkInput = document.getElementById("linkInput");
    linkInput.value = `${window.location}#${encrypted}`;
    linkInput.select();
});
