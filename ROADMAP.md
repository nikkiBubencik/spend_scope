# Project Roadmap – SpendScope

This file outlines the planned development phases and features for SpendScope. The project is organized into multiple versions, each adding new capabilities to enhance functionality, performance, and user experience.

---

## Version 1.0 – MVP

**Goal:** Build a fully functional local finance tracker with budgets, transactions, and calculators. All data stored locally (e.g., `localStorage`).

### Transactions
- [x] Display transaction list
- [X] Edit transactions
- [ ] Search transaction list
- [ ] Sort transactions by date
- [ ] Accumulate total from transactions
- [ ] Transaction charts

### Budgets
- [ ] Display budget information
- [ ] Add/edit budgets
- [ ] Set budget frequency
- [ ] Add expenses to localStorage
- [ ] Allow addition of new expenses
- [ ] Budget progress bar


### Calculators
- [ ] High-Yield Savings Account (HYSA) calculator
- [ ] Loan calculator
- [ ] General savings calculator

### UI Enhancements
- [ ] Sidebar navigation
- [ ] Routing
- [ ] Light/dark theme toggle

### Deployment
- [ ] Make app live
- [ ] Collect feedback from users
- [ ] Make necessary updates based on feedback

---

## Version 2.0 – Backend & Auth

**Goal:** Transition from local data storage to a secure, full-stack web application with a database and user authentication.

### Backend Setup
- [ ] Set up Node.js + Express server
- [ ] Design PostgreSQL schema (`users`, `transactions`, `budgets`, `goals`)
- [ ] Use Sequelize, Knex.js, or raw SQL for DB interaction

### Authentication
- [ ] Add login/signup forms on frontend
- [ ] Implement JWT or session-based authentication
- [ ] Hash passwords
- [ ] Restrict backend endpoints to authenticated users only

### Data Handling & State
- [ ] Replace `localStorage` with live API calls
- [ ] Refactor frontend state to store and fetch data from backend
- [ ] Implement loading states and error handling
- [ ] Update context/state management logic to use API

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
