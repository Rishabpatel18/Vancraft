# VanCraft — Premium Indian Handmade Crafts Storefront

Welcome to **VanCraft**, a premium, highly interactive, and responsive static e-commerce storefront dedicated to showcasing and selling traditional Indian handmade crafts. Built with a warm, cultural aesthetic, the application leverages modern web features using pure, vanilla HTML, CSS, and JavaScript.

---

## 🌟 Key Features

*   **Warm Traditional Indian Aesthetic**: Features a hand-curated HSL color palette reflecting terracotta rust, linen sand, deep forest leaf, and warm gold accents, supporting both smooth light and dark mode profiles.
*   **Dynamic Grouped Catalog & Search**: 
    *   By default, showcases 12 products across 4 main traditional craft categories (**Pottery**, **Handmade Toys**, **Home Decor**, and **Paintings & Art**).
    *   Includes a live instant filter sidebar (by max price, best sellers, trending, and discounts) and an instant text search bar.
*   **Fully Functional Cart Drawer**: LocalStorage-backed slide-in cart with quantity increments/decrements (+/-), item removal, and subtotal/discount calculations in Indian Rupees (₹).
*   **Interactive Wishlist Toggle**: Instantly add items to your favorites with persistent heart badge updates.
*   **Simulated Auth Modals**: Elegant popup dialogs for User Login & Registration with validations and visual session updates.
*   **Customer Reviews & FAQ**: Custom-built testimonials slider carousel and smooth accordion FAQs.
*   **Form Validations**: Advanced client-side inputs validator on the Contact Us form and Newsletter subscriptions.
*   **Sandbox / Incognito Safe**: Uses a custom memory fallback wrapper (`safeStorage`) to prevent crashes in private windows where `localStorage` is blocked.

---

## 📂 Project Structure

```text
collegeprojects/
├── assets/
│   └── images/               # 25 Generated premium craft & slider visual assets
├── index.html                # Main structure, navbar, drawers, and modal containers
├── style.css                 # Color palettes, custom typography, and micro-animations
├── script.js                 # State, search filters, cart math, and global handlers
└── README.md                 # Project guide (This file)
```

---

## 🚀 How to Run Locally

Since this is a static client-side web application, running it is simple:

### Option 1: Direct File Launch
Simply double-click the [index.html](file:///c:/Users/risha/collegeprojects/index.html) file or drag it directly into any modern web browser (Chrome, Safari, Edge, Firefox).

### Option 2: Local HTTP Server (Recommended)
To run in a true web context, start a local server using Node.js:
1. Open a terminal in the project directory.
2. Run:
   ```bash
   npx http-server -p 8080
   ```
3. Open your browser and navigate to `http://localhost:8080`.

---

## 🎨 Theme Colors References

*   **Ivory Background**: `#FAF5EC`
*   **Sand Linen Accent**: `#F0E5D1`
*   **Terracotta rust (Primary Accent)**: `#C85C32`
*   **Warm Gold (Secondary Accent)**: `#D49B2A`
*   **Deep Earth Brown (Text)**: `#3E2723`
*   **Leaf Sage Green (Success)**: `#4A7A60`
