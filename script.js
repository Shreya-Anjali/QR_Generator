document.getElementById("download-btn").style.display = "none";

function generateQR() {
    const details = document.getElementById("person_details").value.trim();
    
    if (!details) {
        alert("Please enter details to generate QR.");
        return;
    }

    // Create JSON with only details — no file
    const data = { details };
    const jsonString = JSON.stringify(data);

    // Viewer page URL (no attachment needed)
    const viewerURL = "https://shreya-anjali.github.io/Qr-generator/viewer.html?" + encodeURIComponent(jsonString);

    const qrcodeEl = document.getElementById("qrcode");
    qrcodeEl.innerHTML = "";

    const qr = new QRCode(qrcodeEl, {
        text: viewerURL,
        width: 256,
        height: 256,
        correctLevel: QRCode.CorrectLevel.H
    });

    // Wait till QR image loads — then enable download
    const observer = new MutationObserver(() => {
        const img = qrcodeEl.querySelector("img");
        if (img && img.src) {
            const downloadBtn = document.getElementById("download-btn");
            downloadBtn.style.display = "block";
            downloadBtn.onclick = () => downloadQR(img.src);
            observer.disconnect();
        }
    });

    observer.observe(qrcodeEl, { childList: true, subtree: true });
}

function downloadQR(src) {
    const link = document.createElement("a");
    link.href = src;
    link.download = "QR_Code.png";
    link.click();
}
