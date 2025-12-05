function generateQR() {
    const input = document.getElementById("person_details").value.trim();
    const qrContainer = document.getElementById("qrcode");
    const downloadBtn = document.getElementById("download-btn");

    // Clear previous QR
    qrContainer.innerHTML = "";

    if (input === "") {
        alert("Please enter some details first!");
        return;
    }

    let qr = new QRCode(qrContainer, {
        text: input,
        width: 200,
        height: 200,
        correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
        // Fetch QR image inside container
        const qrImg = qrContainer.querySelector("img");
        if (qrImg && qrImg.src) {
            downloadBtn.style.display = "block";
            downloadBtn.onclick = function () {
                const link = document.createElement("a");
                link.href = qrImg.src;
                link.download = "qrcode.png";
                link.click();
            };
        } else {
            alert("Something went wrong. Try again!");
        }
    }, 300);
}
