// Slider Elements
const engineSize = document.getElementById('engineSize');
const horsepower = document.getElementById('horsepower');
const weight = document.getElementById('weight');
const cylinders = document.getElementById('cylinders');
const acceleration = document.getElementById('acceleration');

// Value Display Elements
const engineSizeValue = document.getElementById('engineSizeValue');
const horsepowerValue = document.getElementById('horsepowerValue');
const weightValue = document.getElementById('weightValue');
const cylindersValue = document.getElementById('cylindersValue');
const accelerationValue = document.getElementById('accelerationValue');

// Result Elements
const mileageValue = document.getElementById('mileageValue');
const insightsList = document.getElementById('insightsList');

// Vehicle Selector
const vehicleSelect = document.getElementById('vehicleSelect');

// Chart
let trendChart = null;

// Vehicle presets - realistic values based on actual car models
const vehiclePresets = {
    civic: {
        engineSize: 2.0,
        horsepower: 158,
        weight: 1300,
        cylinders: 4,
        acceleration: 8.5,
        name: "Honda Civic (2023)"
    },
    accord: {
        engineSize: 2.0,
        horsepower: 180,
        weight: 1500,
        cylinders: 4,
        acceleration: 7.8,
        name: "Honda Accord (2023)"
    },
    corolla: {
        engineSize: 1.8,
        horsepower: 139,
        weight: 1275,
        cylinders: 4,
        acceleration: 9.2,
        name: "Toyota Corolla (2023)"
    },
    camry: {
        engineSize: 2.5,
        horsepower: 203,
        weight: 1550,
        cylinders: 4,
        acceleration: 7.5,
        name: "Toyota Camry (2023)"
    },
    crv: {
        engineSize: 1.5,
        horsepower: 190,
        weight: 1650,
        cylinders: 4,
        acceleration: 8.2,
        name: "Honda CR-V (2023)"
    },
    rav4: {
        engineSize: 2.5,
        horsepower: 203,
        weight: 1680,
        cylinders: 4,
        acceleration: 8.0,
        name: "Toyota RAV4 (2023)"
    },
    highlander: {
        engineSize: 3.5,
        horsepower: 295,
        weight: 2000,
        cylinders: 6,
        acceleration: 7.2,
        name: "Toyota Highlander (2023)"
    },
    f150: {
        engineSize: 5.0,
        horsepower: 400,
        weight: 2200,
        cylinders: 8,
        acceleration: 6.5,
        name: "Ford F-150 (2023)"
    },
    mustang: {
        engineSize: 5.0,
        horsepower: 480,
        weight: 1550,
        cylinders: 8,
        acceleration: 4.5,
        name: "Ford Mustang (2023)"
    },
    tesla: {
        engineSize: 0.0,
        horsepower: 261,
        weight: 1650,
        cylinders: 0,
        acceleration: 5.8,
        name: "Tesla Model 3 (2023)"
    },
    prius: {
        engineSize: 1.8,
        horsepower: 120,
        weight: 1445,
        cylinders: 4,
        acceleration: 10.5,
        name: "Toyota Prius (2023)"
    },
    bmw: {
        engineSize: 3.0,
        horsepower: 382,
        weight: 1600,
        cylinders: 6,
        acceleration: 5.2,
        name: "BMW M440i (2023)"
    }
};

// Handle vehicle selection
function handleVehicleSelect(event) {
    const selectedVehicle = event.target.value;
    
    if (selectedVehicle && vehiclePresets[selectedVehicle]) {
        const preset = vehiclePresets[selectedVehicle];
        
        // Set slider values
        engineSize.value = preset.engineSize;
        horsepower.value = preset.horsepower;
        weight.value = preset.weight;
        cylinders.value = preset.cylinders;
        acceleration.value = preset.acceleration;
        
        // Update all displays and calculations
        updateAll();
    }
}

// Vehicle selector event listener
vehicleSelect.addEventListener('change', handleVehicleSelect);

