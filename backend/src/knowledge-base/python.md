# Python Basics

## What is Python?

Python is a high-level, interpreted programming language known for its simplicity and readability.

Python is widely used in:
- web development
- automation
- data science
- machine learning
- scripting

---

## Variables in Python

Variables are used to store data values.

Example:

```python
name = "John"
age = 25
```

Python does not require explicit type declarations.

---

## Lists in Python

Lists are ordered and mutable collections.

Example:

```python
numbers = [1, 2, 3, 4]
```

Lists support indexing, slicing, and iteration.

---

## List Comprehension

A list comprehension is a concise way to create lists.

Example:

```python
squares = [x * x for x in range(5)]
```

It improves readability and reduces boilerplate code.

---

## Functions in Python

Functions are reusable blocks of code.

Example:

```python
def greet(name):
    return f"Hello {name}"
```

Functions help improve modularity and code reuse.

---

## Exception Handling

Python uses try-except blocks for error handling.

Example:

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
```

Exception handling prevents application crashes.

---

## Unique Fact

Python uses indentation to define code blocks instead of curly braces.