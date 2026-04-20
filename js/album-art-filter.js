// Vintage Album Art Filter Script

document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const filterSelect = document.getElementById('filterSelect');
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');
    let originalImage = null; // To store the original image object

    // Function to apply filters
    function applyFilter(imageData, filterType) {
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            // Apply different filter effects
            switch (filterType) {
                case 'vintage-warm':
                    // Sepia-like tone with slight darkening
                    data[i] = data[i] * 0.8 + (data[i] * 0.2 * 1.5); // Red
                    data[i+1] = data[i+1] * 0.8 + (data[i+1] * 0.2 * 1.2); // Green
                    data[i+2] = data[i+2] * 0.8 + (data[i+2] * 0.2 * 1.0); // Blue
                    // Apply slight darkening
                    data[i] *= 0.9;
                    data[i+1] *= 0.9;
                    data[i+2] *= 0.9;
                    break;
                case 'faded-polaroid':
                    // Desaturate, lighten, and add a slight yellow/brown tint
                    const avg = (data[i] + data[i+1] + data[i+2]) / 3;
                    data[i] = avg * 0.9 + 50; // Lighter and slightly yellow/brown
                    data[i+1] = avg * 0.9 + 40;
                    data[i+2] = avg * 0.9 + 30;
                    // Desaturate
                    data[i] = (data[i] + avg * 2) / 3;
                    data[i+1] = (data[i+1] + avg * 2) / 3;
                    data[i+2] = (data[i+2] + avg * 2) / 3;
                    break;
                case 'high-contrast':
                    // Simple contrast adjustment
                    const contrast = 1.3; // Adjust this value
                    data[i] = (data[i] - 128) * contrast + 128;
                    data[i+1] = (data[i+1] - 128) * contrast + 128;
                    data[i+2] = (data[i+2] - 128) * contrast + 128;
                    // Clamp values to 0-255
                    data[i] = Math.max(0, Math.min(255, data[i]));
                    data[i+1] = Math.max(0, Math.min(255, data[i+1]));
                    data[i+2] = Math.max(0, Math.min(255, data[i+2]));
                    break;
                case 'film-grain':
                    // Add random noise for grain effect
                    const grain = (Math.random() - 0.5) * 40; // Adjust grain intensity
                    data[i] = data[i] + grain;
                    data[i+1] = data[i+1] + grain;
                    data[i+2] = data[i+2] + grain;
                    // Clamp values to 0-255
                    data[i] = Math.max(0, Math.min(255, data[i]));
                    data[i+1] = Math.max(0, Math.min(255, data[i+1]));
                    data[i+2] = Math.max(0, Math.min(255, data[i+2]));
                    break;
            }
        }
        return imageData;
    }

    // Function to draw image on canvas
    function drawImageOnCanvas(img) {
        const aspectRatio = img.width / img.height;
        let drawWidth, drawHeight;

        if (img.width > img.height) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / aspectRatio;
        } else {
            drawHeight = canvas.height;
            drawWidth = canvas.height * aspectRatio;
        }

        const drawX = (canvas.width - drawWidth) / 2;
        const drawY = (canvas.height - drawHeight) / 2;

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    originalImage = img; // Store the original image
                    drawImageOnCanvas(img);
                    filterSelect.value = 'none'; // Reset filter on new image
                    downloadBtn.disabled = true;
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    applyFilterBtn.addEventListener('click', () => {
        if (!originalImage) {
            alert("Please upload an image first!");
            return;
        }

        const filterType = filterSelect.value;
        
        // Redraw original image to apply filters from a clean state
        drawImageOnCanvas(originalImage); 
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        if (filterType !== 'none') {
            applyFilter(imageData, filterType);
            ctx.putImageData(imageData, 0, 0);
        }
        downloadBtn.disabled = false;
    });

    downloadBtn.addEventListener('click', () => {
        if (!originalImage) {
            alert("No image to download!");
            return;
        }

        // Ensure the latest filtered image is drawn before download
        applyFilterBtn.click(); // Trigger applying filter if not already done

        const link = document.createElement('a');
        link.download = `album-art-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Initialize canvas size and state
    canvas.width = 500;
    canvas.height = 500;
    ctx.fillStyle = '#eee'; // Default background for empty canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});