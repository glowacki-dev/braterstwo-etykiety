let labels = {};

async function renderList(listHandle) {
    labels = await StorageHelper.get("labels", {});
    for(userName in labels) {
        let node = document.createElement("p");
        node.innerHTML = `${userName} <code>${labels[userName]}</code>`;
        listHandle.appendChild(node);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const listHandle = document.getElementById("list");
    renderList(listHandle);
});