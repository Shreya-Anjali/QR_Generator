const qrText = document.getElementById("qr-text");
const generateBtn = document.getElementById("generate-btn");
const downloadBtn = document.getElementById("download-btn");
const qrBox = document.getElementById("qr-box");

let qr;

generateBtn.addEventListener("click", () => {
    const text = qrText.value.trim();

    if (!text) {
        alert("Please enter some text to generate QR!");
        return;
    }

    qrBox.innerHTML = ""; 

    qr = new QRCode(qrBox, {
        text: text,
        width: 180,
        height: 180,
        correctLevel: QRCode.CorrectLevel.H
    });

    downloadBtn.style.display = "inline-block";
});

downloadBtn.addEventListener("click", () => {
    if (!qr) return;

    const img = qrBox.querySelector("img");
    if (img) {
        const link = document.createElement("a");
        link.href = img.src;
        link.download = "qr-code.png";
        link.click();
    } else {
        alert("QR code image not found!");
    }
});
