# Fuel Efficiency Predictor - UI Prototype

A clean, modern, and fully functional front-end prototype for a Fuel Efficiency Predictor web application. This is a **demo-only interface** with no backend, API calls, or actual ML models.

## 🎯 Features

### Input Panel
- **5 Interactive Sliders** for vehicle specifications:
  - Engine Size (0.8L – 6.0L)
  - Horsepower (50 – 400 HP)
  - Weight (700 kg – 2500 kg)
  - Cylinders (3 – 12)
  - Acceleration 0-100 (5 sec – 25 sec)

- **Real-time value display** on each slider
- **Predict Mileage button** with smooth interactions

### Result Panel
- **Loading animation** (1.5 seconds) after clicking Predict
- **Mileage estimation** with large, prominent display
- **Interactive chart** showing Weight vs Mileage trend (using sample data)
- **Dynamic insights** based on current slider values:
  - Weight efficiency tips
  - Engine size recommendations
  - Horsepower efficiency analysis
  - Performance vs. economy trade-offs
- **Back button** to adjust settings and predict again

### Design
- ✨ **Light theme** with gradient accents (purple-blue)
- 🎨 **Smooth animations** and transitions
- 📱 **Fully responsive** (mobile, tablet, desktop)
- 🎯 **Minimal, clean UI** focused on usability
- 💫 **Subtle hover effects** and interactive feedback

## 📂 Project Structure

```
Fuel-Efficiency-Prediction-System/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and responsive design
├── script.js           # Interactivity and animations
└── README.md           # This file
```

## 🚀 How to Run

### Option 1: Open directly in browser
Simply open `index.html` in your web browser:
```bash
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

### Option 2: Use a local server (recommended)
```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node.js (if installed)
npx http-server
```
Then navigate to `http://localhost:8000`

## 💡 How to Use

1. **Adjust Sliders**: Use the interactive sliders to set your vehicle specifications
2. **View Real-time Values**: Each slider shows the current value in a badge
3. **Click "Predict Mileage"**: Triggers a 1.5-second loading animation
4. **View Results**: See estimated mileage, a trend chart, and personalized insights
5. **Adjust Again**: Click "Adjust Settings" to modify inputs and predict again

## 🎨 Customization

### Change Colors
Edit the gradient colors in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modify Prediction Logic
The mock prediction formula is in `script.js` in the `predictMileage()` function:
```javascript
// Base mileage and adjustments based on sliders
mileage -= engineSizeVal * 2;  // Penalty for larger engines
mileage -= (weightVal - 700) / 100 * 0.3;  // Weight penalty
// ... etc
```

### Update Insights
Edit the `generateInsights()` function to add custom insights based on slider values.

## 📊 Chart Library

The prototype uses **Chart.js** loaded from CDN for creating the trend chart. The chart displays sample data showing the relationship between vehicle weight and fuel efficiency.

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, gradients, animations, responsive design
- **Vanilla JavaScript** - No frameworks or libraries (except Chart.js for charts)
- **Chart.js** - For interactive data visualization

## 📱 Responsive Breakpoints

- Desktop: 800px+ (optimized layout)
- Tablet: 600px - 800px (adjusted padding and font sizes)
- Mobile: < 600px (single column, touch-friendly buttons)
- Extra Small: < 400px (compact layout)

## ✅ Tested Features

- ✅ All 5 sliders work and update values in real-time
- ✅ Smooth transitions between input and result panels
- ✅ Loading animation displays for 1.5 seconds
- ✅ Predicted mileage changes dynamically
- ✅ Chart renders correctly with sample data
- ✅ Insights update based on current slider values
- ✅ Back button returns to input panel
- ✅ Fully responsive on mobile and desktop

## 🎯 Future Enhancements (Not Included)

- Integration with actual ML model for real predictions
- Backend API for storing user history
- Comparison tool for multiple vehicles
- Export results as PDF
- Fuel cost calculator
- Real-world data validation

## 📝 Notes

- **No backend required** - Everything runs on the client side
- **No API calls** - All data is mock/sample data
- **No ML model** - Predictions use a simple formula for demonstration
- **No dependencies** - Only Chart.js from CDN (optional for the chart)

## 📄 License

This is a prototype/demo project. Feel free to use and modify as needed.

---

**Created**: November 2025  
**Purpose**: Front-end UI prototype for Fuel Efficiency Prediction System
