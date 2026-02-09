# Slooze Commodities Management System Frontend

## Overview

This project implements the frontend solution for the Slooze Commodities Management System take-home challenge. It's built with Next.js (App Router), TypeScript, and Tailwind CSS, featuring user authentication with role-based access control (RBAC) and basic CRUD operations for product management.

## Features

- **Authentication**: Email and password login with client-side validation, mock API integration, session persistence using `localStorage`, and a global `AuthContext`.
- **Role-Based Access Control (RBAC)**: 
  - Two roles: `Manager` and `Store Keeper`.
  - Protected routes and dynamic UI elements based on user role.
  - Route guards prevent direct URL access to restricted areas.
- **Dashboard (Manager Only)**: Displays mock statistics (product count, categories, inventory).
- **View Products**: Accessible to both roles, displaying product data in a responsive table layout.
- **Add / Edit Products**: 
  - Reusable `ProductForm` component with client-side validation.
  - Functionality to add new products and edit existing ones.
  - Accessible only to `Manager` roles.
- **UI/UX**: 
  - Light/Dark mode toggle with persistence using `localStorage` and Tailwind CSS `dark` class strategy.
  - Responsive admin-style interface.

## Role Permissions

| Feature            | Manager | Store Keeper |
|--------------------|---------|--------------|
| Login              | ✅      | ✅           |
| Dashboard          | ✅      | ❌           |
| View Products      | ✅      | ✅           |
| Add/Edit Products  | ✅      | ❌           |

## Assumptions

- Backend APIs are entirely mocked using Next.js API routes (`/api`) or client-side services for data storage (e.g., `localStorage` or in-memory arrays).
- JWTs are fake and for demonstration purposes only.
- Data is stored in memory (`productService.ts`) or `localStorage` for persistence across browser sessions for authentication.
- Tailwind CSS dark mode is configured to respond to the `dark` class on the `<html>` element.

## Setup Instructions

To run the project locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd front-end-challenge
    ```

2.  **Install dependencies** (using `npm`):
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in browser**:
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Credentials for Testing:

**Manager Account:**
-   Email: `manager@slooze.com`
-   Password: `password`

**Store Keeper Account:**
-   Email: `storekeeper@slooze.com`
-   Password: `password`