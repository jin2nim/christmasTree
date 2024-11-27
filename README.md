###Christmas Music App with Tree Decoration

### 🎵 A Project for Sign-Up, Login, Listening to Music, Earning Points, and Decorating a Tree to Share with Other Users

This project is a web application where users can sign up, log in, listen to music, earn points, decorate a tree, and share it with others. Users can log in, listen to music, earn points, and use those points to decorate their own tree, which they can then share with others.

## 🚀 Key Features

- **Sign-Up and Login**: Users can sign up and log in to access the system.
- **Listen to Music**: Users can listen to various music tracks and earn points.
- **Points System**: Points are earned by listening to music, which can be used to decorate the tree.
- **Decorate a Tree**: Users can use their points to decorate their tree with various items.
- **Share**: Users can share their decorated tree with others on social media or other platforms.

## 📦 Installation Instructions

To run this project locally, follow these steps:

### 1. Clone the Project

Clone the repository:

```bash
git clone https://github.com/yourusername/music-points-tree.git
```

### 2. Install Dependencies

Navigate to the project directory and install the necessary dependencies:

```bash
cd music-points-tree
npm install
```

The `npm install` command will automatically install all the required packages listed in `package.json`.

### 3. Run the Application

To start the application, use:

```bash
npm start
```

You can access the application at `http://localhost:3000` in your browser.

## 📚 Technology Stack

- **Frontend**: React, Axios
- **Data Management**: LocalStorage, JSON Files
- **CSS Framework**: Bootstrap or Custom CSS

## 🛠️ Feature Implementation

1. **Sign-Up and Login**:
   - Users sign up with an email and password, and upon logging in, their session is stored in LocalStorage to persist their authentication.
<img width="768" alt="Screenshot 2024-11-20 at 1 01 15 PM" src="https://github.com/user-attachments/assets/377902c7-36f0-4704-9b66-15dd3d447cd6">
<img width="768" alt="Screenshot 2024-11-20 at 1 01 22 PM" src="https://github.com/user-attachments/assets/a6662aa8-66bc-417f-baf5-aee65687d80b">

2. **Listening to Music**:
   - Users can listen to music and earn points. Music data is loaded from the `music.json` file.
     

3. **Points System**:
   - Points are earned by listening to music. Users can spend their points to decorate their tree.

4. **Decorating the Tree**:
   - Users can spend their points on various items (tree decorations, backgrounds, etc.) to decorate their tree.

5. **Sharing**:
   - Users can share their decorated tree with others on social media or other platforms.

## ⚙️ LocalStorage and JSON File Usage

### 1. `music.json` File

- Music data is stored in the `music.json` file, which the application loads to present a list of available music for users to listen to.
- The `music.json` file is located at `public/music.json`, and it follows this format:

```json
[
  {
    "id": 1,
    "name": "Zac Nelson - Merry Christmas",
    "artist": "Zac Nelson",
    "duration":149,
    "src": "/Music/Zac Nelson - Merry Christmas.mp3",
    "img":"/svg/album/default.jpg"
  },
  {
    "id": 2,
    "name": "Wolf Samuels - We Wish You a Merry Christmas",
    "artist": "Wolf Samuels",
    "duration":96,
    "src": "/Music/Wolf Samuels - We Wish You a Merry Christmas.mp3",
    "img":"/svg/album/We-Wish-You-A-Merry-Christmas.jpg"
  },
]
```

### 2. Using LocalStorage

- When users log in, their session information is saved to LocalStorage.
- Points earned and tree data are also saved to LocalStorage, so data persists even if the application is closed or the page is refreshed.

### 3. Data Initialization

When the project runs, if `localStorage` doesn't contain any data, the application will set default data. For example, if there's no music data or points, it will initialize with the default values.


## 📝 License
//add design license
This project is licensed under the [MIT License](LICENSE).
