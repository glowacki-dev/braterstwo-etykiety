let labels = {};

async function updateLabel(e) {
    const userName = e.target.dataset.userName; 
    const newText = e.target.innerText.trim();
    if(newText.length > 0) {
        labels[userName] = newText;
    } else {
        delete labels[userName];
    }
    await StorageHelper.set("labels", labels);
    setLabels();
}

function renderNewLabels() {
    const privLinks = document.querySelectorAll('a[href^="https://braterstwo.eu/priv/"]');
    privLinks.forEach((handle) => {
        const userName = handle.href.split("/")[4];
        let userLabel = labels[userName];
        let label = document.createElement("span");
        label.className = "labels button _smallbtn";
        label.style["background-color"] = "#d0eff6";
        label.style["text-transform"] = "none";
        label.dataset.userName = userName;
        label.contentEditable = true;
        label.addEventListener("blur", updateLabel, true);
        if(userLabel) {
            label.innerText = userLabel;
        }
        handle.parentElement.appendChild(label);
    });
}

function update(existingLabels) {
    existingLabels.forEach((handle) => {
        let userLabel = labels[handle.dataset.userName];
        if(userLabel) {
            handle.innerText = userLabel;
        } else {
            handle.innerText = "";
        }
    })
}

async function setLabels() {
    labels = await StorageHelper.get("labels", {});
    const existingLabels = document.querySelectorAll('span.labels');
    if(existingLabels.length > 0) {
        update(existingLabels);
    } else {
        renderNewLabels();
    }
}

setLabels();