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

    // remove old qr if exists
    qrContainer.innerHTML = "";

    qrcode = new QRCode(qrContainer, {
        text: data,
        width: 200,
        height: 200
    });

    // wait for qr to actually render
    setTimeout(() => {
        const img = qrContainer.querySelector("img");
        if (img) {
            downloadBtn.style.display = "block";
            downloadBtn.onclick = function () {
                const link = document.createElement("a");
                link.download = "qrcode.png";
                link.href = img.src;
                link.click();
            };
        }
    }, 500);
}


    // Download button
    setTimeout(() => {
        let img = document.querySelector("#qrcode img");
        if (img) {
            document.getElementById("download-btn").style.display = "block";
            document.getElementById("download-btn").onclick = function () {
                let link = document.createElement("a");
                link.href = img.src;
                link.download = "qrcode.png";
                link.click();
            };
        }
    }, 500);
}


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

