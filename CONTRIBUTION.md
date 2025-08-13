# Contribution Guide

Thank you for your interest in contributing to this Keycloakify custom theme project! To ensure a smooth and productive collaboration, please follow these principles and guidelines:

## Principles

- **Code Quality**: Write clean, readable, and maintainable code. Use TypeScript for type safety and follow established patterns in the codebase.
- **Consistency**: Follow the existing project structure and naming conventions. Use Tailwind CSS and PatternFly/MUI for UI components.
- **Accessibility**: Ensure UI components are accessible and responsive.
- **Internationalization**: Use i18next for all user-facing text to support multiple languages.
- **Testing**: Test your changes locally. Use Storybook for UI components and check integration with Keycloak context.
- **Documentation**: Update documentation and comments as needed. If you add new features, document their usage.

## How to Contribute

1. **Fork the repository** and create your feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
2. **Make your changes** in the appropriate directory (`src/login`, `src/account`, `src/shared`, etc.).
3. **Lint and format your code** before committing:
   ```bash
   yarn format
   yarn lint
   ```
4. **Test your changes**:
   - Run the development server: `yarn dev`
   - Run Storybook: `yarn storybook`
   - Build the theme: `yarn build-keycloak-theme`
5. **Commit your changes** with a clear message:
   ```bash
   git commit -m "Add feature: description"
   ```
6. **Push to your branch** and open a Pull Request (PR) with a detailed description of your changes.

## Pull Request Guidelines

- Describe the purpose and scope of your PR.
- Reference related issues if applicable.
- Ensure your PR passes all checks (build, lint, etc.).
- Respond to review feedback promptly.

## Special Notes

- If you modify files claimed by Keycloakify (see README), run:
  ```bash
  npx keycloakify own --path "path/to/file.tsx"
  ```
- For major changes, discuss with maintainers before starting work.

## Code of Conduct

Be respectful, collaborative, and constructive in all interactions.
