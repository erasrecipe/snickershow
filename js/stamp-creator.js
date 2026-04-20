// Vintage Travel Stamp Creator Script

document.addEventListener('DOMContentLoaded', () => {
    const stampTextInput = document.getElementById('stampText');
    const stampColorInput = document.getElementById('stampColor');
    const stampShapeSelect = document.getElementById('stampShape');
    const generateStampBtn = document.getElementById('generateStampBtn');
    const downloadStampBtn = document.getElementById('downloadStampBtn');
    const canvas = document.getElementById('stampCanvas');
    const ctx = canvas.getContext('2d');

    const DEFAULT_TEXT = "ADVENTURE";
    const DEFAULT_COLOR = "#cc0000"; // Red
    const DEFAULT_SHAPE = "circle";

    function drawStamp(text, color, shape) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        ctx.save(); // Save context state

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) / 2 * 0.9; // 90% of canvas size

        // Draw outer shape
        ctx.strokeStyle = color;
        ctx.lineWidth = 10;
        ctx.fillStyle = 'rgba(255, 255, 255, 0)'; // Transparent fill

        if (shape === 'circle') {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.fill();
        } else if (shape === 'rectangle') {
            const rectWidth = radius * 2 * 0.9; // Slightly less than diameter
            const rectHeight = radius * 2 * 0.9;
            ctx.strokeRect(centerX - rectWidth / 2, centerY - rectHeight / 2, rectWidth, rectHeight);
        } else if (shape === 'oval') {
            const ovalWidth = radius * 2 * 1.2; // Wider than tall
            const ovalHeight = radius * 2 * 0.8;
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, ovalWidth / 2, ovalHeight / 2, 0, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore(); // Restore context state

        // Draw text
        ctx.fillStyle = color;
        ctx.font = 'bold 40px Arial'; // Adjust font and size as needed
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Center text, accounting for shape if necessary
        if (shape === 'circle' || shape === 'oval') {
            // For circles/ovals, could try drawing text in a curve, but for simplicity, let's center it
            ctx.fillText(text.toUpperCase(), centerX, centerY);
        } else { // Rectangle
            ctx.fillText(text.toUpperCase(), centerX, centerY);
        }
        
        downloadStampBtn.disabled = false;
    }

    generateStampBtn.addEventListener('click', () => {
        const text = stampTextInput.value || DEFAULT_TEXT;
        const color = stampColorInput.value || DEFAULT_COLOR;
        const shape = stampShapeSelect.value || DEFAULT_SHAPE;
        drawStamp(text, color, shape);
    });

    downloadStampBtn.addEventListener('click', () => {
        const text = stampTextInput.value || DEFAULT_TEXT;
        const color = stampColorInput.value || DEFAULT_COLOR;
        const shape = stampShapeSelect.value || DEFAULT_SHAPE;

        // Redraw with final settings to ensure it's captured correctly
        drawStamp(text, color, shape);

        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `vintage-stamp-${text.replace(/\s+/g, '-')}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    // Initialize with default values
    stampTextInput.value = DEFAULT_TEXT;
    stampColorInput.value = DEFAULT_COLOR;
    stampShapeSelect.value = DEFAULT_SHAPE;
    drawStamp(DEFAULT_TEXT, DEFAULT_COLOR, DEFAULT_SHAPE);
});