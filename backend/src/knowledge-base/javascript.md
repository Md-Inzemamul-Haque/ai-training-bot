# JavaScript Basics

## What is JavaScript?

JavaScript is a high-level programming language used for building interactive web applications.

It runs in:
- browsers
- servers using Node.js

---

## Variables in JavaScript

Variables can be declared using:
- var
- let
- const

Example:

```javascript
const name = "Alice";
let age = 24;
```

---

## Functions in JavaScript

Functions are reusable blocks of logic.

Example:

```javascript
function greet(name) {
  return `Hello ${name}`;
}
```

JavaScript also supports arrow functions.

---

## Arrays in JavaScript

Arrays store multiple values in a single variable.

Example:

```javascript
const numbers = [1, 2, 3];
```

Arrays support methods like:
- map
- filter
- reduce

---

## Closures

A closure allows a function to access variables from its outer scope even after the outer function has completed execution.

Closures are commonly used in:
- callbacks
- data hiding
- functional programming

---

## Promises

Promises handle asynchronous operations.

Promise states:
- pending
- fulfilled
- rejected

Example:

```javascript
fetch("/api/data")
  .then(response => response.json())
  .catch(error => console.log(error));
```

---

## Unique Fact

JavaScript is single-threaded but can handle asynchronous operations using the event loop.