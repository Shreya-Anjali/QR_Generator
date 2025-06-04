function generateQR() {
    const details = document.getElementById('person_details').value.trim();
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = ''; // Clear previous QR

    if (!details) {
        alert("Please enter the person's details first!");
        return;
    }

    const qr = new QRCode(qrContainer, {
        text: details,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Wait for QR to render, then enable download button
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
    }, 500);
}
