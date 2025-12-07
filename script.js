document.getElementById("download-btn").style.display = "none";

let qrcode;

function generateQR() {
    const data = document.getElementById("person_details").value.trim();
    const qrContainer = document.getElementById("qrcode");
    const downloadBtn = document.getElementById("download-btn");

    if (!data) {
        alert("Please enter details before generating QR!");
        return;
    }

    // remove old QR if exists
    qrContainer.innerHTML = "";

    qrcode = new QRCode(qrContainer, {
        text: data,
        width: 200,
        height: 200
    });

    // wait for QR to render
    setTimeout(() => {
        const img = qrContainer.querySelector("img");
        const canvas = qrContainer.querySelector("canvas");

        // show download button when QR generated
        if (img || canvas) {
            downloadBtn.style.display = "block";
            downloadBtn.onclick = function () {
                const link = document.createElement("a");

                if (img) {
                    link.href = img.src;
                } else if (canvas) {
                    link.href = canvas.toDataURL("image/png");
                }

                link.download = "qrcode.png";
                link.click();
            };
        }
    }, 500);
}
