<!-- @format -->

# Mainstack Frontend Developer Assessment

This is a frontend assessment project built with React, TypeScript, Chakra-UI and Vite. The application demonstrates skills in modern frontend development, including state management, component architecture, and testing.

## 🚀 Features

- Modern React with TypeScript
- State management with Zustand
- Responsive UI with Chakra-UI
- Unit testing with Vitest and React Testing Library
- Type-safe API integration
- Filtering and data visualization

## 🛠️ Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Git

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/chionye/mainstack-frontend-assessment.git
   cd mainstack-frontend-assessment
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   The application will be available at [http://localhost:5173](http://localhost:5173)

## 🧪 Running Tests

Run the test suite with the following command:

```bash
npm test
# or
yarn test
```

For test coverage:

```bash
npm run test:coverage
# or
yarn test:coverage
```

For test ui:

```bash
npm run test:ui
# or
yarn test:ui
```

For E2E test:
```bash
npm run test:e2e
```

For E2E test in UI mode (interactive):
```bash
npm run test:e2e:ui
```

For E2E test in headed mode (see browser):
```bash
npm run test:e2e:headed
```

For E2E test for specific browser:
```bash
npm run test:e2e:chromium
```

For E2E test report:
```bash
npm run test:e2e:report
```

## 🏗️ Project Structure

```
src/
├── api/                # API client and hooks
│   ├── hooks/         # Custom API hooks
│   └── types/         # API type definitions
├── assets/            # Static assets (images, icons)
├── components/        # React components
│   ├── layout/       # Layout components (header, revenue sections)
│   ├── shared/       # Shared/reusable components
│   └── ui/           # UI components
├── constants/         # Application constants
├── hooks/             # Custom React hooks
├── lib/               # Third-party library configurations
├── pages/             # Page components
│   └── Revenue/      # Revenue page
├── routes/            # Application routing
├── services/          # Business logic and services
├── store/             # State management with Zustand
├── test/              # Test files
│   ├── api/          # API tests
│   ├── components/   # Component tests
│   ├── services/     # Service tests
│   └── store/        # Store tests
└── utils/             # Utility functions
```

## 📦 Dependencies

- React 19
- TypeScript
- Vite
- Chakra-UI
- Zustand
- React Icons
- date-fns
- Vitest
- React Testing Library

## 📝 Notes

- This is an assessment project for the Mainstack Frontend Developer position.
- The application demonstrates modern React patterns and best practices.
- All components are fully typed with TypeScript.
- The codebase includes comprehensive test coverage.

## 📄 License

This project is proprietary and confidential. All rights reserved.
