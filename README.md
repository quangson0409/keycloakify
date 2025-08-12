# Keycloakify Starter Project

This project is a starter template for building custom Keycloak themes using Keycloakify. It provides a modern development setup with React, TypeScript, Vite, and Tailwind CSS, along with PatternFly for UI components.

## Technologies Used

*   **Keycloakify**: A tool for building custom Keycloak themes with React.
*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
*   **Vite**: A fast build tool that provides a lightning-fast development experience.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
*   **PatternFly**: An open-source design system for enterprise web applications.
*   **MUI (Material-UI)**: A comprehensive suite of UI tools for building React applications.
*   **i18next**: An internationalization framework for React applications.
*   **React Router DOM**: For declarative routing in React applications.
*   **ESLint & Prettier**: For code linting and formatting.
*   **Storybook**: For developing UI components in isolation.

## Project Structure

The project is structured to separate Keycloak login and account themes, allowing for independent customization.

*   `src/login/`: Contains files related to the Keycloak login theme.
*   `src/account/`: Contains files related to the Keycloak account theme.
*   `src/shared/`: Contains shared components and utilities used across both themes.
*   `src/styles/`: Global CSS styles, including Tailwind CSS imports.
*   `src/kc.gen.tsx`: Generated file by Keycloakify for theme-specific types and components.
*   `src/main.tsx`: Entry point of the React application.

## Key Features

*   **Custom Keycloak Themes**: Easily customize both login and account pages.
*   **React Components**: Build UI using React, leveraging modern hooks and patterns.
*   **TypeScript Support**: Enhanced code quality and developer experience with static typing.
*   **Fast Development**: Vite provides hot module replacement and quick build times.
*   **Styling**: Utilize Tailwind CSS for rapid styling and PatternFly for enterprise-grade UI components.
*   **Internationalization**: `i18next` is integrated for multi-language support.
*   **Storybook Integration**: Develop and test UI components in isolation.

## Getting Started

### Prerequisites

*   Node.js (version 18 or 20+)
*   npm or Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/quangson0409/keycloakify.git
    cd keycloakify-starter
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
    The `postinstall` script will automatically run `keycloakify sync-extensions` to copy necessary files from Keycloakify packages.

### Development

*   **Run in development mode**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will start the Vite development server. You can uncomment the block in `src/main.tsx` to test specific Keycloak pages locally.

*   **Run Storybook**:
    ```bash
    npm run storybook
    # or
    yarn storybook
    ```
    This will launch Storybook, allowing you to develop and test UI components in isolation.

### Building for Production

*   **Build the React application**:
    ```bash
    npm run build
    # or
    yarn build
    ```

*   **Build the Keycloak theme**:
    ```bash
    npm run build-keycloak-theme
    # or
    yarn build-keycloak-theme
    ```
    This command first builds the React application and then uses `keycloakify build` to package it into a Keycloak theme. The output will be in the `dist/keycloak-theme` directory.

## Important Notes

*   **Keycloakify Ownership**: Some files (e.g., `src/account/root/Root.tsx`, `src/account/routes.tsx`) are "claimed" by Keycloakify. If you modify these files, you might need to run `npx keycloakify own --path "path/to/file.tsx"` to prevent them from being overwritten during `sync-extensions`. To revert changes and restore the original content, use `npx keycloakify own --path "path/to/file.tsx" --revert`.
*   **Local Testing**: For local development, you can mock the Keycloak context by uncommenting the relevant block in `src/main.tsx` and specifying the `pageId`. Remember to comment it back before building for production to avoid increasing bundle size.
*   **Theme Customization**: The project uses `accountThemeImplementation: "Single-Page"` in `vite.config.ts`, indicating that the account theme is built as a single-page application.
*   **PatternFly and Tailwind CSS**: The project integrates both PatternFly and Tailwind CSS. Ensure proper usage to avoid conflicts and maintain a consistent UI.
*   **Internationalization**: Translations are handled via `i18next`. Ensure all user-facing strings are properly internationalized.
