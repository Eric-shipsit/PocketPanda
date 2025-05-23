# Pocket Panda

Pocket Panda is a personal expense tracking web application that helps you monitor and manage your finances with ease. Categorize expenses, view detailed reports, and generate downloadable summaries—all in one place.

## Features

- **Add**, **edit**, and **delete** expenses  
- **Categorize** expenses for better organization  
- **Monthly/Annual** financial reports and summaries  
- **Downloadable** expense summaries (PDF/CSV)  
- **User authentication** with secure sessions  

## Tech Stack

- **Next.js** – React framework for server-side rendering and static site generation  
- **TypeScript** – Strongly typed JavaScript  
- **Tailwind CSS** – Utility-first CSS framework  
- **MongoDB** – NoSQL database for storing expense data  
- **Prisma** – ORM for type-safe database access  
- **NextAuth.js** – Authentication for Next.js applications  
- **Vercel** – Deployment and hosting platform  

## Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher  
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)  
- MongoDB database (local or hosted)  

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/<your-username>/pocket-panda.git
   cd pocket-panda
2. **Environment Variables** 
   Create a .env.local file in the project root and add the following variables:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   cd pocket-panda
3. **Install dependencies and setup Prisma**  
   ```bash
   npm install
   npx prisma db push
   npx prisma generate
4. **Running Locally**  
   ```bash
   npm run dev