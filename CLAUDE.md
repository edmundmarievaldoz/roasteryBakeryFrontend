# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint over the whole repo (`npx eslint src/path/File.jsx` for one file)
- `npm run preview` — serve the production build

No test runner is configured, and the project is plain JavaScript (no TypeScript), so `lint` and `build` are the only automated checks.

## Backend dependency

This is the frontend only. Every view fetches from a separate REST API hardcoded in [src/components/api/apiURL.js](src/components/api/apiURL.js) as `http://localhost:5000/api`; without it running, pages hang on "Loading records..." because `useLoad` doesn't handle the rejected fetch. Endpoints in use: `/recipes`, `/ingredients`, `/recipeingredients/recipe/:recipeID`.

## Architecture

React 19 + React Router 7 SPA. Routes are declared in [src/App.jsx](src/App.jsx), all wrapped in a single `Layout` (header, footer, background icon).

`src/components/` is organised by role:

- `views/` — route-level pages; own the endpoint and top-level state
- `entity/<name>/` — domain components for one entity (currently `recipe`); new entities get a sibling folder
- `UI/` — generic reusable pieces (`Card`, `Action`, `Icon`, `Spacer`). Compound components hang variants off the default export, e.g. `Action.Add`, `Action.Tray`, `Icon.Plus`
- `layout/` — app chrome
- `api/` — data access

### Data access

All HTTP goes through two layers in `src/components/api/`:

- `API.get/post/put/delete(endpoint, record)` take a **full URL** (build it with `` `${apiURL}/...` ``) and resolve to `{ isSuccess: true, result }` or `{ isSuccess: false, message }`. Check `isSuccess` rather than catching HTTP errors; only network failures reject.
- `useLoad(endpoint)` returns `[records, loadingMessage, loadRecords]`. `records` is `null` until loaded, and on failure it stays `null` while `loadingMessage` becomes the error, so the render pattern is `if (!records) return <p>{loadingMessage}</p>`. Call `loadRecords(endpoint)` to force a reload.

Saving is not wired up yet: `API.post/put/delete` have no callers, and `handleSubmit` in [src/components/views/NewRecipe.jsx](src/components/views/NewRecipe.jsx) only logs the recipe.

### Forms

[RecipeForm.jsx](src/components/entity/recipe/RecipeForm.jsx) sets the pattern. State holds real JS values with `null` for empty, and a `conformance` object with `js2html` / `html2js` converters per field translates at the input boundary (`null` ↔ `""`, ids ↔ strings, with `"0"` as the unselected `<select>` value). The form validates itself into an `errors` array and hands a clean object to an `onSubmit` prop; the parent view decides what to do with it and owns navigation via `onCancel`.

## Conventions

- Component bodies are sectioned with comments in the order Initialisation / State / Handlers / View; [src/template.jsx](src/template.jsx) is the starter skeleton.
- Each component imports its own co-located `.scss`. Class names are BEM-style (`recipeForm__row`, `recipeCard--open`).
- Design tokens (colours, card radius) live in [src/styles/variables.scss](src/styles/variables.scss) and are pulled in with `@use "<relative path>/styles/variables" as *;`.
- API field names are camelCase with an uppercase `ID` suffix (`recipeID`, `ingredientID`, `ingredientQuantity`).

## Version Control

All Git operations are managed by the developer using GitHub Desktop.

- Do not create, switch or delete branches.
- Do not stage, commit, push, pull, merge or discard changes.
- Do not offer to perform Git operations at the end of a task.
- You may inspect Git status and diffs when necessary.
- After implementation and review, inform the developer that the changes
  are ready for review and committing in GitHub Desktop.
- The developer is responsible for all Git operations.

## Clarification Questions

When exploring or planning a proposed change:

- Identify ambiguities, design decisions and unresolved requirements.
- Before finalising a plan, ask the developer to resolve important questions.
- Present questions interactively, one at a time, using selectable options
  when available.
- Briefly explain why each decision matters and the implications of options.
- Recommend a preferred option where appropriate and explain why.
- Allow an alternative response using "Other".
- Wait for each answer before proceeding to the next question.
- After all questions are answered, resume planning without requiring
  another prompt where possible.
- Incorporate the answers and present the revised implementation plan
  for the developer to review.
- Do not implement changes before the plan is approved.
- Do not invent questions when no clarification is needed.

## Validation for Small Changes

- Do not run automated diagnostics, tests, exports or build commands by
  default for small changes.
- After completing approved edits, summarise the modifications and provide
  clear manual testing instructions.
- The developer will run the application and report the results.
- Do not claim that the feature works until the developer has verified it.
- Ask before running any additional validation or inspection command.