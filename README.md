<div align="center">

# MacroZone

**A clean, fast macro and nutrition tracking app**

![Expo](https://img.shields.io/badge/Expo-55.0-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.83-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

Log meals, track daily macros, and share your progress — synced in real-time via Supabase.

</div>

---

## Features

- **Macro Dashboard** — Daily totals for calories, protein, carbs, and fat at a glance
- **Meal Logging** — Add meals with a full macro breakdown
- **Meal History** — Browse and delete past meals
- **Copy & Share** — Copy your macro summary to clipboard or share it natively
- **Reminders** — Toggle daily push notification reminders
- **Cloud Sync** — All data persisted in Supabase, cross-device ready

---

## Tech Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Framework  | Expo ~55 + React Native 0.83         |
| Navigation | Expo Router (file-based, tab layout) |
| Backend    | Supabase (PostgreSQL)                |
| Language   | TypeScript                           |
| Build      | EAS Build (iOS + Android)            |

---

## Project Structure

```
src/
├── app/
│   ├── _layout.tsx           # Root layout
│   └── (tabs)/
│       ├── index.tsx         # Home / Dashboard
│       ├── meals.tsx         # Meal history
│       └── add-meal.tsx      # Add new meal
├── components/
│   ├── MacroGrid.tsx         # Daily macro summary cards
│   ├── MacroCard.tsx         # Individual macro card
│   ├── RecentMeals.tsx       # Scrollable meal list
│   ├── MealItem.tsx          # Single meal row
│   ├── HomeHeader.tsx        # Greeting + date header
│   ├── CopyButton.tsx        # Copy summary to clipboard
│   ├── ShareButton.tsx       # Native share sheet
│   └── ReminderToggle.tsx    # Push notification toggle
├── storage/
│   └── meals.ts              # Supabase CRUD (getMeals, addMeal, deleteMeal)
├── utils/
│   ├── supabase.ts           # Supabase client setup
│   └── notifications.ts      # Expo notifications helpers
└── styles/
    └── global.ts             # Shared stylesheet
```

---

## Getting Started

### Prerequisites

- Node.js 22+
- A [Supabase](https://supabase.com) project
- [Expo Go](https://expo.dev/go) on your phone for quick testing

### 1. Supabase — Create the meals table

Run this in your Supabase SQL editor:

```sql
create table meals (
  id         uuid primary key default gen_random_uuid(),
  name       text    not null,
  calories   numeric not null,
  protein    numeric not null,
  carbs      numeric not null,
  fat        numeric not null,
  created_at timestamptz default now()
);
```

### 2. Environment Variables

Create a `.env.local` file in the project root:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install & Run

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

---

## Building for Production

This project uses [EAS Build](https://docs.expo.dev/build/introduction/) for iOS and Android.

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in
eas login

# Preview build (internal testing)
eas build --platform all --profile preview

# Production build + submit to stores
eas build --platform all --profile production
eas submit --platform all
```

---

## Available Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Open on Android emulator
npm run ios        # Open on iOS simulator
npm run web        # Open in browser
npm run lint       # Run ESLint
```

---
