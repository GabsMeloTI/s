# 🌍 Solutech - Renewable Energy Management Platform

Welcome to **Solutech**, a sustainable energy management platform designed to optimize and monitor renewable energy distribution in remote communities. Our mission is to empower administrators and residents to achieve energy efficiency, independence, and sustainability using solar and wind energy.

## 📚 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Firebase Configuration](#firebase-configuration)
- [Docker Setup](#docker-setup)
- [Usage](#usage)

---

## 📈 Project Overview

**Solutech** addresses the critical need for renewable energy in underserved areas. This platform provides tools to monitor energy production, consumption, and distribution in real-time. It supports local administrators and residents in managing energy usage efficiently while ensuring equity and access to clean energy resources.

---

## 🚀 Features

- **User Management**:
  - Admin and resident roles with secure authentication.
  - Profile management and editing for individual households.
  
- **Energy Monitoring**:
  - Real-time energy consumption tracking.
  - Visualization of energy production (solar and wind) through charts.
  
- **Data Insights**:
  - Historical reports for analysis of consumption and production trends.
  - Alerts for excessive consumption or low production.

- **Energy Distribution Management**:
  - Administrators can allocate energy based on real-time needs.
  
- **Firebase Integration**:
  - Secure user authentication, real-time database, and data storage.

---

## 🛠️ Technologies

This project leverages the following technologies:

- **React Native**: Cross-platform mobile app development for iOS and Android.
- **Firebase**: Real-time database for user data and energy consumption/production storage.
- **Axios**: For API communication with Firebase.
- **React Native Chart Kit**: For interactive visualizations of energy data.

---

## 📋 Prerequisites

Before you start, ensure you have the following:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) or [Expo CLI](https://expo.dev/)
- [Firebase Project](https://firebase.google.com/) with Authentication and Realtime Database enabled.

---

## ⚙️ Setup & Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/solutech-energy.git
    cd solutech-energy
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure Firebase**:
    - Create a Firebase project.
    - Enable Authentication and Realtime Database.
    - Add your Firebase configuration in the `firebaseConfig.js` file (see below).

4. **Run the application**:
    ```bash
    npx react-native run-android
    ```
    or
    ```bash
    npx react-native run-ios
    ```

---

