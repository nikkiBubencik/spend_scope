# Project Roadmap – SpendScope

This file outlines the planned development phases and features for SpendScope. The project is organized into multiple versions, each adding new capabilities to enhance functionality, performance, and user experience.

---

## Version 1.0 – MVP

**Goal:** Build a fully functional local finance tracker with budgets, transactions, and calculators. All data stored locally (e.g., `localStorage`).

### Transactions
- [x] Display transaction list
- [X] Edit transactions
- [X] Search transaction list
- [X] Sort transactions by date
- [X] Accumulate total from transactions
- [ ] Transaction charts

### Budgets
- [X] Display budget information
- [X] Add/edit budgets
- [X] Set budget frequency
- [ ] Budget progress bar

## Expense Cateogries
- [X] Add expenses to localStorage
- [X] Allow addition of new expenses

### Calculators
- [ ] High-Yield Savings Account (HYSA) calculator
- [ ] Loan calculator
- [ ] General savings calculator

### UI Enhancements
- [X] Sidebar navigation
- [ ] Light/dark theme toggle

### Deployment
- [X] Make app live
- [ ] Collect feedback from users
- [ ] Make necessary updates based on feedback

---

## Version 2.0 – Backend & Auth

**Goal:** Transition from local data storage to a secure, full-stack web application with a database and user authentication.

### Backend Setup
- [ ] Use Next.js API Routes
- [ ] Design PostgreSQL schema (`users`, `transactions`, `budgets`, `goals`)
- [ ] Create reusable API endpoints
- [ ] Implement server-side validation and error handling

### Authentication
- [ ] Integrate NextAuth.js for secure, production-ready authentication
- [ ] Add login/signup forms on frontend
- [ ] Hash passwords
- [ ] Restrict backend endpoints to authenticated users only
- [ ] Handle session persistence and auto-logout

### Data Handling & State
- [ ] Replace localStorage with API calls to Next.js backend
- [ ] Refactor frontend state to store and fetch data from backend
- [ ] Implement loading states and error handling
- [ ] Store auth/session state globally

### Improved Charts & Filters
- [ ] Improve data visualizations using backend-fetched data
- [ ] Optimize performance with pagination or lazy loading

### Testing & QA
- [ ] Add unit tests 
- [ ] Add API tests for critical routes

---

## Version 3.0 – Mock Stock Market Simulator

**Goal:** Add a gamified "mock investing" feature where users can simulate buying, selling, and tracking fictional stocks.

### Stock Market Features
- [ ] Set up stock watch page and UI
- [ ] Table to display mock stock market data
- [ ] Integrate stock API
- [ ] Endpoints for buying/selling stocks
- [ ] Add stocks to watchlist
- [ ] View purchased ("mock") stock positions
- [ ] Reset portfolio button
- [ ] Simulate earnings reports or market events

---

## Future Features (TBD)

These are possible enhancements and features planned after V3.

- [ ] Print/export transaction records
- [ ] Print/export budget summaries
- [ ] Add recurring transaction support
- [ ] Calendar view of transactions
- [ ] AI features

---
