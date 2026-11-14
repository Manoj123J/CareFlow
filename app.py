"""
CareFlow — Flask Application Entry Point (app.py)
---------------------------------------------------------------------------
Lightweight routing harness serving Jinja2 templates:
- /             -> Homepage (Hero, 3 module cards, upcoming camps)
- /find-care    -> Facility directory, filters, nearby listings, tap-to-call
- /camps        -> Verified community health camps, bookmarking, report
- /blood-donors -> Voluntary donor directory & consent registration
- /emergency    -> 108, 101, 100 helplines & 5 first-aid guides
- /auth         -> Sign in & register single segmented form
"""

import os
from flask import Flask, render_template
from models import db

app = Flask(__name__)

# Basic Configuration with local fallback
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'careflow-dev-secret-key-2026')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL',
    'sqlite:///careflow_dev.db'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db.init_app(app)

# ---------------------------------------------------------------------------
# Frontend Page Routes (Autonomous, independent of database in v1)
# ---------------------------------------------------------------------------

@app.route('/')
def index():
    """Homepage: Hero, module overview, and upcoming camps preview."""
    return render_template('index.html')

@app.route('/find-care')
def find_care():
    """Module 1: Find Care interactive map and facility directory."""
    return render_template('find_care.html')

@app.route('/camps')
def camps():
    """Module 2: Health Camps verified directory, filters, and submissions."""
    return render_template('camps.html')

@app.route('/blood-donors')
def blood_donors():
    """Module 4: Blood Donor Connect search and voluntary registration."""
    return render_template('blood_donors.html')

@app.route('/emergency')
def emergency():
    """Emergency Helplines (108, 101, 100) and structured first-aid cards."""
    return render_template('emergency.html')

@app.route('/auth')
def auth():
    """Authentication view with segmented sign-in and registration."""
    return render_template('auth.html')

if __name__ == '__main__':
    with app.app_context():
        # Prepare local development database tables if not yet created
        try:
            db.create_all()
        except Exception:
            pass
    app.run(debug=True, host='0.0.0.0', port=5000)

