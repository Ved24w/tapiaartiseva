from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    name = db.Column(db.String(120))
    password_hash = db.Column(db.String(256))
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(150))
    date = db.Column(db.String(50), nullable=False)
    slot = db.Column(db.String(80))
    notes = db.Column(db.Text)
    status = db.Column(db.String(30), default="pending")  # pending/confirmed/cancelled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    description = db.Column(db.Text)
    date = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class GalleryItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(300))
    mimetype = db.Column(db.String(100))
    caption = db.Column(db.String(300))
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(150))
    amount = db.Column(db.Integer)  # in smallest currency unit (e.g., paise)
    razorpay_order_id = db.Column(db.String(200))
    razorpay_payment_id = db.Column(db.String(200))
    status = db.Column(db.String(50), default="initiated")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
