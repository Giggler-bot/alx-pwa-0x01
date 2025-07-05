# alx-project-0x14
# 🎬 CineSeek - Movie Discovery App

Welcome to **CineSeek**, a modern movie browsing application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and the **MoviesDatabase API**. CineSeek allows users to explore, filter, and discover trending and upcoming movies in a sleek, responsive UI.

---

## 🔍 API Overview

This project integrates the **MoviesDatabase API** hosted on RapidAPI. It offers access to a rich dataset of movies, including:

- Movie titles and images
- Release years and genres
- Pagination support
- Filtering by year and genre

The API allows seamless integration of dynamic movie listings for both browsing and searching.

---

## 📌 API Version

**Version:** `v1.0.0`  
Base URL: `https://moviesdatabase.p.rapidapi.com`

---

## 📂 Available Endpoints

| Endpoint                | Description                                           |
|------------------------|-------------------------------------------------------|
| `/titles`              | Get a list of movie titles (supports filters)        |
| `/titles/{id}`         | Retrieve details for a single movie                  |
| `/genres`              | Get a list of movie genres                           |
| `/languages`           | Retrieve available languages used in titles          |

---

## 🔄 Request and Response Format

### ✅ **Request Example**

```http
POST /titles?year=2024&page=1&limit=12
Headers:
  x-rapidapi-key: YOUR_API_KEY
  x-rapidapi-host: moviesdatabase.p.rapidapi.com
