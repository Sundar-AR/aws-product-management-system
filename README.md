# AWS Product Management System

A full-stack Product Management System built using React.js, Django REST Framework, and AWS services.

## 🚀 Project Overview

This application allows users to manage products through a REST API and a React-based dashboard.

### Features

- Create products
- View products
- Update products
- Delete products
- Product search
- Product inventory management
- Product image upload
- REST API using Django REST Framework
- React.js frontend
- AWS deployment

## 🛠️ Technologies

### Backend

- Python
- Django
- Django REST Framework
- PostgreSQL
- REST API

### Frontend

- React.js
- Vite
- Axios
- JavaScript
- HTML
- CSS

### AWS Services

- EC2 - Application deployment
- RDS - PostgreSQL database
- S3 - Product image/file storage
- IAM - Access management
- SNS - Notifications

## 📁 Project Structure

```text
aws-product-management-system/
│
├── my_project/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── my_app/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── migrations/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
├── manage.py
├── requirements.txt
└── .gitignore
