# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.5.2](https://github.com/arminbabaeistudio/travelese.xyz/compare/v0.5.1...v0.5.2) (2024-08-07)

### Features

- **search:** refactor search functionality and update travel components ([c167991](https://github.com/arminbabaeistudio/travelese.xyz/commit/c16799115397cc24036508418843f9511f342489))

### [0.5.1](https://github.com/arminbabaeistudio/travelese.xyz/compare/v0.5.0...v0.5.1) (2024-08-05)

### Features

- **feat(stripe):** added Subscription Section to the home page ([f6bee1a](https://github.com/arminbabaeistudio/travelese.xyz/commit/f6bee1a81045111cc8a00ce69122abe88404af0a))

## [0.5.0](https://github.com/arminbabaeistudio/travelese.xyz/compare/v0.4.5...v0.5.0) (2024-08-05)

### ⚠ BREAKING CHANGES

- **feat(travel):** FlyBookForm and StayBookForm have been replaced with a single BookForm component.
  Update all references accordingly. Search and booking flows now support both fly and stay options.

DEV-52

### Features

- **feat(travel):** implement stay search and refactor booking components ([bc3a3e2](https://github.com/arminbabaeistudio/travelese.xyz/commit/bc3a3e2e7b4dec1f0d0a5c40b6f8b4fbd70130d6))

### Bug Fixes

- duffel webhook ([acf60b5](https://github.com/arminbabaeistudio/travelese.xyz/commit/acf60b56d9bc7e311d956efef397425c78c1ae4a))
- duffel webhook ([a218c81](https://github.com/arminbabaeistudio/travelese.xyz/commit/a218c816c99de4ce17918a2d5f9642a4ba03b1d1))
- duffel webhook ([79059aa](https://github.com/arminbabaeistudio/travelese.xyz/commit/79059aa591e7991f922131e8298720cf838e87e2))
- duffel webhook ([ac6ef90](https://github.com/arminbabaeistudio/travelese.xyz/commit/ac6ef900c73f44ee58ab1aa71ec10ebc7f137677))
- **fix(webhooks):** correct Duffel signature header name ([4eef1ee](https://github.com/arminbabaeistudio/travelese.xyz/commit/4eef1ee82f8e517b5274e71825d56b3509874db7))
- **fix(webhooks):** duffel signature ([6b3d437](https://github.com/arminbabaeistudio/travelese.xyz/commit/6b3d437dd39a92dd75e40721abb13edb9dd6ed9a))
- **fix(webhooks):** implement Duffel webhook handler ([62aa7db](https://github.com/arminbabaeistudio/travelese.xyz/commit/62aa7db737055ee5c35f1c86f19545c8002540df))
- **fix(webhooks):** implement Duffel webhook handler ([9697847](https://github.com/arminbabaeistudio/travelese.xyz/commit/9697847579dad3274c079bd360810cfae46654d1))

### [0.4.5](https://github.com/arminbabaeistudio/travelese.xyz/compare/v0.4.4...v0.4.5) (2024-08-04)

### Bug Fixes

- **fix(webhooks):** correct Duffel webhook verification ([1d91ae1](https://github.com/arminbabaeistudio/travelese.xyz/commit/1d91ae169945d41a6b1e0768e54aa11db35eef15))
- updated DUFFEL_WEBHOOK_SECRET ([14ce181](https://github.com/arminbabaeistudio/travelese.xyz/commit/14ce18128450c28b13d3fb053c7040158ec59030))
- updated DUFFEL_WEBHOOK_SECRET ([f57c02f](https://github.com/arminbabaeistudio/travelese.xyz/commit/f57c02f5671a6fd7cb410ab970dd6ea6c44ef885))
- **webhook:** added CLERK_WEBHOOK_SECRET to .env ([4797b78](https://github.com/arminbabaeistudio/travelese.xyz/commit/4797b78fe08319b7197488e6212cbfb74e4ef601))

### [0.4.4](https://github.com/arminbabaeistudio/travelese.xyz/compare/v0.4.3...v0.4.4) (2024-08-03)

### Features

- **auth and travel:** refactor and update authentication and API routes ([8f1c0c1](https://github.com/arminbabaeistudio/travelese.xyz/commit/8f1c0c156b00163629eddc74779919836d56182b))

### [0.4.3](https://github.com/arminbabaeistudio/travelese.xyz/compare/v0.4.2...v0.4.3) (2024-07-28)

### Features

- **api:** allow public access to search functionality ([64589c1](https://github.com/arminbabaeistudio/travelese.xyz/commit/64589c18d856ef804f72d873af0834fa7b0b7168))

### [0.4.2](https://github.com/arminbabaeistudio/travelese.xyz/compare/v0.4.1...v0.4.2) (2024-07-26)

### Bug Fixes

- **placesselector:** refactor PlacesSelectorto handle Stay and Fly ([aa634c0](https://github.com/arminbabaeistudio/travelese.xyz/commit/aa634c02f749f2a59484deaa757673c8c00821b6)), closes [#DEV-32](https://github.com/arminbabaeistudio/travelese.xyz/issues/DEV-32)

### [0.4.1](https://github.com/arminbabaeistudio/travelese.xyz/compare/v0.4.0...v0.4.1) (2024-07-26)

## [0.4.0](https://github.com/arminbabaeistudio/travelese.xyz/compare/v0.3.1...v0.4.0) (2024-07-21)

### ⚠ BREAKING CHANGES

- **travel:** This update includes significant changes to the API routes and database schema,
  which may affect existing integrations.

DEV-28

### Features

- **travel:** refactor booking system, add admin features, analytics, and rate limiting ([04163fb](https://github.com/arminbabaeistudio/travelese.xyz/commit/04163fb1915e5838fc51eaee7ede8eed6183f8d8))

### [0.3.1](https://github.com/arminbabaeistudio/travelese.xyz/compare/v0.3.0...v0.3.1) (2024-07-19)

### [0.3.0](https://github.com/arminbabaeistudio/travelese.xyz/compare/v0.2.3...v0.3.0) (2024-07-16)

### ⚠ BREAKING CHANGES

- **travel:** This commit includes significant changes to the database schema, API routes, and
  overall application structure. It may require data migration and updates to integration points.

- **travel:** overhaul booking system and update dependencies ([da070de](https://github.com/arminbabaeistudio/travelese.xyz/commit/da070de2c4b0518f5354cff72da5b8b0838ba873)), closes [#DEV-27](https://github.com/arminbabaeistudio/travelese.xyz/issues/DEV-27)

### [0.2.4](https://github.com/arminbabaeistudio/travelese.xyz/compare/v0.2.3...v0.2.4) (2024-07-12)

### [0.2.3](https://github.com/arminbabaeistudio/travelese.xyz/compare/v0.2.2...v0.2.3) (2024-07-12)

### Bug Fixes

- husky and jest ([cd5dfa1](https://github.com/arminbabaeistudio/travelese.xyz/commit/cd5dfa1bfe3ae929896f776a627aec5da719d8da))
- updated package.json ([2cc575d](https://github.com/arminbabaeistudio/travelese.xyz/commit/2cc575d4ab339a60aa6b3c5119b4e2e6b0adf58b))

### [0.2.2](https://github.com/arminbabaeistudio/travelese.xyz/compare/v0.2.1...v0.2.2) (2024-07-09)

### 0.2.1 (2024-07-09)
