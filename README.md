<<<<<<< HEAD
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/94b0a269-9072-4b81-a68e-6d662ba074fa

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
=======
# ☕ Code & Coffee Digital Menu System

A modern Digital Menu System for coffee shops built using **Python**, **Tkinter**, and **Pillow**. The application provides an attractive graphical interface for browsing menu items, managing customer orders, generating receipts, and maintaining order records.

---

## 🚀 Features

### Menu Management

* Coffee Category
* Tea Category
* Cold Beverages Category
* Snacks Category
* Desserts Category

### User Interface

* Modern Tkinter GUI
* Attractive Coffee-Themed Design
* Search Bar for Menu Items
* Placeholder Images for Products
* Category-Based Navigation

### Cart System

* Add Items to Cart
* Increase Quantity
* Decrease Quantity
* Remove Items
* Clear Cart

### Order Summary

* Live Subtotal Calculation
* Automatic Tax Calculation (5%)
* Grand Total Calculation
* Real-Time Updates

### Order Processing

* Generate Receipt (.txt)
* Save Order History to CSV
* Order Confirmation Dialog
* Unique Order ID Generation

### Programming Features

* Object-Oriented Programming (OOP)
* Beginner-Friendly Code Structure
* Error Handling
* Well-Documented Source Code

---

## 🛠 Technologies Used

* Python 3
* Tkinter
* ttk Widgets
* Pillow (PIL)
* CSV File Handling
* Object-Oriented Programming

---

## 📂 Project Structure

```text
coffee_menu_project/
│
├── coffee_menu.py
├── README.md
├── requirements.txt
├── .gitignore
│
├── receipts/
│   ├── CC20260121093045123.txt
│   ├── CC20260121094512456.txt
│   └── ...
│
├── screenshots/
│   ├── home.png
│   ├── cart.png
│   └── receipt.png
│
└── orders.csv
```

---

## 📦 Installation

### Clone Repository

```bash
git clone https://github.com/vishalvivek14332-source/code-coffee-digital-menu-system.git
cd code-coffee-digital-menu-system
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Application

```bash
python coffee_menu.py
```

---

## 📋 Requirements

```txt
Pillow
```

---

## 🧾 Sample Receipt

```text
------------------------------------------------
           CODE & COFFEE
       The Developer's Cafe
------------------------------------------------
Order ID : CC20260121093045123
Date     : 2026-01-21 09:30:45
Customer : Guest
------------------------------------------------
Item                   Qty     Price     Total
------------------------------------------------
Espresso                 2   ₹120.00   ₹240.00
Masala Chai              1    ₹90.00    ₹90.00
------------------------------------------------
Subtotal                            ₹330.00
Tax (5%)                            ₹16.50
GRAND TOTAL                         ₹346.50
------------------------------------------------
```

---

## 🔮 Future Improvements

* SQLite Database Integration
* Admin Dashboard
* Sales Analytics
* Inventory Management
* Customer Login System
* PDF Receipt Generation
* Payment Gateway Integration
* Multi-Language Support


---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
>>>>>>> b023f1b68475cc8b0744d52d49e6dac71bca4286
