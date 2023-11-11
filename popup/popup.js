const copyBtn = document.getElementById("copyBtn");

const modelName = document.getElementById("modelName");
const modelPrice = document.getElementById("modelPrice");
const modelLink = document.getElementById("modelLink");
const modelReleaseDate = document.getElementById("releaseData");
const modelStatus = document.getElementById("modelStatus");
const modelPreOwned = document.getElementById("preOwned");

copyBtn.onclick = async function (e) {
    let text = document.getElementsByTagName("table")[0].innerText;
    console.log(text);

    try {
        await navigator.clipboard.writeText(text);
    } catch (e) {
        console.log(e);
    }
}

const setModelInfo = info => {
    modelName.innerText = info.name;
    modelPrice.innerText = info.price;
    modelLink.innerText = info.link;
    modelReleaseDate.innerText = info.releaseDate;
    modelStatus.innerText = info.status;

    if (info.name.match(/Pre-owned/gi)) {
        modelPreOwned.innerText = "\nPre-owned";
    }
};

document.addEventListener("DOMContentLoaded", async function () {
    const msg = { from: "popup", subject: "getModelInfo" };
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);

    const connection = await chrome.tabs.connect(tab.id);

    await connection.postMessage(msg);

    connection.onMessage.addListener((res) => {
        console.log(res);
        setModelInfo(res);
    });
})