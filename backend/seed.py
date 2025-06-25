from flask import Flask
from models import db, User, Restaurant, Reservation, Menu, Review
from datetime import date
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
        user2 = User(name='Jane Smith', email='1@gmail.com', phone='0987654321', is_admin=True, password=generate_password_hash("1111"))

        restaurants = [
            {"name": "Ankole Grill", "location": "Kilimani", "contacts": "ankole@grill.co.ke", "description": "Upscale African grill serving premium meats.",
             "menu": [("Ankole Big Breakfast", "Steak, eggs, toast, hashbrowns.", 1500), ("Crispy Chicken & Avocado Burger", "Served with fries.", 1590)]},
            {"name": "Talisman", "location": "Karen", "contacts": "info@talismanrestaurant.com", "description": "Fusion cuisine in a rustic-chic setting.",
             "menu": [("Feta Samosas", "House specialty starter.", 950), ("Lavender & Honeycomb Gelato", "Artisan dessert.", 475)]},
            {"name": "Crave Kenya", "location": "Westlands", "contacts": "orders@crave.co.ke", "description": "Contemporary comfort food with Kenyan twists.",
             "menu": [("Chicken Shawarma & Chips", "Spicy, juicy & loaded.", 500), ("Chicken Tacos & Rice", "Topped with slaw.", 580)]},
            {"name": "Carnivore", "location": "Langata", "contacts": "eat@carnivore.co.ke", "description": "All-you-can-eat meat feast & Nairobi icon.",
             "menu": [("Beast Pizza", "Loaded with meats.", 1200), ("Moana Chocolate", "Chocolate dessert cake.", 520)]},
            {"name": "About Thyme", "location": "Westlands", "contacts": "info@aboutthyme.co.ke", "description": "Laid-back garden eatery with global bites.",
             "menu": [("Pumpkin Tortellini", "In creamy amaretti sauce.", 1300), ("Buddha Bowl", "Colorful veggie bowl.", 1100)]},
            {"name": "Bao Box", "location": "Pramukh Towers, Westlands", "contacts": "play@baobox.co.ke", "description": "Board games + food = perfect hangout.",
             "menu": [("Crispy Fried Chicken", "Crisp, tender chicken strips.", 950), ("Loaded Fries", "Cheesy & saucy.", 400)]},
            {"name": "Mama Rocks", "location": "The Alchemist, Westlands", "contacts": "info@mamarocksburger.com", "description": "Gourmet Afro-burgers from a funky food truck.",
             "menu": [("Sapeur Burger", "Signature spicy beef patty.", 950), ("Coconut Rice Bowl", "Vegan delight with beans.", 700)]},
            {"name": "Chowpaty", "location": "Diamond Plaza", "contacts": "contact@chowpaty.co.ke", "description": "Pure vegetarian Indian fast food.",
             "menu": [("Dahi Puri", "Crunchy, spicy, and cool.", 320), ("Chilly Paneer", "Indo-Chinese favorite.", 1360)]},
            {"name": "Fogo Gaucho", "location": "Westlands & Kilimani", "contacts": "reservations@fogogaucho.co.ke", "description": "Brazilian grill house with unlimited meats.",
             "menu": [("Rodízio", "All-you-can-eat grilled meats.", 3200), ("Salad Bar", "Fresh veggies, pasta & more.", 1200)]}
        ]

        restaurant_objs = [Restaurant(name=r["name"], location=r["location"], contacts=r["contacts"], description=r["description"]) for r in restaurants]
        menu_objs = [Menu(restaurant=rest, item_name=item[0], description=item[1], price=item[2]) for r in restaurants for rest in restaurant_objs if r["name"] == rest.name for item in r["menu"]]

        reservation1 = Reservation(user=user1, restaurant=restaurant_objs[0], date=date.fromisoformat('2023-12-01'), party_size=4)
        reservation2 = Reservation(user=user2, restaurant=restaurant_objs[1], date=date.fromisoformat('2023-12-02'), party_size=2)

        review1 = Review(user=user1, restaurant=restaurant_objs[0], rating=5, comment='Amazing steaks and ambiance!')
        review2 = Review(user=user2, restaurant=restaurant_objs[1], rating=4, comment='Love the samosas and service.')

        db.session.add_all([user1, user2] + restaurant_objs + menu_objs + [reservation1, reservation2, review1, review2])
        db.session.commit()
        print("Done seeding!")

if __name__ == '__main__':
    seed_data()
