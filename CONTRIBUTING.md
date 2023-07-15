# Contributing

All types of contributions are welcome, if this includes to the website, API, CDN (assets) translations or maybe even something else.

## Table of Contents

-   [Reporting Bugs](#reporting-bugs)
-   [Contributing to the Website](#contributing-to-the-website)
-   [Contributing to the API](#contributing-to-the-api)
-   [Contributing to Assets](#contributing-to-assets)
-   [Contributing to Translations](#contributing-to-translations)
-   [Commit Message Guidelines](#commit-message-guidelines)
-   [I want to contribute](#i-want-to-contribute)

## Reporting Bugs

If you find a bug, please open an issue [here](https://github.com/dromzeh/wanderer.moe/issues/new/choose) and fill out the template, please make sure there isn't already an issue open for the bug you are reporting, or that it already hasn't been fixed in the `development` branch.

## Contributing to the Website

As stated in the [README](README.md), the website is built with [SvelteKit](https://kit.svelte.dev/), the website is hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

Please read the README for more information on how to setup the website locally, etc.

All contributions to the website are welcome, such as bug fixes, code improvements, new features, etc etc.

> **Note**: All PRs should be made to the `development` branch, if you made a PR to the `main` branch, it will be closed unless it is a hotfix or something similar.

## Contributing to the API

The API is built with [Cloudflare Workers](https://workers.cloudflare.com/) and is available at [api.wanderer.moe](https://api.wanderer.moe/), the API's code is available [here](https://git.wanderer.moe/api).

Please read the README for more information on how to setup the API locally, etc.

## Contributing to Assets

Assets are hosted on [Cloudflare R2](https://www.cloudflare.com/products/r2/), the assets are available at [cdn.wanderer.moe](https://cdn.wanderer.moe/).

If you have assets to share, please fill out the [Asset Request Form](https://wanderer.moe/asset-request-form) and I will review your submission, currently takes around 1-2 weeks for submissions to be added.

## Contributing to Translations

Translations are handled by [Crowdin](https://crowdin.com/), you will need to create an account on Crowdin and send me a message on discord (@dromzeh) or email: [marcel@dromzeh.dev](marcel@dromzeh.dev) for access.

## Commit Message Guidelines

Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines.

Example:

```sh
chore(deps): update all dependencies
```

or:

```sh
feat: add x to y
```

## I want to contribute

> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

As stated if you want to contribute to the website, please open a PR to the `development` branch.

Please use the [API repo](https://git.wanderer.moe/api) for API contributions or API related issues. API PRs are to be made to the `main` branch.

Translation PRs will not be accepted, please use Crowdin for translations, read [Contributing to Translations](#contributing-to-translations) for more information on how to contribute to translations.
