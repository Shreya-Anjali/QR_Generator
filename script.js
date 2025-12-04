function generateQR() {
    const details = document.getElementById('person_details').value.trim();
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';

    if (!details) {
        alert("Please enter the person's details first!");
        return;
    }

    // encode details to be passed in URL
    const encodedDetails = encodeURIComponent(details);

    // generate QR with viewer page link
    const qrText = `${window.location.origin}${window.location.pathname.replace("index.html", "")}viewer.html?data=${encodedDetails}`;

    new QRCode(qrContainer, {
        text: qrText,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
        const canvas = qrContainer.querySelector('canvas');
        if (canvas) {
            const downloadBtn = document.getElementById('download-btn');
            const openBtn = document.getElementById('open-viewer');
            
            if (downloadBtn) {
                downloadBtn.style.display = 'inline-block';
                downloadBtn.onclick = () => {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL("image/png");
                    link.download = 'qr-code.png';
                    link.click();
                };
            }

            if (openBtn) {
                openBtn.style.display = 'inline-block';
                openBtn.onclick = () => {
                    window.location.href = qrText;
                };
            }
        }
    }, 300);
}
