# User Management System (url : https://grand-gaufre-8349de.netlify.app/ )

A React-based User Management System where users' data is fetched from an API and displayed with features like search, sort, pagination, and a detailed user view including location on a map.

## Features

- **Home Page**:
  - Displays a list of users fetched from an API.
  - Provides search functionality to filter users by name.
  - Allows sorting of users by name (A-Z or Z-A).
  - Pagination to navigate through users' list.
  - Each user has a button to view detailed information.
  
- **User Detail Page**:
  - Displays detailed information about a selected user, including:
    - Name
    - Username
    - Email
    - Phone
    - Website
    - Address (including geo-coordinates)
    - Company information (name, catchphrase, and BS)
  - A map section that shows the user's address location on a map using Leaflet.

- **404 Page**:
  - Displays a 404 error message when a route is not found.

- **Dark Mode**:
  - The theme of the application can be toggled between light and dark modes.

## Tech Stack

- **React**: Frontend library for building the user interface.
- **Material UI**: A popular React UI framework for building responsive layouts and components.
- **Redux**: State management for global application state, used for managing user data and theme state.
- **React Router**: For handling routing between pages.
- **Leaflet**: For displaying interactive maps.

## Setup

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

### Steps to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/abhiabhi150614/usermanagementsystem.git
   cd usermanagementsystem
   ```

2. Install the required dependencies:

   - Using npm:
     ```bash
     npm install
     ```

   - Or, using yarn:
     ```bash
     yarn install
     ```

3. Start the development server:

   - Using npm:
     ```bash
     npm start
     ```

   - Or, using yarn:
     ```bash
     yarn start
     ```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Folder Structure

- `src/components/`: Contains React components such as Home, UserDetail, and NotFound.
- `src/redux/`: Contains Redux slices for managing users and theme state.
- `src/App.js`: Main app component that handles routing and dark mode toggle.
- `src/index.js`: Entry point to the React app.
- `public/`: Contains static assets such as `index.html` and images.

## Dark Mode

The app features a dark mode toggle that allows users to switch between light and dark themes. The user's preference is stored in `localStorage` and persists across sessions.

    
