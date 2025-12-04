function generateQR() {
    const details = document.getElementById('person_details').value.trim();
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';

    if (!details) {
        alert("Please enter the person's details first!");
        return;
    }

    const encodedDetails = encodeURIComponent(details);

    // Auto GitHub repo support
    const repo = window.location.pathname.split("/")[1];
    const qrURL = `${window.location.origin}/${repo}/viewer.html?data=${encodedDetails}`;

    // Generate QR
    const qr = new QRCode(qrContainer, {
        text: qrURL,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Enable download after QR loads
    setTimeout(() => {
        const canvas = qrContainer.querySelector('canvas');
        if (canvas) {
            const downloadBtn = document.getElementById('download-btn');
            downloadBtn.style.display = 'inline-block';
            downloadBtn.onclick = () => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL("image/png");
                link.download = 'qr-code.png';
                link.click();
            };
        }
    }, 300);
}