// Update slider values and results in real-time
function updateAll() {
    // Update display values
    engineSizeValue.textContent = parseFloat(engineSize.value).toFixed(1);
    horsepowerValue.textContent = horsepower.value;
    weightValue.textContent = weight.value;
    cylindersValue.textContent = cylinders.value;
    accelerationValue.textContent = parseFloat(acceleration.value).toFixed(1);

    // Update mileage prediction
    const predictedMileage = predictMileage();
    mileageValue.textContent = predictedMileage;

    // Update insights
    const insights = generateInsights();
    insightsList.innerHTML = insights
        .map(insight => `<li>${insight}</li>`)
        .join('');

    // Update chart
    updateChart();
}

// Mock prediction function - More realistic formula
function predictMileage() {
    const engineSizeVal = parseFloat(engineSize.value);
    const horsepowerVal = parseFloat(horsepower.value);
    const weightVal = parseFloat(weight.value);
    const cylindersVal = parseFloat(cylinders.value);
    const accelerationVal = parseFloat(acceleration.value);

    // Base mileage adjusted by number of cylinders (more realistic)
    // 3-cyl: 26, 4-cyl: 25, 6-cyl: 21, 8-cyl: 17, 10-12 cyl: 14
    let baseMileage = 25;
    if (cylindersVal <= 3) baseMileage = 26;
    else if (cylindersVal === 4) baseMileage = 25;
    else if (cylindersVal === 6) baseMileage = 21;
    else if (cylindersVal === 8) baseMileage = 17;
    else if (cylindersVal > 8) baseMileage = 14;

    let mileage = baseMileage;

    // Engine size penalty (displacement strongly affects fuel consumption)
    // Each 0.5L adds roughly 1.5 km/l penalty
    mileage -= (engineSizeVal - 1.5) * 3;

    // Weight penalty (each 100kg reduces efficiency by ~0.8 km/l)
    mileage -= ((weightVal - 1000) / 100) * 0.8;

    // Horsepower factor (more realistic curve)
    // 50-100 HP: very efficient (small bonus)
    // 100-200 HP: moderate efficiency
    // 200-300 HP: significant penalty
    // 300+ HP: high penalty
    if (horsepowerVal <= 100) {
        mileage += (100 - horsepowerVal) * 0.02; // Small bonus for low HP
    } else if (horsepowerVal <= 200) {
        mileage -= (horsepowerVal - 100) * 0.02;
    } else if (horsepowerVal <= 300) {
        mileage -= (horsepowerVal - 100) * 0.04;
    } else {
        mileage -= (horsepowerVal - 100) * 0.06;
    }

    // Acceleration factor (0-100 time)
    // Faster acceleration (lower time) = more aggressive engine tuning = worse efficiency
    if (accelerationVal > 15) {
        mileage += (accelerationVal - 10) * 0.1; // Bonus for slow acceleration
    } else if (accelerationVal > 10) {
        mileage -= (15 - accelerationVal) * 0.15;
    } else {
        mileage -= (10 - accelerationVal) * 0.3;
    }

    // Realistic bounds (typical cars range from 8-32 km/l)
    mileage = Math.max(8, Math.min(32, mileage));

    return parseFloat(mileage.toFixed(1));
}

