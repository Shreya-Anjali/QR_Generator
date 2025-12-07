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

    // Remove previous QR
    qrContainer.innerHTML = "";

    // Create encoded QR URL for viewer.html
    const encoded = encodeURIComponent(data);
    const folderPath = window.location.href.replace("index.html", "");
    const qrURL = folderPath + "viewer.html?data=" + encoded;

    console.log("QR URL:", qrURL); // Debugging

    qrcode = new QRCode(qrContainer, {
        text: qrURL,
        width: 200,
        height: 200
    });

    // Once QR is rendered, enable download button
    setTimeout(() => {
        const img = qrContainer.querySelector("img");
        const canvas = qrContainer.querySelector("canvas");

        if (img || canvas) {
            downloadBtn.style.display = "block";
            downloadBtn.onclick = () => {
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
