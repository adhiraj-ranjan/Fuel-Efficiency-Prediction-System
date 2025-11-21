# 🚀 Flask Setup & Deployment Guide

## Overview

The Fuel Efficiency Predictor is now hosted using **Flask**, a lightweight Python web framework.

---

## ✅ Current Setup Status

### Server Running
- ✅ Flask server started
- ✅ Running on `http://localhost:5000`
- ✅ Development mode enabled
- ✅ Debug mode active
- ✅ Auto-reload enabled

### Files Created
```
app.py              ← Flask application
requirements.txt    ← Python dependencies
```

---

## 🎯 What's New

### Flask Application (`app.py`)
A lightweight Flask server that:
- Serves the HTML, CSS, JS frontend
- Provides mock prediction API endpoint
- Includes health check endpoint
- Runs in debug mode for development

### Key Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Serve main application |
| `/api/predict` | POST | Mock prediction API |
| `/health` | GET | Health check |

---

## 🚀 Quick Start

### Option 1: Already Running!
```
✅ Server is already running
📍 Visit: http://localhost:5000
🎉 App is ready to use!
```

### Option 2: Restart the Server
```bash
# From project directory
python app.py

# Output:
# 🚗 Fuel Efficiency Predictor - Flask Server
# 📍 Starting server at http://localhost:5000
# ✨ Open your browser and visit http://localhost:5000
```

### Option 3: Install & Run From Scratch
```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

---

## 📦 Dependencies

### Required Packages
- `Flask==2.3.3` - Web framework
- `Werkzeug==2.3.7` - WSGI utilities

### Install
```bash
pip install -r requirements.txt
```

---

## 🔧 How It Works

### 1. Request Flow
```
Browser Request
    ↓
Flask Router (app.py)
    ↓
Serve Static Files (HTML, CSS, JS)
    ↓
Browser Renders UI
    ↓
User Interaction
```

### 2. Frontend Architecture
```
index.html (served by Flask)
├── styles.css (loaded by browser)
├── script.js (executed by browser)
└── Canvas Chart (drawn client-side)
```

### 3. API Integration (Optional)
```
Frontend (script.js)
    ↓
API Request (/api/predict)
    ↓
Flask Backend (app.py)
    ↓
Mock Calculation
    ↓
JSON Response
    ↓
Update Frontend Display
```

---

## 💡 Flask Application Structure

### `app.py` Breakdown

```python
# 1. Initialize Flask App
app = Flask(__name__, template_folder='.', static_folder='.')

# 2. Main Route (serves HTML)
@app.route('/')
def index():
    return render_template('index.html')

# 3. API Route (optional for real predictions)
@app.route('/api/predict', methods=['POST'])
def predict():
    # Get data from frontend
    # Calculate prediction
    # Return JSON response

# 4. Health Check Route
@app.route('/health')
def health():
    return jsonify({'status': 'ok'}), 200

# 5. Run Server
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
```

---

## 📍 Access Points

### Development Server
```
URL: http://localhost:5000
Type: Local development
Debug: Enabled
Auto-reload: Enabled
```

### From Other Machines (Same Network)
```
URL: http://<your-ip>:5000
(Replace <your-ip> with your machine's IP address)
```

### Docker Container
```
URL: http://localhost:5000
(Already working in dev container)
```

---

## 🎮 Using the App

### Frontend (Client-Side)
The original JavaScript still works! All features:
- ✅ 5 interactive sliders
- ✅ Real-time value updates
- ✅ Smooth animations
- ✅ Loading states
- ✅ Chart rendering

### Backend (Server-Side)
New capability (optional):
- 📡 API endpoint for predictions
- 🔄 Can be replaced with real ML API
- 📊 Mock calculations included
- ✨ Extensible design

---

## 🔌 Frontend-Backend Integration

### Current Setup (Mock)
```javascript
// Frontend stays the same
// All calculations happen client-side
// No API calls yet
```

### Optional: Enable Backend API
To use the Flask API instead of client-side calculations:

1. **Modify `script.js`** (in `simulatePrediction` function):
```javascript
async function simulatePrediction() {
    showLoading();
    
    // Call Flask API instead of local calculation
    const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            engineSize: engineSizeSlider.value,
            horsepower: horsepowerSlider.value,
            weight: weightSlider.value,
            cylinders: cylindersSlider.value,
            acceleration: accelerationSlider.value
        })
    });
    
    const data = await response.json();
    mileageValue.textContent = data.mileage + ' ' + data.unit;
    
    hideLoading();
    displayResults();
}
```

2. **Save and refresh browser** - API will be used for predictions

---

## 📊 Application Architecture

```
┌─────────────────────────────────────────┐
│         Browser / Client Side           │
├─────────────────────────────────────────┤
│  index.html  │  styles.css  │  script.js│
│  (HTML)      │   (CSS)      │ (JavaScript)
└────────────────────┬────────────────────┘
                     │ HTTP Requests
                     ↓