// Generate comprehensive insights based on all parameters
function generateInsights() {
    const engineSizeVal = parseFloat(engineSize.value);
    const horsepowerVal = parseFloat(horsepower.value);
    const weightVal = parseFloat(weight.value);
    const accelerationVal = parseFloat(acceleration.value);
    const cylindersVal = parseFloat(cylinders.value);
    const mileage = predictMileage();

    const insights = [];

    // ===== Weight Analysis =====
    if (weightVal > 2200) {
        insights.push("⚠️ Very heavy vehicle. Weight is a major efficiency factor - each 100kg reduces efficiency by ~0.8 km/l.");
    } else if (weightVal > 1800) {
        insights.push("🚗 Heavy vehicle. Reducing weight through lighter materials could significantly improve economy.");
    } else if (weightVal < 900) {
        insights.push("✅ Excellent - lightweight design is one of the best ways to improve fuel efficiency!");
    } else if (weightVal < 1200) {
        insights.push("✅ Good weight. This vehicle is well-balanced for efficiency.");
    } else {
        insights.push("ℹ️ Moderate weight - typical for most vehicles.");
    }

    // ===== Engine Size Analysis =====
    if (engineSizeVal > 5.0) {
        insights.push("⚠️ Large displacement engine. Downsizing to a smaller engine would dramatically improve efficiency.");
    } else if (engineSizeVal > 3.5) {
        insights.push("Large engine detected. This is suitable for performance but reduces efficiency significantly.");
    } else if (engineSizeVal < 1.2) {
        insights.push("✅ Excellent - small, efficient engine! Ideal for city driving.");
    } else if (engineSizeVal < 2.0) {
        insights.push("✅ Good engine size - balanced between efficiency and performance.");
    } else {
        insights.push("ℹ️ Moderate engine size - typical for family vehicles.");
    }

    // ===== Horsepower Analysis =====
    if (horsepowerVal < 80) {
        insights.push("⚡ Low horsepower. While efficient, acceleration may feel sluggish in traffic.");
    } else if (horsepowerVal >= 100 && horsepowerVal <= 180) {
        insights.push("✅ Ideal horsepower range. Good balance between efficiency and performance.");
    } else if (horsepowerVal > 250) {
        insights.push("⚠️ High horsepower. Sports/performance engine - efficiency is sacrificed for power.");
    } else if (horsepowerVal > 200) {
        insights.push("Above-average power. Good for highway driving but reduces efficiency.");
    } else {
        insights.push("ℹ️ Moderate horsepower - typical for standard vehicles.");
    }

    // ===== Acceleration Analysis =====
    if (accelerationVal < 7) {
        insights.push("🏎️ Very fast acceleration. This indicates a performance-tuned engine with high fuel consumption.");
    } else if (accelerationVal < 9) {
        insights.push("Fast acceleration. Performance-oriented tuning typically reduces fuel efficiency.");
    } else if (accelerationVal > 18) {
        insights.push("Slower acceleration. This is common in economy vehicles and helps with fuel efficiency.");
    } else if (accelerationVal > 14) {
        insights.push("ℹ️ Moderate acceleration - typical for most vehicles.");
    } else {
        insights.push("Standard acceleration performance.");
    }

    // ===== Cylinder Analysis =====
    if (cylindersVal <= 3) {
        insights.push("✅ 3-cylinder engine - excellent for efficiency! Minimal fuel consumption.");
    } else if (cylindersVal === 4) {
        insights.push("✅ 4-cylinder engine - the most efficient option. Most economical vehicles use this.");
    } else if (cylindersVal === 6) {
        insights.push("ℹ️ 6-cylinder engine. Smoother but less efficient than 4-cylinder equivalents.");
    } else if (cylindersVal >= 8) {
        insights.push("⚠️ V8 or larger engine. Typically found in trucks, SUVs, or sports cars. Low efficiency.");
    }

    // ===== Overall Efficiency Rating =====
    if (mileage >= 28) {
        insights.push("🌟 Excellent efficiency! This vehicle is very fuel-efficient for its class.");
    } else if (mileage >= 22) {
        insights.push("Good efficiency. This vehicle offers reasonable fuel economy.");
    } else if (mileage >= 16) {
        insights.push("Moderate efficiency. Typical for larger vehicles or performance models.");
    } else if (mileage >= 10) {
        insights.push("⚠️ Low efficiency. Consider the trade-offs between performance and economy.");
    } else {
        insights.push("⚠️ Very low efficiency. This combination is not optimized for fuel economy.");
    }

    // ===== Recommendations =====
    if (engineSizeVal > 3 && weightVal > 1600) {
        insights.push("💡 Tip: Reducing both engine size and weight would have the most impact on efficiency.");
    } else if (engineSizeVal > 3) {
        insights.push("💡 Tip: Consider an engine downsizing strategy for better fuel economy.");
    } else if (horsepowerVal > 250) {
        insights.push("💡 Tip: Performance engines sacrifice efficiency. Your current setup prioritizes power.");
    } else if (weightVal > 1800) {
        insights.push("💡 Tip: Weight reduction through lighter materials would improve efficiency significantly.");
    }

    // ===== Maintenance Note =====
    insights.push("🔧 Keep your vehicle well-maintained - proper tire pressure and regular servicing improve efficiency by 3-5%.");

    return insights;
}

