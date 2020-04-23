# E-commerce Backoffice Website

## Background

I found a coding challange to build e-commerce backoffice website. I was bored from COVID-19 quarantine so I accepted the challenge.

### Requirement

- Create an e-commerce backoffice website
- Authentication
- A user can view, create, update, delete a product.
- Create Rest API (or GraphQL is a plus)
- React is required.
- Styled-components is required.
- Node.js is required.
- Express or Koa is required.
- Sequelize is required.

## Project Overview

![](https://user-images.githubusercontent.com/25366268/79638882-3b766c80-81b2-11ea-8a68-f8c8771fefc3.png)

## Setup

#### Backend

```bash
# 1. Install dependecies
cd server
yarn install

# 2. Create .env file and paste the following values
POSTGRES_USERNAME=admin
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=ecommerce-admin-challenge

ACCESS_TOKEN_SECRET=<YOUR_ACCESS_TOKEN_SECRET>
REFRESH_TOKEN_SECRET=<YOUR_REFRESH_TOKEN_SECRET>

# 3. Start the service
yarn start
```

#### Frontend

```bash
# 1. Install dependecies
cd web
yarn install

# 2. Start the service
yarn start
```

#### Mocked admin user

- Email: test@test.com
- Password: test

Note: The mocked admin user has been defined in code (`server/src/mockDatabase.ts`).
