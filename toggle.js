function Toggle() {
  document.getElementById("comments").style.cssText = `
    position: fixed;
    right: 0;
    width: 30% !important;
    height: 100vh;
    overflow-y: auto;
    z-index: 1000;
    padding: 10px;
    top: 0;
    background: white;
    max-width: 300px;
    min-width: 200px;
    margin-top: 50px;
    border: .5px black solid;
  `;

  if (!document.getElementById("comments-close-btn")) {
    const closeButton = document.createElement("button");
    closeButton.id = "comments-close-btn";
    closeButton.innerText = "✕";
    closeButton.style.position = "fixed";
    closeButton.style.top = "60px";
    closeButton.style.right = "10px";
    closeButton.style.zIndex = "1001";
    closeButton.style.background = "black";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "50%";
    closeButton.style.width = "30px";
    closeButton.style.height = "30px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "16px";
    closeButton.style.lineHeight = "30px";
    closeButton.style.textAlign = "center";

    closeButton.addEventListener("click", () => {
      closeButton.remove();
      chrome.runtime.sendMessage({ action: 'toggle-comments' });
    });

    document.body.appendChild(closeButton);

  }
}

Toggle();