# 🍽️ TastyTrove - Recipe App

TastyTrove is a **recipe management** app where users can explore add add their favorite recipes. The application provides **secure authentication**, an intuitive UI, and **seamless recipe management**. The application uses **Cloudinary** for image upload.

## ✨ Features

- 🔐 **User Authentication**: Secure **registration** and **login** (contains google authentication as well).
- 📜 **Recipe Management**: Users can **add and view** recipes.
- 📸 **Image Upload**: Upload images for recipes to make them visually appealing.
- 🔍 **Search & Filter**: Easily find recipes based on **recipe name**.
- 🎨 **Responsive UI**: A clean and user-friendly design powered by **Bootstrap**.
- 🔔 **Notifications**: Uses **React Toastify** to show success/error messages.
- ⚡ **State Management**: Utilizes **Redux Toolkit** for efficient data handling.

---

## 🛠 Tech Stack

### **Frontend**
- **React.js**
- **Bootstrap (CDN)**
- **React Router**
- **Firebase**
- **Formik**
- **React-Icons**
- **React-Redux**
- **React-Toastify**
- **Redux-Persist**
- **Yup**
- **@reduxjs/toolkit**
- **Axios**

### **Backend**
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **bcryptjs**
- **cors**
- **dotenv**
- **nodemailer**
- **nodemon**
- **jsonwebtoken**

### **Database**
- **MongoDB**
---

## 🚀 Installation and Setup

Follow these steps to set up the project locally:

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Johnvilin-Sibina/TastyTrove.git
cd TastyTrove-Frontend
```
### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Install Required Packages
```sh
npm install formik react-redux @reduxjs/toolkit redux-persist react-router-dom axios firebase dotenv yup react-icons react-toastify
```
### 4️⃣ Build the Project
```sh
npm run build
```
### 5️⃣ Run the development server
```sh
npm run dev
```
### 6️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
VITE_FIREBASE_API_KEY = <Your_firebase_api_key>
VITE_CLOUD_NAME = <Your_cloudinary_cloud_name>
VITE_UPLOAD_PRESET = <Your_cloudinary_upload_preset>
```
## 🌍Live Site
[Visit Site](https://tasty-trove-recipes.netlify.app/)

