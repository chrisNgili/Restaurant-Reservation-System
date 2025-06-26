# Restaurant Reservation System

The Restaurant Reservation System is a full-stack web application designed to facilitate the process of making and managing restaurant reservations for customers and restaurant administrators. It supports multi-user functionality, allowing both regular users and admins to manage content.

## [Deployed Link](https://restaurant-reservation-system-ecru.vercel.app/)

## Features
### User functionalities
* Register an account with their personal credentials: email, username, password, phonenumber.

* Log in to their account using their credentials.

* Update their profile details.

* Browse through a list of all restaurants.

* View detailed information about a restaurant; including menus and reviews.

* Make a new reservation with details like date and party size.

* Delete their profile

* Leave reviews and ratings for the restaurants.

* View their profile.

### Admin functionalities
* Login as an admin to the admin panel.

* View a list of all the users.

* Manage restaurant details.

* Manage individual restaurant menus by adding, updating and deleting menu items.

* View and manage all reservations made by customers.

* Delete or update any content(restaurants, menus, reservations or users)

## Setup Instructions
### Prerequisites
* Node.js

* npm or yarn

* Python 3.8+

* Flask

* PostgreSQL

## Local setup:
* Clone the repository:
``` 
      git clone: https://github.com/chrisNgili/Restaurant-Reservation-System.git
      cd restaurant-reservation-system 
```
## Backend setup
* Set up Python virtual environment:
```  
      * cd Backend
      * pipenv install
      * pipenv shell
```
* Initialize the database
```
      flask db init
      flask db migrate -m"Initial migration"
      flask db upgrade
```

* Seeding the database
```
      python seed.py
```

## Frontend setup
* Navigate to client directory
```
      cd ../client
```

* Install dependencies
```
      npm install or yarn install
```

* Run the server
```
      npm run dev
```
## Known Bugs

The application runs well, no known bugs

## Technologies Used
### Frontend
* React : A JavaScript library for building User Interfaces

* React Router: For handling routing in the React application.

* Tailwind CSS: A Utility-first CSS framework for styling the application.

### Backend
* Flask: Python web framework

* SQLAlchemy: An ORM for database interactions

* Flask-JWT-Extended: For handling JWT authentication in Flask.

* PostgreSQL: For handling database interaction


## Acknowledgements
* Author : Christopher Ngili

## Contacts
Email : ngilichristopher@gmail.com

### License 
Licensed under the MIT License
