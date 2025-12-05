function generateQR() {
    const details = document.getElementById("person_details").value.trim();
    const qrContainer = document.getElementById("qrcode");
    const downloadBtn = document.getElementById("download-btn");

    // agar input empty hai to alert
    if (details === "") {
        alert("Please enter person details before generating QR!");
        return;
    }

    // purana QR remove
    qrContainer.innerHTML = "";

    // QR generate
    const qr = new QRCode(qrContainer, {
        text: details,
        width: 256,
        height: 256,
        correctLevel: QRCode.CorrectLevel.H
    });

    // wait for DOM update, fir download option enable
    setTimeout(() => {
        const img = qrContainer.querySelector("img") || qrContainer.querySelector("canvas");
        if (img) {
            downloadBtn.style.display = "block";

            downloadBtn.onclick = function () {
                let src = img.src || img.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = src;
                link.download = "QRCode.png";
                link.click();
            };
        }
    }, 500);
}
