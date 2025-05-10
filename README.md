Set up 
1. Pull project
2. make .env file
(Message Eric for the contents)
3. npm install
4. npx prisma db push
5. npx prisma generate
6. npm run dev

TO-DO

PP-001
1. Front end improvements on landing page 
2. Potentially Pocket Panda Mascot

PP-002
1. "You should only use "next/router" on the client side of your app." error in AuthForm. Could use 'use client' or do the routing in page.tsx

PP-003
1. Profile Section Creation

PP-004
1. Way to direct to /the-month
2. Potentially rename to /this-month or something similar/better

PP-005 - Front-end for the-month page
1. PP-005A - Add Expense UI improvement
2. PP-005B - Expense Item UI improvment
3. PP-005C - Add/Update Expense UI improvement
4. PP-006C - Graph Section UI Improvement

PP-006
1. Empty view. When the user has nothing on their account.

## Next.js

**What it is:**  
A framework built on React that adds routing, server-side rendering, and lots of developer conveniences out of the box.

**Why you used it:**
- **Automatic file-based routing**  
  Just drop a `page.tsx` in a folder and you get a URL.
- **Server-side data fetching**  
  Pages can load data before they render.
- **Built-in API routes**  
  Write back-end endpoints under `app/api` or `pages/api` alongside your UI code.

**How it feels:**  
A single project where your pages, API, and layouts all live together—no extra backend server needed.

---

## TypeScript

**What it is:**  
A “superset” of JavaScript that adds **types**—labels you give to variables, function inputs/outputs, etc.

**Why you used it:**
- **Catch errors early**  
  Your editor warns you if you try to add a number to a string or call a function with the wrong data.
- **Self-documenting code**  
  Reading `user: User` tells you exactly what shape `user` should have.
- **Better autocomplete**  
  Your IDE can suggest methods and properties because it knows your data’s structure.

**How it feels:**  
Like having little road signs on all your variables and functions—your editor guides you and prevents many common mistakes.

---

## Tailwind CSS

**What it is:**  
A “utility-first” CSS framework—compose tiny, single-purpose classes (e.g. `px-4`, `text-center`, `bg-blue-500`) instead of writing custom styles.

**Why you used it:**
- **Rapid styling**  
  Build layouts by mixing and matching pre-defined utilities.
- **Consistent design**  
  Stick to a shared set of spacing, colors, and font sizes.
- **No context switching**  
  Stay in your JSX/TSX markup instead of flipping to separate CSS files.

**How it feels:**  
Like snapping Lego blocks together—each block is a style, and you combine them to build your UI.

---

## Prisma

**What it is:**  
A type-safe ORM (Object-Relational Mapper) that sits between your code and your database (e.g. PostgreSQL).

**Why you used it:**
- **Auto-generated types**  
  Your database tables become TypeScript types you can import and use.
- **Simple queries**  
  Write  
  ```ts
  prisma.expense.findMany({ where: { /* … */ } })