// Create/Update the trend chart
function initChart() {
    const ctx = document.getElementById('trendChart');
    
    // Generate dynamic data based on current engine size
    const chartData = generateChartData();

    const config = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 300
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: { size: 13, weight: 600 },
                        color: '#555',
                        boxWidth: 12,
                        padding: 15,
                    }
                },
                filler: {
                    propagate: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 35,
                    ticks: {
                        font: { size: 12 },
                        color: '#999',
                        callback: function(value) {
                            return value + ' km/l';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        font: { size: 12 },
                        color: '#999'
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    };

    trendChart = new Chart(ctx, config);
}

function generateChartData() {
    const engineSizeVal = parseFloat(engineSize.value);
    const horsepowerVal = parseFloat(horsepower.value);
    const cylindersVal = parseFloat(cylinders.value);
    const accelerationVal = parseFloat(acceleration.value);

    // Calculate mileage for different weights using realistic formula
    const weights = [700, 1000, 1300, 1600, 1900, 2200, 2500];
    const mileages = weights.map(w => {
        let baseMileage = 25;
        if (cylindersVal <= 3) baseMileage = 26;
        else if (cylindersVal === 4) baseMileage = 25;
        else if (cylindersVal === 6) baseMileage = 21;
        else if (cylindersVal === 8) baseMileage = 17;
        else if (cylindersVal > 8) baseMileage = 14;

        let mileage = baseMileage;
        mileage -= (engineSizeVal - 1.5) * 3;
        mileage -= ((w - 1000) / 100) * 0.8;

        if (horsepowerVal <= 100) {
            mileage += (100 - horsepowerVal) * 0.02;
        } else if (horsepowerVal <= 200) {
            mileage -= (horsepowerVal - 100) * 0.02;
        } else if (horsepowerVal <= 300) {
            mileage -= (horsepowerVal - 100) * 0.04;
        } else {
            mileage -= (horsepowerVal - 100) * 0.06;
        }

        if (accelerationVal > 15) {
            mileage += (accelerationVal - 10) * 0.1;
        } else if (accelerationVal > 10) {
            mileage -= (15 - accelerationVal) * 0.15;
        } else {
            mileage -= (10 - accelerationVal) * 0.3;
        }

        mileage = Math.max(8, Math.min(32, mileage));
        return parseFloat(mileage.toFixed(1));
    });

    return {
        labels: ['700kg', '1000kg', '1300kg', '1600kg', '1900kg', '2200kg', '2500kg'],
        datasets: [
            {
                label: 'Estimated Mileage (km/l)',
                data: mileages,
                borderColor: '#1967d2',
                backgroundColor: 'rgba(25, 103, 210, 0.05)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#1967d2',
                pointBorderColor: 'white',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
            }
        ]
    };
}

function updateChart() {
    if (trendChart) {
        const newData = generateChartData();
        trendChart.data = newData;
        trendChart.update('none');
    }
}

// Event listeners - update in real-time
engineSize.addEventListener('input', updateAll);
horsepower.addEventListener('input', updateAll);
weight.addEventListener('input', updateAll);
cylinders.addEventListener('input', updateAll);
acceleration.addEventListener('input', updateAll);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    updateAll();
});
