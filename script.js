function generateQR() {
    const details = document.getElementById('person_details').value.trim();
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';

    if (!details) {
        alert("Please enter the person's details first!");
        return;
    }

    const encodedDetails = encodeURIComponent(details.trim());

    const qr = new QRCode(qrContainer, {
        text: `${window.location.origin}/viewer.html?data=${encodedDetails}`,
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

            downloadBtn.style.display = 'inline-block';
            openBtn.style.display = 'inline-block';

            downloadBtn.onclick = () => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL("image/png");
                link.download = 'qr-code.png';
                link.click();
            };

            openBtn.onclick = () => {
                window.location.href = `/viewer.html?data=${encodedDetails}`;
            };
        }
    }, 500);
}
