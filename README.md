# 💰 Syfe Goal-Based Savings Planner

This project is a take-home assignment for a Frontend Intern position. It's a lightweight, client-side only Savings Planner that allows users to create and track multiple financial goals in different currencies (INR and USD).

The application fetches live exchange rates to provide an aggregated overview of progress across all goals.

## 🚀 Live Demo

Check out the live application deployed on Vercel:

**[syfe-hiring.vercel.app](https://syfe-hiring.vercel.app/)**

## 📸 Screenshots

| Light Mode | Dark Mode |
| :---: | :---: |
| ![image](https://github.com/user-attachments/assets/bdfa3aea-1f15-4109-a87b-709a704bd71d) | ![image](https://github.com/user-attachments/assets/62bd5126-b8c4-4343-87f1-3669f6b789e3) |

## ✨ Features

- **Goal Creation**: Add new savings goals with a name, target amount, and currency (INR or USD).
- **Contribution Tracking**: Add contributions to specific goals via a modal, updating progress dynamically.
- **Live Exchange Rates**: Fetches real-time USD ↔ INR rates using [exchangerate-api.com](https://app.exchangerate-api.com).
- **Dashboard Overview**: A comprehensive summary showing Total Target, Total Saved, and Overall Progress.
- **Manual Refresh**: A "Refresh Rate" button to re-fetch the latest currency exchange rates.
- **Client-Side Persistence**: All goals and contributions are stored in `localStorage`, ensuring data persists across browser sessions.
- **Responsive Design**: The layout adapts seamlessly from mobile to desktop screens.
- **(Bonus) Theme Toggle**: Seamlessly switch between a beautiful Dark and Light mode.

---

## 🏗️ Tech Stack & Design Choices

### Framework: Next.js (with TypeScript)
### Styling: Tailwind CSS

### Data Handling
- **Persistence**: `localStorage` was used for client-side persistence as per the assignment's client-only constraint. It's a simple and effective way to save user data between sessions without a backend.
- **API Communication**: The native `fetch` API is used for making requests to the exchange rate API, with proper handling for loading and error states to enhance user experience.

---

## 🛠️ Local Development Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js (version 18.x or later) and npm/yarn/pnpm installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ronakbothraa/syfe-hiring.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd syfe-hiring
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up Environment Variables:**

    The project requires an API key from [exchangerate-api.com](https://app.exchangerate-api.com) to fetch currency rates.

    Create a file named `.env.local` in the root of the project and add your API key to it:

    ```
    NEXT_PUBLIC_EXCHANGE_RATE_API_KEY=YOUR_API_KEY_HERE
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
