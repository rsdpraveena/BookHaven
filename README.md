# BookHaven 📚

A responsive and interactive front-end prototype for an online bookstore, built with vanilla JavaScript, HTML, and Bootstrap 5.

---
## ✨ Core Features

*   **Dynamic Product Grid**: Books are rendered dynamically from a local data source in `script.js`.
*   **Advanced Filtering**: Filter products by category, price range, and customer rating.
*   **Live Search**: Instantly search for books by title, author, or description.
*   **Complete Shopping Cart**:
    *   Add, remove, and update item quantities.
    *   Cart state persists between sessions using `localStorage`.
    *   An off-canvas sidebar provides a seamless view of the cart.
*   **User Authentication UI**: Clean, modern modals for Login and Registration.
*   **Responsive Design**: A mobile-first layout that looks great on any device, powered by Bootstrap 5.
*   **Toast Notifications**: Get instant feedback when adding an item to the cart.

---

## 🛠️ Tech Stack

*   **Front-End**: HTML5, CSS3, Vanilla JavaScript (ES6)
*   **Framework**: Bootstrap 5
*   **Icons**: Font Awesome
*   **Images**: Unsplash & Open Library Covers API

---

## 🚀 Getting Started

This is a static front-end project. No build tools or dependencies are required.

### Prerequisites

You only need a modern web browser (e.g., Google Chrome, Firefox, Safari).

### Installation

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/YOUR_USERNAME/BookHaven.git
    ```
2.  Navigate into the project directory:
    ```sh
    cd BookHaven
    ```
3.  Open the `index.html` file in your browser.

---

## 📂 Project Structure

The project consists of three core files:

```
BookHaven/
├── 📄 index.html       # HTML structure and content
├── 🎨 styles.css       # Custom styling and Bootstrap overrides
└── 📜 script.js        # All application logic and interactivity
```

---

## 💡 How It Works

1.  **Browse & Filter**: On page load, all books from the `script.js` data array are displayed. Use the sidebar filters and click **Apply Filters** to narrow the results.
2.  **Search**: Use the search bar in the navigation to filter books in real-time based on your query.
3.  **Add to Cart**: Click the **Add to Cart** button on a product card. A notification will appear, and the cart icon in the header will update.
4.  **Manage Cart**: Click the cart icon to open the off-canvas sidebar. Here you can change item quantities or remove items completely.
5.  **Login/Register**: The login and register buttons open modals with forms. Currently, submitting them triggers a simple browser alert.

---

## 🙏 Credits

*   **Framework**: Bootstrap
*   **Icons**: Font Awesome
*   **Logo Icon**: Created by Freepik - Flaticon
*   **Images**: Sourced from Unsplash and Open Library.
*   **Icons**: Font Awesome
*   **Logo Icon**: Created by Freepik - Flaticon
*   **Images**: Sourced from Unsplash and Open Library.
