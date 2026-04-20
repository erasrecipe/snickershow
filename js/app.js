// Call Me If You Get Lost - Permanent License of Travel Generator
// Main Application Logic

// State
let uploadedPhoto = null;

// DOM Elements
const fullNameInput = document.getElementById('fullName');
const travelNumberInput = document.getElementById('travelNumber');
const dateOfBirthInput = document.getElementById('dateOfBirth');
const placeOfIssueInput = document.getElementById('placeOfIssue');
const issueDateInput = document.getElementById('issueDate');
const signatureInput = document.getElementById('signature');
const photoUploadInput = document.getElementById('photoUpload');

const displayName = document.getElementById('displayName');
const displayNumber = document.getElementById('displayNumber');
const displayDOB = document.getElementById('displayDOB');
const displayPlace = document.getElementById('displayPlace');
const displayIssueDate = document.getElementById('displayIssueDate');
const displaySignature = document.getElementById('displaySignature');
const photoPreview = document.getElementById('photoPreview');

const downloadPNGBtn = document.getElementById('downloadPNG');
const downloadPDFBtn = document.getElementById('downloadPDF');
const randomizeBtn = document.getElementById('randomize');

// Initialize
function init() {
    // Set default dates
    const today = new Date();
    const birthDate = new Date(today.getFullYear() - 25, 5, 25); // Default: 25 years ago
    
    issueDateInput.value = formatDateForInput(today);
    dateOfBirthInput.value = formatDateForInput(birthDate);
    
    displayIssueDate.textContent = formatDateForDisplay(today);
    displayDOB.textContent = formatDateForDisplay(birthDate);
    
    // Generate default license number
    const defaultLicenseNumber = 'TTC' + Math.floor(Math.random() * 9000000 + 1000000);
    travelNumberInput.value = defaultLicenseNumber;
    displayNumber.textContent = defaultLicenseNumber;
    
    // Set up event listeners
    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    // Input changes
    fullNameInput.addEventListener('input', (e) => {
        displayName.textContent = e.target.value || '';
    });
    
    travelNumberInput.addEventListener('input', (e) => {
        const value = e.target.value.toUpperCase();
        displayNumber.textContent = value || 'TTC6252021';
    });
    
    placeOfIssueInput.addEventListener('input', (e) => {
        displayPlace.textContent = e.target.value || '';
    });
    
    dateOfBirthInput.addEventListener('change', (e) => {
        if (e.target.value) {
            const date = new Date(e.target.value);
            displayDOB.textContent = formatDateForDisplay(date);
        }
    });
    
    issueDateInput.addEventListener('change', (e) => {
        if (e.target.value) {
            const date = new Date(e.target.value);
            displayIssueDate.textContent = formatDateForDisplay(date);
        }
    });
    
    signatureInput.addEventListener('input', (e) => {
        displaySignature.textContent = e.target.value || '';
    });
    
    // Photo upload
    photoUploadInput.addEventListener('change', handlePhotoUpload);
    
    // Download buttons
    downloadPNGBtn.addEventListener('click', downloadAsPNG);
    downloadPDFBtn.addEventListener('click', downloadAsPDF);
    randomizeBtn.addEventListener('click', randomizeCard);
}

// Date Formatting
function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateForDisplay(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// Photo Upload Handler
function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPG, PNG, etc.)');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
        uploadedPhoto = event.target.result;
        photoPreview.innerHTML = `<img src="${uploadedPhoto}" alt="Your photo" />`;
        showNotification('Photo uploaded successfully! ✓', 'success');
    };
    
    reader.readAsDataURL(file);
}

// Randomize Card
function randomizeCard() {
    // Random names
    const firstNames = ['Tyler', 'Frank', 'Earl', 'Jasper', 'Lionel', 'Travis', 'Pharrell', 'Kali', 'Steve', 'Brent'];
    const lastNames = ['Okonma', 'Ocean', 'Sweatshirt', 'Dolphin', 'Boyce', 'Scott', 'Williams', 'Uchis', 'Lacy', 'Faiyaz'];
    
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomName = `${randomFirstName} ${randomLastName}`;
    
    // Random license number
    const randomNumber = `TTC${Math.floor(Math.random() * 9000000) + 1000000}`;
    
    // Random places
    const places = ['Los Angeles, CA', 'Geneva, Switzerland', 'Paris, France', 'Lagos, Nigeria', 'London, UK', 'Tokyo, Japan', 'Miami, FL', 'New York, NY'];
    const randomPlace = places[Math.floor(Math.random() * places.length)];
    
    // Random dates
    const birthYear = 1985 + Math.floor(Math.random() * 20);
    const birthMonth = Math.floor(Math.random() * 12);
    const birthDay = 1 + Math.floor(Math.random() * 28);
    const randomBirthDate = new Date(birthYear, birthMonth, birthDay);
    
    const issueYear = 2020 + Math.floor(Math.random() * 5);
    const issueMonth = Math.floor(Math.random() * 12);
    const issueDay = 1 + Math.floor(Math.random() * 28);
    const randomIssueDate = new Date(issueYear, issueMonth, issueDay);
    
    // Update inputs
    fullNameInput.value = randomName;
    travelNumberInput.value = randomNumber;
    placeOfIssueInput.value = randomPlace;
    dateOfBirthInput.value = formatDateForInput(randomBirthDate);
    issueDateInput.value = formatDateForInput(randomIssueDate);
    signatureInput.value = randomName;
    
    // Update displays
    displayName.textContent = randomName;
    displayNumber.textContent = randomNumber;
    displayPlace.textContent = randomPlace;
    displayDOB.textContent = formatDateForDisplay(randomBirthDate);
    displayIssueDate.textContent = formatDateForDisplay(randomIssueDate);
    displaySignature.textContent = randomName;
    
    showNotification('License randomized! 🎲', 'success');
}

