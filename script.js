// DOM Elements
const engineSizeSlider = document.getElementById('engineSize');
const horsepowerSlider = document.getElementById('horsepower');
const weightSlider = document.getElementById('weight');
const cylindersSlider = document.getElementById('cylinders');
const accelerationSlider = document.getElementById('acceleration');

const engineSizeValue = document.getElementById('engineSizeValue');
const horsepowerValue = document.getElementById('horsepowerValue');
const weightValue = document.getElementById('weightValue');
const cylindersValue = document.getElementById('cylindersValue');
const accelerationValue = document.getElementById('accelerationValue');

const predictBtn = document.getElementById('predictBtn');
const backBtn = document.getElementById('backBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const inputPanel = document.getElementById('inputPanel');
const resultPanel = document.getElementById('resultPanel');
const mileageValue = document.getElementById('mileageValue');

const summaryEngine = document.getElementById('summaryEngine');
const summaryWeight = document.getElementById('summaryWeight');
const summaryHP = document.getElementById('summaryHP');
const summaryCylinders = document.getElementById('summaryCylinders');

// Update slider display values
function updateSliderValue(slider, valueElement, suffix = '') {
    valueElement.textContent = slider.value + suffix;
}

// Add event listeners to sliders
engineSizeSlider.addEventListener('input', () => {
    updateSliderValue(engineSizeSlider, engineSizeValue, 'L');
});

horsepowerSlider.addEventListener('input', () => {
    updateSliderValue(horsepowerSlider, horsepowerValue, ' HP');
});

weightSlider.addEventListener('input', () => {
    updateSliderValue(weightSlider, weightValue, ' kg');
});

cylindersSlider.addEventListener('input', () => {
    updateSliderValue(cylindersSlider, cylindersValue);
});

accelerationSlider.addEventListener('input', () => {
    updateSliderValue(accelerationSlider, accelerationValue, ' sec');
});

// Mock Prediction Function
function calculateMockPrediction() {
    const engineSize = parseFloat(engineSizeSlider.value);
    const horsepower = parseFloat(horsepowerSlider.value);
    const weight = parseFloat(weightSlider.value);
    const cylinders = parseFloat(cylindersSlider.value);
    const acceleration = parseFloat(accelerationSlider.value);

    // Mock calculation formula (for demo only)
    // Higher weight = lower mileage
    // Higher horsepower = slightly lower mileage
    // Larger engine = lower mileage
    // Better acceleration (lower value) = higher mileage
    // More cylinders = lower mileage

    const baseEfficiency = 25;
    const weightFactor = (weight - 1300) / 1300 * -10; // Reference: 1300kg
    const engineFactor = (engineSize - 2.5) * -3; // Reference: 2.5L
    const hpFactor = (horsepower - 150) / 150 * -5; // Reference: 150HP
    const cylinderFactor = (cylinders - 6) * -1.5; // Reference: 6 cylinders
    const accelerationFactor = (acceleration - 10) * 1; // Better acceleration = higher efficiency

    let prediction = baseEfficiency + weightFactor + engineFactor + hpFactor + cylinderFactor + accelerationFactor;

    // Clamp the prediction between realistic values
    prediction = Math.max(8, Math.min(35, prediction));

    // Round to 1 decimal place
    return prediction.toFixed(1);
}

// Show loading animation
function showLoading() {
    loadingOverlay.classList.add('show');
}

// Hide loading animation
function hideLoading() {
    loadingOverlay.classList.remove('show');
}

// Simulate async prediction
async function simulatePrediction() {
    showLoading();

    // Simulate API call delay (1-2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));

    hideLoading();
    displayResults();
}

// Display results
function displayResults() {
    // Get current slider values
    const prediction = calculateMockPrediction();

    // Update mileage display
    mileageValue.textContent = prediction + ' km/l';

    // Update summary stats
    summaryEngine.textContent = engineSizeSlider.value + 'L';
    summaryWeight.textContent = weightSlider.value + ' kg';
    summaryHP.textContent = horsepowerSlider.value + ' HP';
    summaryCylinders.textContent = cylindersSlider.value;

    // Switch panels
    inputPanel.style.display = 'none';
    resultPanel.classList.add('show');

    // Draw chart
    drawChart();

    // Scroll to results
    setTimeout(() => {
        resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// Predict button click handler
predictBtn.addEventListener('click', simulatePrediction);

// Back button click handler
backBtn.addEventListener('click', () => {
    resultPanel.classList.remove('show');
    inputPanel.style.display = 'block';
    
    // Scroll to input
    setTimeout(() => {
        inputPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
});

// Chart Drawing Function (using Canvas)
function drawChart() {
    const canvas = document.getElementById('trendChart');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Sample data: Weight (kg) vs Mileage (km/l)
    const data = [
        { weight: 700, mileage: 28 },
        { weight: 900, mileage: 26 },
        { weight: 1100, mileage: 24 },
        { weight: 1300, mileage: 22 },
        { weight: 1500, mileage: 20 },
        { weight: 1700, mileage: 18 },
        { weight: 1900, mileage: 16 },
        { weight: 2100, mileage: 14 },
        { weight: 2300, mileage: 12 },
        { weight: 2500, mileage: 10 }
    ];

    // Chart dimensions
    const padding = 50;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;

    // Calculate scale
    const maxWeight = 2500;
    const maxMileage = 30;
    const xScale = chartWidth / maxWeight;
    const yScale = chartHeight / maxMileage;

    // Draw grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let w = 0; w <= maxWeight; w += 400) {
        const x = padding + w * xScale;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, canvas.height - padding);
        ctx.stroke();
    }

    // Horizontal grid lines
    for (let m = 0; m <= maxMileage; m += 5) {
        const y = canvas.height - padding - m * yScale;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;

    // X axis
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';

    // X axis labels
    for (let w = 0; w <= maxWeight; w += 400) {
        const x = padding + w * xScale;
        ctx.fillText(w.toString(), x, canvas.height - padding + 20);
    }

    // Y axis labels
    ctx.textAlign = 'right';
    for (let m = 0; m <= maxMileage; m += 5) {
        const y = canvas.height - padding - m * yScale;
        ctx.fillText(m.toString(), padding - 10, y + 4);
    }

    // Draw line chart
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    data.forEach((point, index) => {
        const x = padding + point.weight * xScale;
        const y = canvas.height - padding - point.mileage * yScale;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // Draw data points (circles)
    ctx.fillStyle = '#2563eb';
    data.forEach(point => {
        const x = padding + point.weight * xScale;
        const y = canvas.height - padding - point.mileage * yScale;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();

        // White outline
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    // Highlight current vehicle point
    const currentWeight = parseFloat(weightSlider.value);
    const currentMileage = parseFloat(mileageValue.textContent);
    const currentX = padding + currentWeight * xScale;
    const currentY = canvas.height - padding - currentMileage * yScale;

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(currentX, currentY, 7, 0, 2 * Math.PI);
    ctx.fill();

    // White outline
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Weight (kg)', canvas.width - padding - 80, canvas.height - 10);

    ctx.save();
    ctx.translate(15, padding + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Mileage (km/l)', 0, 0);
    ctx.restore();
}

// Redraw chart on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (resultPanel.classList.contains('show')) {
            drawChart();
        }
    }, 250);
});

// Initialize
console.log('Fuel Efficiency Predictor loaded successfully!');
