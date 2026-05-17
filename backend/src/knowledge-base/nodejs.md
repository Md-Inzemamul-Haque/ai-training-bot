# Node.js Introduction

## What is Node.js?

Node.js is an open-source JavaScript runtime environment built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript outside the browser.

Node.js is commonly used for building backend services, REST APIs, real-time applications, and scalable network applications.

---

## Features of Node.js

- Asynchronous and non-blocking architecture
- Event-driven programming model
- Fast execution using the V8 engine
- Large npm ecosystem
- Suitable for scalable applications

---

## Event Loop

The event loop is the core mechanism that allows Node.js to handle asynchronous operations efficiently.

Instead of creating multiple threads for every request, Node.js uses a single-threaded event loop to manage concurrent operations.

---

## npm

npm stands for Node Package Manager.

It is used to install and manage third-party libraries and dependencies in Node.js applications.

Example:

```bash
npm install express
```

---

## Express.js

Express.js is a minimal and flexible Node.js web framework used for building APIs and web applications.

It simplifies:
- routing
- middleware handling
- request/response management

---

## Middleware

Middleware functions are functions that execute during the request-response cycle.

They can:
- modify requests
- validate authentication
- log requests
- handle errors

Example middleware use cases:
- authentication
- logging
- input validation

---

## REST APIs

REST APIs allow communication between client and server using HTTP methods.

Common HTTP methods:
- GET
- POST
- PUT
- DELETE

REST APIs commonly exchange data in JSON format.

---

## Scaling in Node.js

Node.js applications can scale using:
- clustering
- load balancing
- microservices
- caching systems like Redis

Node.js is widely used for high-performance applications due to its lightweight architecture.