# Lumel Assessment

This is a Node.js + Express backend project built for the Lumel assessment. It uses Sequelize ORM and MySQL for handling customer, product, and order data. The application provides APIs for fetching key metrics such as total customers, total orders, and average order values within a date range. It also includes a daily cron job for reporting.



---

##  Tech Stack

###  Backend
- Node.js
- Express.js
- MySQL
- Sequelize ORM
- node-cron
- dotenv

---

## Requirements

Pre requisites

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [MySQL](https://dev.mysql.com/downloads/installer/) 


## 🔧 Setup Instructions

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Ameendv/Lumel-assesment.git
   cd Lumel-assesment


###  Backend (Node.js + Express)
1. Navigate to the backend folder:
   ```bash
   cd backend
2. Install dependencies:
   ```bash
   npm install
   
3. Create env file:
   ```bash
         PORT=8080
         DB_HOST=localhost
         DB_PORT=3306
         DB_USER=root
         DB_PASSWORD=password
         DB_NAME=db name
         APP_SECRET=secret


4. Start backend server:
   ```bash
   npm start

###  API Endpoints

| Method | Endpoint                                         | Query Parameters                | Description                                                        |
|--------|--------------------------------------------------|----------------------------------|--------------------------------------------------------------------|
| GET    | `/api/csv-script`                                | –                                | Runs the CSV import script to populate the database.               |
| GET    | `/api/customer/count`                            | `start_date`, `end_date`         | Returns total number of customers within a date range.             |
| GET    | `/api/customer/orders-count`                     | `start_date`, `end_date`         | Returns total number of orders placed within a date range.         |
| GET    | `/api/customer/orders-average`                   | `start_date`, `end_date`         | Returns average order value within a date range.                   |



###  Database Schema


![image](https://github.com/user-attachments/assets/43c95108-6b14-4651-88d1-86e075d88b80)
