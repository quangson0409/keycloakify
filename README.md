# Keycloakify Starter Project - Custom Keycloak Theme with React & Tailwind

This project is a starter template for building custom Keycloak themes using [Keycloakify](https://www.keycloakify.dev/). It provides a modern development environment with React, TypeScript, Vite, and Tailwind CSS, along with PatternFly and Material-UI (MUI) for UI components.

## Technologies Used

- **Keycloakify**: Build custom Keycloak themes with React.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript.
- **Vite**: Fast build tool for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **PatternFly**: Open source design system for enterprise applications.
- **Material-UI (MUI)**: Comprehensive UI toolkit for React.
- **i18next**: Internationalization framework for React apps.
- **React Router DOM**: Routing for React applications.
- **ESLint & Prettier**: Code linting and formatting.
- **Storybook**: Develop and test UI components in isolation.

## Project Structure

The project is organized to separate the `login` and `account` Keycloak themes for independent customization.

- `src/login/`: Keycloak login theme components.
- `src/account/`: Keycloak account theme components.
- `src/shared/`: Shared components and utilities.
- `src/styles/`: Global CSS files, including Tailwind imports.
- `src/theme/`: Material-UI theme customizations.
- `src/kc.gen.tsx`: Auto-generated types and components by Keycloakify.
- `src/main.tsx`: Application entry point.

## Main Features

- **Custom Keycloak themes**: Easily customize both login and account pages.
- **React components**: Build UI with modern React hooks and patterns.
- **TypeScript support**: Improve code quality and developer experience.
- **Fast development**: Vite provides HMR and quick builds.
- **Flexible styling**: Use Tailwind CSS for rapid styling and PatternFly/MUI for enterprise-grade UI components.
- **Internationalization**: Built-in i18next for multi-language support.
- **Storybook integration**: Develop and test UI components in isolation.

## Getting Started

### Requirements

- Node.js (version 18 or 20+)
- Yarn (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/quangson0409/keycloakify.git
   cd keycloakify-starter
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
   The `postinstall` script will automatically run `keycloakify sync-extensions` to copy required files from Keycloakify packages.

### Development

- **Start development server**:

  ```bash
  yarn dev
  ```

  This will start the Vite development server. You can uncomment code blocks in `src/main.tsx` to test specific Keycloak pages locally.

- **Run Storybook**:
  ```bash
  yarn storybook
  ```
  This will launch Storybook for isolated UI component development and testing.

### Production Build

- **Build React app**:

  ```bash
  yarn build
  ```

- **Build Keycloak theme**:
  ```bash
  yarn build-keycloak-theme
  ```
  This will first build the React app, then use `keycloakify build` to package it as a Keycloak theme. The result will be in the `dist/keycloak-theme` directory.

## Main Scripts

- `yarn dev`: Start development server with Vite.
- `yarn build`: Build app for production.
- `yarn build-keycloak-theme`: Build Keycloak theme for deployment.
- `yarn storybook`: Run Storybook for component development.
- `yarn format`: Format codebase with Prettier.

## Important Notes

- **Keycloakify file ownership**: Some files (e.g., `src/account/root/Root.tsx`) are "claimed" by Keycloakify. If you modify these files, you may need to run `npx keycloakify own --path "path/to/file.tsx"` to prevent them from being overwritten during `sync-extensions`.
- **Local testing**: For local development, you can simulate Keycloak context by uncommenting relevant code blocks in `src/main.tsx` and specifying `pageId`. Remember to comment them out before production build to avoid increasing bundle size.
- **Theme customization**: The project uses `accountThemeImplementation: "Single-Page"` in `vite.config.ts`, meaning the account theme is built as a single-page application (SPA).
