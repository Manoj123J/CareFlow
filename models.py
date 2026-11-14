"""
CareFlow — Database Models (models.py)
---------------------------------------------------------------------------
Declarative SQLAlchemy models for future PostgreSQL persistence:
- User: Registered accounts & administrators
- Camp: Community-submitted & verified health camps
- Report: User reports on camp listings
- Donor: Voluntary blood donor registry with privacy
"""

from datetime import datetime, date
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# ---------------------------------------------------------------------------
# 1. User Model
# ---------------------------------------------------------------------------
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    donors = db.relationship('Donor', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'


# ---------------------------------------------------------------------------
# 2. Health Camp Model
# ---------------------------------------------------------------------------
class Camp(db.Model):
    __tablename__ = 'camps'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    organizer_name = db.Column(db.String(200), nullable=False)
    contact_number = db.Column(db.String(50), nullable=False)
    camp_date = db.Column(db.Date, nullable=False, index=True)
    start_time = db.Column(db.String(50), nullable=True)
    end_time = db.Column(db.String(50), nullable=True)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(100), nullable=False, index=True)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    services = db.Column(db.Text, nullable=False)  # Stored as comma-separated or JSON string
    source = db.Column(db.String(50), default='Community submitted', nullable=False)
    status = db.Column(db.String(20), default='pending', nullable=False, index=True)  # 'pending', 'verified', 'rejected'
    submitted_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    reports = db.relationship('Report', backref='camp', lazy=True)

    # FUTURE QUERY REFERENCE:
    # Query to fetch only upcoming verified camps ordered chronologically:
    # Camp.query.filter(
    #     Camp.status == 'verified',
    #     Camp.camp_date >= date.today()
    # ).order_by(Camp.camp_date.asc()).all()

    def __repr__(self):
        return f'<Camp {self.title} ({self.city})>'


# ---------------------------------------------------------------------------
# 3. Report Model (Flagged Camps)
# ---------------------------------------------------------------------------
class Report(db.Model):
    __tablename__ = 'reports'

    id = db.Column(db.Integer, primary_key=True)
    camp_id = db.Column(db.Integer, db.ForeignKey('camps.id'), nullable=False)
    reason = db.Column(db.String(255), nullable=False)
    resolved = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f'<Report for Camp {self.camp_id}: {self.reason}>'


# ---------------------------------------------------------------------------
# 4. Voluntary Blood Donor Model
# ---------------------------------------------------------------------------
class Donor(db.Model):
    __tablename__ = 'donors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    blood_group = db.Column(db.String(10), nullable=False, index=True)
    city = db.Column(db.String(100), nullable=False, index=True)
    phone = db.Column(db.String(50), nullable=False)  # Never exposed publicly on frontend!
    available = db.Column(db.Boolean, default=True, nullable=False)
    last_donated = db.Column(db.Date, nullable=True)
    consent = db.Column(db.Boolean, default=False, nullable=False)
    status = db.Column(db.String(20), default='approved', nullable=False)  # 'pending', 'approved'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f'<Donor {self.name} ({self.blood_group}) - {self.city}>'




