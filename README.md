## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called travel: `create database travel`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=travel
  DB_PASS=YOURPASSWORD
  SECRET_KEY=
  YELP_API_KEY=
  OCD_API_KEY=
  PUSHER_KEY=
  PUSHER_SECRET=
```

- Add a second `.env` file in the client folder with the following keys

```bash
REACT_APP_PUSHER_KEY=
OCD_API_KEY=
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create tables 'budget', 'itinerary', 'listItems', 'lists', 'messages', 'messagesReactions', 'tripAddresses', 'tripGroups', 'trips', 'users' and a junction table called 'users_tripGroups' in your database.

### Development

- Run `npm start` in project directory to start the Express server on port 5001
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

## Database Design

https://dbdesigner.page.link/MxyD23HGVUDv1LDd9

## Future Features

- Getting directions to and from addresses saved on the map
- Adding each traveller's location of origin to the map
- Integrate a more in-depth expense tracking feature with a third-party API (like Splitwise/Tricount)
- Document storage (ex. travel documents, activity tickets)
- Save and share itineraries for other families to enjoy
- Web scraping city pages for useful information (ex. how to access public transit, recommended events or activities)
- Different user accreditations & abilities (ex. trip admin, trip viewer)

## Technologies Used

- Express.js
- MySQL
- Postman
- Node.js
- Yelp API
- Pusher API
- Opencage API
- React Dnd
- Json web token
- Bcrypt
- Javascript
- React
- React router
- Leaflet
- HTML 5
- CSS
- Sass
- Bootstrap
