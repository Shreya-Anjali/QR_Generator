document.getElementById("download-btn").style.display = "none";

function generateQR() {
    let data = document.getElementById("person_details").value.trim();

    if (data === "") {
        alert("Please enter details.");
        return;
    }

    // Convert new lines to single line format so scanners don't mark as invalid
    let formattedData = data.replace(/\n/g, "; ");

    document.getElementById("qrcode").innerHTML = "";

    let qrcode = new QRCode(document.getElementById("qrcode"), {
        text: formattedData,
        width: 200,
        height: 200
    });

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

