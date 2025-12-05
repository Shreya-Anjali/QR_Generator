document.getElementById("download-btn").style.display = "none";

function generateQR() {
    const details = document.getElementById("person_details").value.trim();
    const qrContainer = document.getElementById("qrcode");
    
    // Clear previous QR
    qrContainer.innerHTML = "";

    if (!details) {
        alert("Please enter the person's details first!");
        return;
    }

    // Build viewer.html URL with encoded data
    const viewerURL =
        "https://shreya-anjali.github.io/Qr-generator/viewer.html?" +
        encodeURIComponent(details);

    const qr = new QRCode(qrContainer, {
        text: viewerURL,
        width: 256,
        height: 256,
        correctLevel: QRCode.CorrectLevel.H
    });

    // Enable download button when QR loads
    setTimeout(() => {
        const canvas = qrContainer.querySelector("canvas");
        if (canvas) {
            const downloadBtn = document.getElementById("download-btn");
            downloadBtn.style.display = "inline-block";

            downloadBtn.onclick = () => {
                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = "QR_Code.png";
                link.click();
            };
        }
    }, 500);
}