┌─────────────────────────────────────────┐
│     Flask Server / Backend              │
├─────────────────────────────────────────┤
│  app.py (Python)                        │
│  - Route: /          → index.html       │
│  - Route: /api/predict → JSON response  │
│  - Route: /health    → status check     │
└─────────────────────────────────────────┘
```

---

## 🛠️ Customization

### Change Server Port
In `app.py`, modify:
```python
app.run(debug=True, host='0.0.0.0', port=8080)  # Change 5000 to 8080
```

### Change Debug Mode
```python
app.run(debug=False, ...)  # Disable debug for production
```

### Change Host
```python
app.run(debug=True, host='127.0.0.1', ...)  # Only localhost
# or
app.run(debug=True, host='0.0.0.0', ...)    # All interfaces
```

---

## 🔒 Security Notes (Development Only)

⚠️ **Current Setup is for Development Only**

For production, you should:
- [ ] Disable debug mode
- [ ] Use a production WSGI server (Gunicorn, etc.)
- [ ] Add CORS headers if needed
- [ ] Validate all input data
- [ ] Use HTTPS
- [ ] Set up proper logging
- [ ] Add authentication/authorization

### Production Setup Example
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

---

## 📈 Performance

### Development Server
- Single-threaded
- Auto-reload enabled
- Debug mode active
- Suitable for development only

### Production Considerations
- Use Gunicorn/uWSGI
- Run multiple workers
- Use reverse proxy (Nginx)
- Enable caching
- Optimize static files

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port in app.py
```

### Module Not Found
```bash
# Install dependencies
pip install -r requirements.txt
```

### Connection Refused
```bash
# Make sure server is running
python app.py

# Check firewall settings
```

---

## 📚 Flask Documentation

- **Official Docs**: https://flask.palletsprojects.com/
- **Quickstart**: https://flask.palletsprojects.com/quickstart/
- **API Reference**: https://flask.palletsprojects.com/api/

---

## 🚀 Next Steps

### Option 1: Use As-Is
- ✅ Perfect for demo/development
- ✅ No additional configuration needed
- ✅ Ready to show to others on network

### Option 2: Prepare for Production
- [ ] Disable debug mode
- [ ] Set up Gunicorn
- [ ] Configure Nginx reverse proxy
- [ ] Set up SSL/TLS
- [ ] Configure logging

### Option 3: Enhance Backend
- [ ] Add database integration
- [ ] Implement real ML model
- [ ] Add user authentication
- [ ] Create admin dashboard
- [ ] Add more API endpoints

### Option 4: Deploy
- [ ] Heroku deployment
- [ ] AWS EC2 deployment
- [ ] Docker containerization
- [ ] DigitalOcean VPS
- [ ] PythonAnywhere hosting

---

## 📁 Project Structure

```
/workspaces/Fuel-Efficiency-Prediction-System/
│
├── 🐍 Python/Flask Files
│   ├── app.py                 ← Flask application
│   └── requirements.txt       ← Python dependencies
│
├── 🌐 Frontend Files
│   ├── index.html             ← Main HTML
│   ├── styles.css             ← Styling
│   └── script.js              ← Client-side logic
│
└── 📚 Documentation Files
    ├── README.md
    ├── QUICKSTART.md
    ├── IMPLEMENTATION.md
    ├── DEPLOYMENT.md           ← This file
    └── ...other docs...
```

---

## 🎯 Current Status

✅ **Flask Server Running**
- Port: 5000
- Mode: Development
- Debug: Enabled
- Auto-reload: Enabled

✅ **Frontend Ready**
- All original features working
- Responsive design active
- Smooth animations enabled

✅ **API Available**
- `/api/predict` endpoint ready
- Mock predictions implemented
- JSON responses working

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Start server | `python app.py` |
| Install deps | `pip install -r requirements.txt` |
| Open app | `http://localhost:5000` |
| Stop server | `CTRL+C` |
| Check health | `curl http://localhost:5000/health` |

---

**Status**: ✅ Flask Server Running  
**Location**: http://localhost:5000  
**Date**: November 21, 2025  

Enjoy your Flask-hosted Fuel Efficiency Predictor! 🚗⛽
