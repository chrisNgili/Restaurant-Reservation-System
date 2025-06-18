from flask import Flask
from models import db, User, Restaurant, Reservation, Menu, Review
from datetime import datetime, date
from app import app
from werkzeug.security import generate_password_hash

def seed_data():
    with app.app_context():
        db.session.query(Review).delete()
        db.session.query(Reservation).delete()
        db.session.query(Menu).delete()
        db.session.query(Restaurant).delete()
        db.session.query(User).delete()

        user1 = User(name='John Doe', email='chrisno223@gmail.com', phone='1234567890', is_admin=False, password=generate_password_hash("cccc"))
        user2 = User(name='Jane Smith', email='jane@example.com', phone='0987654321', is_admin=True, password=generate_password_hash("ffff"))

        restaurant1 = Restaurant(name='Gourmet Paradise', location='123 Food St', contacts='contact@gourmet.com', description='A fine dining experience.')
        restaurant2 = Restaurant(name='Fast Bites', location='456 Quick Ave', contacts='contact@fastbites.com', description='Quick and delicious meals.')

        menu_item1 = Menu(restaurant=restaurant1, item_name='Steak', description='Juicy and tender steak.', price=25.99)
        menu_item2 = Menu(restaurant=restaurant1, item_name='Salad', description='Fresh garden salad.', price=10.99)
        menu_item3 = Menu(restaurant=restaurant2, item_name='Burger', description='Classic cheese burger.', price=8.99)

        reservation1 = Reservation(user=user1, restaurant=restaurant1, date=date.fromisoformat('2023-12-01'), party_size=4)
        reservation2 = Reservation(user=user2, restaurant=restaurant2, date=date.fromisoformat('2023-12-02'), party_size=2)

        review1 = Review(user=user1, restaurant=restaurant1, rating=5, comment='Excellent food and service!')
        review2 = Review(user=user2, restaurant=restaurant2, rating=4, comment='Great place for a quick meal.')

        db.session.add_all([user1, user2, restaurant1, restaurant2, menu_item1, menu_item2, menu_item3, reservation1, reservation2, review1, review2])

        db.session.commit()
        print ("Done seeding")

if __name__ == '__main__':
    seed_data()
