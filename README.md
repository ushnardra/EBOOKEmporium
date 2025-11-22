# Ebook Emporium

A modern, dynamic web application for browsing, buying, and selling ebooks. Built with React and Vite, featuring a sleek user interface and a mock backend for seamless data management.

## 🚀 Features

-   **📚 Browse Collection**: Explore a wide variety of ebooks with detailed descriptions and ratings.
-   **🔍 Book Details**: View in-depth information about each book, including reviews and pricing.
-   **💰 Sell Your Books**: Easy-to-use interface for users to list their own ebooks for sale.
-   **🔐 User Authentication**: Secure Sign Up and Login functionality to manage your account.
-   **⭐ Star Ratings**: Interactive rating system for books.
-   **🎨 Modern UI**: Responsive and aesthetically pleasing design with glassmorphism effects and smooth animations.
-   **📱 Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

-   **Frontend Framework**: [React](https://react.dev/) (v19)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Routing**: [React Router](https://reactrouter.com/) (v7)
-   **Styling**: Modern Vanilla CSS
-   **Mock Backend**: [JSON Server](https://github.com/typicode/json-server)

## 📂 Project Structure

```
ebook-emporium/
├── components/       # Reusable UI components (Header, Footer, BookCard, etc.)
├── pages/            # Application pages (Home, Browse, Login, Sell, etc.)
├── context/          # React Context for state management
├── assets/           # Static assets (images, icons)
├── db.json           # Mock database file
├── App.jsx           # Main application component
├── main.jsx          # Entry point
└── ...
```

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v16 or higher)
-   npm (v7 or higher)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ebook-emporium.git
    cd ebook-emporium
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

### Running the Application

To run the application, you need to start both the mock backend and the frontend development server.

1.  **Start the Mock Backend** (Open a new terminal)
    ```bash
    npx json-server --watch db.json --port 3001
    ```

2.  **Start the Frontend** (In a separate terminal)
    ```bash
    npm run dev
    ```

3.  **Open in Browser**
    Visit `http://localhost:3000` (or the port shown in your terminal) to view the app.

## 📝 Scripts

-   `npm run dev`: Starts the Vite development server.
-   `npm run build`: Builds the app for production.
-   `npm run preview`: Locally preview the production build.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
