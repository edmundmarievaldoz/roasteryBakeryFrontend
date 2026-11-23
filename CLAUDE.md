# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint over the whole repo (`npx eslint src/path/File.jsx` for one file)
- `npm run preview` — serve the production build

No test runner is configured, and the project is plain JavaScript (no TypeScript), so `lint` and `build` are the only automated checks.

## Backend dependency

This is the frontend only. Every view fetches from a separate REST API hardcoded in [src/components/api/apiURL.js](src/components/api/apiURL.js) as `http://localhost:5000/api`; without it running, pages show "Could not reach the server. Please try again later."

Endpoints in use: `GET /recipes`, `GET /recipes?status=Pending`, `GET /recipes/:id`, `GET /recipes/:id/allergens`, `GET /ingredients`, `GET /recipeingredients/recipe/:recipeID`, `GET /recipereviews/recipe/:recipeID`, `POST /recipereviews`.

Backend behaviour the frontend relies on: empty lists return `200 []`; a missing single record (`GET /<resource>/:id`) returns `404 { message }`; bad ids return `400 { message }`; every error body is `{ message }`; successful POSTs return `201`.

## Architecture

React 19 + React Router 7 SPA. Routes are declared in [src/App.jsx](src/App.jsx), all wrapped in a single `Layout` (header, footer, background icon):

- `/` → redirects to `/recipes` (`<Navigate replace />`)
- `/recipes` → Recipes, `/recipes/new` → NewRecipe
- `/review` → RecipesToReview, `/review/:id` → ReviewRecipe

Header `NavLink`s have no `end`, so "Recipes" is active on every `/recipes...` page and "Review" on every `/review...` page. Keep new pages under one of these prefixes.

`src/components/` is organised by role:

- `views/` — route-level pages; own the endpoint and top-level state
- `entity/<name>/` — domain components for one entity (`recipe`, `review`); new entities get a sibling folder
- `UI/` — generic reusable pieces:
  - `Button` — the shared pill button; renders a `<Link>` when given `to`, otherwise a `<button>` (default `type="button"`). `variant="primary" | "secondary" | "danger"`
  - `BackLink` — "← Back to ..." text link at the top of a page
  - `RecordsState` — loading / error / empty message for a list; `children` is a function called with the records
  - `StatusBadge` (Pending / Approved / Rejected), `Tag`, `Card` / `CardContainer`
- `layout/` — app chrome (`Header`, `Footer`, `Layout`)
- `api/` — data access
- `auth/` — `currentUser.js`, a hardcoded logged-in user (`userID`, names) until real login exists

### Data access

All HTTP goes through two layers in `src/components/api/`:

- `API.get/post/put/delete(endpoint, record)` take a **full URL** (build it with `` `${apiURL}/...` ``) and **never reject**. They resolve to `{ isSuccess: true, result }` or `{ isSuccess: false, status, message }`. A server that is down gives `status: null` and "Could not reach the server..."; a non-JSON body is handled too. Check `isSuccess` (and `status` for special cases like `409`); no `try/catch` is needed around API calls.
- `useLoad(endpoint)` returns `[records, loadingMessage, loadRecords, errorStatus]`. `records` is `null` until loaded, and on failure it stays `null` while `loadingMessage` becomes the error. Call `loadRecords(endpoint)` to force a reload.
- For lists, render with `RecordsState` (do not check `errorStatus` for "no records" — empty lists are `[]`):
  `<RecordsState records={x} loadingMessage={m} emptyMessage="No ...">{(list) => list.map(...)}</RecordsState>`
- `errorStatus` is only for single-record pages: [ReviewRecipe.jsx](src/components/views/ReviewRecipe.jsx) uses `errorStatus === 404` to show "Recipe not found".

Saving: reviews are saved with `POST /recipereviews` in [ReviewRecipe.jsx](src/components/views/ReviewRecipe.jsx) (works since CR5). Only creating a recipe is not wired up yet: `handleSubmit` in [src/components/views/NewRecipe.jsx](src/components/views/NewRecipe.jsx) only logs the recipe. When it is wired to `POST /recipes`, the body needs `recipeName` and `recipeCreatedBy: currentUser.userID` (from [currentUser.js](src/components/auth/currentUser.js)).

### Forms

[RecipeForm.jsx](src/components/entity/recipe/RecipeForm.jsx) sets the pattern. State holds real JS values with `null` for empty, and a `conformance` object with `js2html` / `html2js` converters per field translates at the input boundary (`null` ↔ `""`, ids ↔ strings, with `"0"` as the unselected `<select>` value). The form validates itself into an `errors` array and hands a clean object to an `onSubmit` prop; the parent view decides what to do with it and owns navigation via `onCancel`.

## Conventions

- Component bodies are sectioned with comments in the order Initialisation / State / Handlers / View; [src/template.jsx](src/template.jsx) is the starter skeleton.
- Each component imports its own co-located `.scss`. Class names are BEM-style (`recipeForm__row`, `recipeCard--open`).
- A component owns its **look**; the parent owns its **position**. Use `Button` / `BackLink` / `StatusBadge` instead of copying their styles, and pass a parent class through `className` only for layout (margin, align-self).
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

## Learning Mode

I am a student and I want to understand every part of this project.
My English is not my first language, so please use simple, clear English.

- You may write code, but always explain it so I can learn from it.
- Before each edit, explain in 2-3 sentences what you are about to change
  and why it is needed for the user story.
- After each edit, explain the important lines: what they do, and which
  React or JavaScript concept they use (for example useState, props,
  useEffect, map, async/await, conditional rendering).
- When a step is small or uses something I have done before, let me
  write it myself first and then review my code.
- If there is more than one way to do something, tell me the options
  and why you chose one.
- At the end of each change, ask me 1-2 short questions to check
  that I understood it.
