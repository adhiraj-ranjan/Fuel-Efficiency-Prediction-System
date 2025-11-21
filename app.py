from flask import Flask, render_template, jsonify, request
import os

app = Flask(__name__, template_folder='.', static_folder='.')

@app.route('/')
def index():
    """Serve the main application"""
    return render_template('index.html')

@app.route('/api/predict', methods=['POST'])
def predict():
    """Mock prediction endpoint for future API integration"""
    data = request.get_json()
    
    # Extract values
    engine_size = float(data.get('engineSize', 2.5))
    horsepower = float(data.get('horsepower', 150))
    weight = float(data.get('weight', 1300))
    cylinders = float(data.get('cylinders', 6))
    acceleration = float(data.get('acceleration', 10))
    
    # Mock calculation
    base_efficiency = 25
    weight_factor = (weight - 1300) / 1300 * -10
    engine_factor = (engine_size - 2.5) * -3
    hp_factor = (horsepower - 150) / 150 * -5
    cylinder_factor = (cylinders - 6) * -1.5
    acceleration_factor = (acceleration - 10) * 1
    
    prediction = base_efficiency + weight_factor + engine_factor + hp_factor + cylinder_factor + acceleration_factor
    prediction = max(8, min(35, prediction))
    
    return jsonify({
        'mileage': round(prediction, 1),
        'unit': 'km/l'
    })

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    print("🚗 Fuel Efficiency Predictor - Flask Server")
    print("📍 Starting server at http://localhost:5000")
    print("✨ Open your browser and visit http://localhost:5000")
    print("\nPress CTRL+C to stop the server\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
