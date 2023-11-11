// Listen for messages from the popup.
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (msg) => {
    if (msg.from === "popup" && msg.subject === "getModelInfo") {
      await port.postMessage({
        price: getData(locators.price),
        name: getData(locators.name),
        brand: getData(locators.brand),
        link: window.location.href,
        releaseDate: getDataByQuerry(locators.releaseDate),
        status: getModelStatus()
      });
    }
  });
});

const locators = {
  price: "item-detail__price_selling-price",
  name: "item-detail__section-title",
  brand: "item-detail__brand",
  statuses: ".item-detail__operation .btn-cart",
  releaseDate: "section.item-about:nth-child(2) dl:nth-child(2) dt:first-child + dd"
}

function getData(locator) {
  let text;
  try {
    text = document.getElementsByClassName(locator)[0].textContent;
  } catch (e) {
    text = "N/A";
  }

  return text;
}

function getDataByQuerry(query) {
  let text;
  try {
    text = document.querySelector(query).textContent;
  } catch (e) {
    text = "N/A";
  }

  return text;
}

function getModelStatus() {
  const statuses = document.querySelectorAll(locators.statuses);

  let modelStatus;

  try {
    for (const mStatus of statuses) {
      if (window.getComputedStyle(mStatus).display !== "none") {
        modelStatus = mStatus.textContent;
        if (modelStatus.match(/Add to Cart/gi)) modelStatus = "Available";
        break;
      }
    }

  } catch (e) {
    modelStatus = "N/A";
  }

  return modelStatus;
}