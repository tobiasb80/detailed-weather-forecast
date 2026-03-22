# GitHub Copilot Instructions

This file provides instructions for GitHub Copilot to help you with this project.

## Core Commands

- This project uses `npm`. Always use `npm install` to install dependencies.
- Run `npm run lint` to check for linting errors.
- Run `npm run watch` to serve the card for development.
- Run `npm run build` to build the card for production.

## Primary Files

- `src/detailed-weather-forecast.ts`: The main entrypoint for the custom card. It defines the `DetailedWeatherForecast` class, which extends `LitElement`. This is where the main logic for the card resides.
- `src/editor/detailed-weather-forecast-editor.ts`: The entrypoint for the visual editor. It defines the `DetailedWeatherForecastEditor` class.
- `src/types.ts`: Contains the TypeScript types for the card's configuration.
- `src/detailed-weather-forecast.css`: The CSS for the card.

## Architecture Patterns

- The main element is `detailed-weather-forecast`. It is a LitElement custom element.
- The editor element is `detailed-weather-forecast-editor`. It is also a LitElement custom element.
- The card configuration is stored in the `config` property of the main element.
- The `setConfig` method is called by Home Assistant when the configuration changes.
- The `render` method is called by Lit to render the card's HTML.

## TypeScript Standards

- This project uses TypeScript. All new code should be written in TypeScript.
- Use the types defined in `src/types.ts` for the card's configuration.
- Use the `HomeAssistant` type from `custom-card-helpers` for the `hass` object.

## Lit and Component Guidance

- This project uses Lit. All new components should be LitElements.
- Use the `@customElement` decorator to define custom elements.
- Use the `@property` decorator to define properties that can be set from the card's configuration.
- Use the `@state` decorator to define internal state that should trigger a re-render when it changes.

## Home Assistant Integration

- The `hass` object is passed to the card as a property. It contains the Home Assistant state.
- Use the `hass.states` object to get the state of entities.
- Use the `hass.callService` method to call services.

## Localization

- This project uses a custom localization solution.
- The localization files are in the `src/translations` directory.
- The `localize` function in `src/localize.ts` is used to translate strings.

## Styling

- The card's CSS is in `src/detailed-weather-forecast.css`.
- The styles are applied to the card's shadow DOM.
- Use CSS variables to allow users to customize the card's appearance.
- Respect Home Assistant theme variables and CSS custom properties.
- Avoid hardcoded colors when theme tokens can be used.
- Keep spacing and typography consistent with existing card styles.
- Ensure layouts work in both compact and wider dashboard widths.

## Build and Quality Expectations

- The card is built using Parcel.
- The build process is defined in `package.json`.
- All code should be formatted with Prettier.
- All code should pass the ESLint checks.

## Safe Change Workflow

- Before making any changes, run `npm install` to ensure you have the latest dependencies.
- After making changes, run `npm run lint` and `npm run build` to ensure that the changes are safe.

## Pull Request Guidance

- Before submitting a pull request, run `npm run lint` and `npm run build` to ensure that the changes are safe.
- Your PR should include a description of the changes you have made.
- If your PR fixes a bug, it should include a link to the issue.
- If your PR adds a new feature, it should include a description of the feature and how to use it.

## Common Issues to Avoid

- Do not use `yarn` to install dependencies. Use `npm install` instead.
- Do not commit the `dist` directory.
- Do not commit the `node_modules` directory.
- Do not commit the `.parcel-cache` directory.