// Download as PNG
async function downloadAsPNG() {
    showNotification('Generating PNG... Please wait', 'info');
    downloadPNGBtn.classList.add('loading');
    
    try {
        const cardFront = document.querySelector('.card-front');
        
        // Use html2canvas to capture the card
        const canvas = await html2canvas(cardFront, {
            backgroundColor: '#F4E4C1',
            scale: 3, // Higher quality
            logging: false,
            useCORS: true,
            allowTaint: true
        });
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `CMIYGL-License-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            downloadPNGBtn.classList.remove('loading');
            showNotification('Downloaded successfully! ✓', 'success');
        });
        
    } catch (error) {
        console.error('Error generating PNG:', error);
        downloadPNGBtn.classList.remove('loading');
        showNotification('Error generating PNG. Please try again.', 'error');
    }
}

// Download as PDF
async function downloadAsPDF() {
    showNotification('Generating PDF... Please wait', 'info');
    downloadPDFBtn.classList.add('loading');
    
    try {
        const cardFront = document.querySelector('.card-front');
        
        // First, capture as canvas
        const canvas = await html2canvas(cardFront, {
            backgroundColor: '#F4E4C1',
            scale: 3,
            logging: false,
            useCORS: true,
            allowTaint: true
        });
        
        // Convert canvas to image
        const imgData = canvas.toDataURL('image/png');
        
        // Create PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [100, 70] // Slightly larger for license format
        });
        
        // Add image to PDF
        pdf.addImage(imgData, 'PNG', 0, 0, 100, 70);
        
        // Download
        pdf.save(`CMIYGL-License-${Date.now()}.pdf`);
        
        downloadPDFBtn.classList.remove('loading');
        showNotification('Downloaded successfully! ✓', 'success');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        downloadPDFBtn.classList.remove('loading');
        showNotification('Error generating PDF. Please try again.', 'error');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#8B7355'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S to download PNG
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        downloadAsPNG();
    }
    
    // Ctrl/Cmd + P to download PDF
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        downloadAsPDF();
    }
    
    // Ctrl/Cmd + R to randomize
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        randomizeCard();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);

// Welcome message
setTimeout(() => {
    showNotification('Welcome! Create your travel license 📜', 'info');
}, 500);

// Auto-save to localStorage
function autoSave() {
    const cardData = {
        name: fullNameInput.value,
        travelNumber: travelNumberInput.value,
        dateOfBirth: dateOfBirthInput.value,
        placeOfIssue: placeOfIssueInput.value,
        issueDate: issueDateInput.value,
        signature: signatureInput.value,
        photo: uploadedPhoto
    };
    
    localStorage.setItem('cmiygl_license_data', JSON.stringify(cardData));
}

// Load saved data
function loadSavedData() {
    const savedData = localStorage.getItem('cmiygl_license_data');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            if (data.name) fullNameInput.value = data.name;
            if (data.travelNumber) travelNumberInput.value = data.travelNumber;
            if (data.dateOfBirth) dateOfBirthInput.value = data.dateOfBirth;
            if (data.placeOfIssue) placeOfIssueInput.value = data.placeOfIssue;
            if (data.issueDate) issueDateInput.value = data.issueDate;
            if (data.signature) signatureInput.value = data.signature;
            
            // Trigger input events to update display
            fullNameInput.dispatchEvent(new Event('input'));
            travelNumberInput.dispatchEvent(new Event('input'));
            placeOfIssueInput.dispatchEvent(new Event('input'));
            signatureInput.dispatchEvent(new Event('input'));
            dateOfBirthInput.dispatchEvent(new Event('change'));
            issueDateInput.dispatchEvent(new Event('change'));
            
            if (data.photo) {
                uploadedPhoto = data.photo;
                photoPreview.innerHTML = `<img src="${uploadedPhoto}" alt="Your photo" />`;
            }
            
            showNotification('Previous license loaded! 💾', 'info');
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

// Save on input changes
[fullNameInput, travelNumberInput, dateOfBirthInput, placeOfIssueInput, issueDateInput, signatureInput].forEach(input => {
    if (input) {
        input.addEventListener('input', autoSave);
        input.addEventListener('change', autoSave);
    }
});

// Load saved data on init
setTimeout(loadSavedData, 100);
