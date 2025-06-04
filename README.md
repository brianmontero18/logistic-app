# Nauta Frontend Challenge

A modern logistics import orders management web application built with React, TypeScript, and Apollo Client. This application allows users to view, filter, and manage import orders with real-time status updates.

## Features

- **Order Management**: View and manage import orders with detailed information
- **Advanced Filtering**: Filter orders by status, provider, and search by reference or tracking number
- **Status Updates**: Update order status with immediate visual feedback
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices
- **Real-time Data**: GraphQL-powered data fetching with Apollo Client
- **Mock API**: Integrated MSW (Mock Service Worker) for realistic API simulation
- **Modern UI**: Built with Shadcn/UI components and Tailwind CSS

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality React components
- **Lucide React** - Beautiful icon library

### Data & State Management
- **Apollo Client** - GraphQL client with caching
- **GraphQL** - Query language for APIs
- **Wouter** - Lightweight routing library

### Development & Testing
- **MSW (Mock Service Worker)** - API mocking for development
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI base components
│   ├── layout/         # Layout components (headers, navigation)
│   └── orders/         # Order-specific components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries and configurations
├── graphql/            # GraphQL queries and mutations
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── mocks/              # MSW mock data and handlers
└── styles/             # Global styles and Tailwind configuration
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd nauta-challenge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Initialize MSW:**
   ```bash
   npx msw init public/
   ```

## Development

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

The application will automatically reload when you make changes to the source code.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## API Operations

The application supports the following GraphQL operations:

### Queries
- **GetOrders** - Fetch all orders with optional filtering by status and provider
- **GetOrder** - Fetch a single order by ID

### Mutations
- **UpdateOrderStatus** - Update the status of an existing order

## Order Status Types

The application supports the following order statuses:
- **PENDING** - Order has been created and is awaiting processing
- **IN_TRANSIT** - Order is currently being shipped
- **DELIVERED** - Order has been successfully delivered
- **CANCELLED** - Order has been cancelled
- **PROBLEM** - Order has encountered an issue

## Architecture Highlights

### Component Architecture
- **Custom Hooks**: Separated business logic into reusable hooks
- **Component Composition**: Modular components with single responsibilities
- **Type Safety**: Full TypeScript coverage with strict typing

### Performance Optimizations
- **Memoization**: Strategic use of React.memo and useMemo
- **Pagination**: Client-side pagination for large datasets
- **Lazy Loading**: Efficient loading of order details

### Data Management
- **Apollo Client**: Centralized GraphQL client with caching
- **Optimistic Updates**: Immediate UI feedback for status changes
- **Error Handling**: Comprehensive error states and retry mechanisms

## Mock Data

The application uses MSW to simulate a real backend API. Mock data includes:
- 35+ sample import orders
- Various providers and shipping statuses
- Realistic order references and tracking numbers
- Randomized creation dates and ETAs

