// script.js (replace your existing file with this)
(function () {
    const downloadBtn = document.getElementById("download-btn");
    const qrContainer = document.getElementById("qrcode");

    // Helper: detect GitHub Pages repo path and build viewer URL
    function buildViewerURL(encodedData) {
        // If served over HTTP(S) use viewer.html so scanners open viewer page.
        if (location.protocol.startsWith("http")) {
            // pathParts[1] is repo name when hosted at https://username.github.io/reponame/...
            const parts = location.pathname.split("/").filter(Boolean);
            // If repo is present, use /<repo>/viewer.html, otherwise root viewer.html
            const repoSegment = parts.length > 0 ? `/${parts[0]}` : "";
            return `${location.origin}${repoSegment}/viewer.html?data=${encodedData}`;
        } else {
            // file:// fallback -> encode only data (scanner will show text)
            return encodedData;
        }
    }

    // Normalize the input element id used in your index.html (textarea id = person_details)
    function getInputText() {
        const el = document.getElementById("person_details");
        return el ? el.value.trim() : "";
    }

    // Convert SVG element to data URL
    function svgToDataUrl(svgEl) {
        const serializer = new XMLSerializer();
        let svgText = serializer.serializeToString(svgEl);

        // Add namespace if missing (prevents some browsers from rendering)
        if (!svgText.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
            svgText = svgText.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        // Add xml declaration to help some renderers
        svgText = '<?xml version="1.0" standalone="no"?>\n' + svgText;
        const encoded = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgText);
        return encoded;
    }

    // Enable the download button and wire its click to download the QR image
    function enableDownloadFromRenderedElement(renderedEl) {
        downloadBtn.style.display = "inline-block";

        downloadBtn.onclick = async function () {
            try {
                // Case: <img src="data:image/png;base64,...">
                if (renderedEl.tagName === "IMG") {
                    const href = renderedEl.src;
                    triggerDownload(href, "qr-code.png");
                    return;
                }

                // Case: <canvas>
                if (renderedEl.tagName === "CANVAS") {
                    const dataUrl = renderedEl.toDataURL("image/png");
                    triggerDownload(dataUrl, "qr-code.png");
                    return;
                }

                // Case: <svg>
                if (renderedEl.tagName === "SVG") {
                    const dataUrl = svgToDataUrl(renderedEl);
                    // Browser may better handle SVG download as .svg
                    triggerDownload(dataUrl, "qr-code.svg");
                    return;
                }

                // Fallback: try to find an <img> or <canvas> inside container
                const img = qrContainer.querySelector("img");
                if (img && img.src) { triggerDownload(img.src, "qr-code.png"); return; }
                const canvas = qrContainer.querySelector("canvas");
                if (canvas) { triggerDownload(canvas.toDataURL("image/png"), "qr-code.png"); return; }

                alert("Could not find QR image to download.");
            } catch (err) {
                console.error("Download error:", err);
                alert("Download failed — check console for details.");
            }
        };
    }

    function triggerDownload(dataUrl, filename) {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    // Observe QR container for the QR to be rendered (img/canvas/svg)
    function waitForRenderedElement(container, callback) {
        // If already has valid child, call immediately
        const immediate = container.querySelector("img, canvas, svg");
        if (immediate) {
            return callback(immediate);
        }

        // Otherwise use MutationObserver
        const obs = new MutationObserver((mutations, observer) => {
            const el = container.querySelector("img, canvas, svg");
            if (el) {
                observer.disconnect();
                callback(el);
            }
        });
        obs.observe(container, { childList: true, subtree: true });
        // Timeout fallback: after 2s try to proceed (prevents infinite wait)
        setTimeout(() => {
            const el = container.querySelector("img, canvas, svg");
            if (el) {
                try { obs.disconnect(); } catch (e) {}
                callback(el);
            } else {
                try { obs.disconnect(); } catch (e) {}
                callback(null);
            }
        }, 2000);
    }

    // Main exposed function called by Generate button (index.html uses inline onclick)
    window.generateQR = function () {
        try {
            // Clear pre
