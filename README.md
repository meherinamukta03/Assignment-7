**
# 🛒 বাজার দর | BazarDor

## 📌 Project Description

**বাজার দর (BazarDor)** is a responsive web application that helps users check the prices of essential daily products in Bangladesh. Users can browse products by category, compare prices across different markets, and understand price changes easily.

The application also includes user authentication and profile management features.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Building the web application |
| React | Creating reusable UI components |
| TypeScript | Writing type-safe code |
| Tailwind CSS | Styling and responsive design |
| HeroUI | Building user interface components |
| Better Auth | User authentication and account management |
| React Hot Toast | Displaying success and error notifications |
| React Icons | Providing icons for the interface |

## ✨ Key Features

### 1. 📊 Current Market Prices
- View the prices of essential daily products.
- Display product names, units, and current prices.
- Show prices using Bengali numerals for easier understanding.

### 2. 📈 Price Increase and Decrease
- View products with increased prices.
- View products with decreased prices.
- Identify price changes using visual indicators.

### 3. 🛍️ Product Details and Market Comparison
- View detailed information about individual products.
- Compare product prices across different markets.
- Check price information for individual products.

### 4. 🗂️ Category Browsing and Price Sorting
- Browse products by category.
- Sort products using the default order.
- Sort prices from lowest to highest.
- Sort prices from highest to lowest.
- Sort Bengali numerals according to their numeric values.

### 5. 🔐 Authentication and Profile Management
- Register and sign in using email and password.
- Sign in using Google and GitHub.
- Access protected pages after signing in.
- Update profile information, including the user's name.
- Receive success and error notifications.

## 📱 Responsive Design

- Responsive layouts for mobile, tablet, and desktop devices.
- User-friendly navigation and category links.
- Clean product cards and price comparison sections.
- Loading indicators and error messages.
- Custom 404 page with navigation to the home page.

## ⚙️ Installation and Setup

### Prerequisites

- Node.js
- npm
- MongoDB database
- Better Auth configuration
- Google and GitHub OAuth credentials for social authentication

### 1. Clone the Repository

```bash
git clone https://github.com/meherinamukta03/Assignment-7.git
```

### 2. Navigate to the Project Directory

```bash
cd Assignment-7
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add the environment variables required by your project.

Example:

```env
MONGO_DB_URL=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Replace the example values with your actual credentials. Make sure the variable names match your project configuration.

**Important:** Never commit `.env.local` or expose secret keys in your GitHub repository.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

The application is deployed on Vercel.

**Live Website:**  
[https://assignment-7-git-main-mmm-6442.vercel.app/](https://assignment-7-git-main-mmm-6442.vercel.app/)

## 🌐 Project Links

- **Live Website:** [Visit BazarDor](https://assignment-7-git-main-mmm-6442.vercel.app/)
- **GitHub Repository:** [View Source Code](https://github.com/meherinamukta03/Assignment-7)

## 👩‍💻 Author

**Meherina Mukta**

Project: **বাজার দর | BazarDor**
**
