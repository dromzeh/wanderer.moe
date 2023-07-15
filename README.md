<div align="center">

![Banner]

[![Discord Badge]](https://discord.wanderer.moe/)
![Release Badge]
![Svelte Badge]

[**wanderer.moe**](https://wanderer.moe) is a **centralized database** of various game assets — built using [**SvelteKit**](https://kit.svelte.dev/), [**TailwindCSS**](https://tailwindcss.com/), and [**Node.js**](https://nodejs.org/en), powered with [**Cloudflare**](https://www.cloudflare.com/) Pages, Workers & R2 paired with [**Lucia**](https://lucia-auth.com/), [**Prisma**](https://prisma.io), and [**PlanetScale**](https://planetscale.com) for the database & authentication, [**Resend**](https://resend.com/) for email delivery, and [**Crowdin**](https://crowdin.com/) for translations.

</div>

---

## Local Development & Build

To run the website locally, follow these steps:

1. Read [API & CDN](#api--cdn) first.

2. Clone the repository (either `main` or `development` branch, dependant on your use case), and run either:

    ```bash
    git clone https://github.com/wanderer-moe/site
    # OR
    git clone https://github.com/wanderer-moe/site -b development
    ```

    You also want to initialize the (i18n) submodules:

    ```bash
    git submodule init && git submodule update
    ```

3. Install dependencies & setup environment variables, then run `npx prisma generate` (&& `npx prisma db push` where applicable)

4. `pnpm run dev` to start the development server. The website will be available at `http://localhost:1337` (or another port if 1337 is already in use).

5. To build the website, run `pnpm run build`. After the build process is complete, run `pnpm run preview` to preview the site at `http://localhost:4173`.

## API & CDN

The API and CDN have their own respective subdomains — `api` and `cdn`. The API is powered by Cloudflare Workers and the CDN is powered by Cloudflare R2. The API's code is available at the [api repository][api.wanderer.moe]. More details on setting up the API are available [on api/#usage][api.wanderer.moe Usage].

## Production Deployment & Configuration

### Redirects

View `src/hooks.server.ts` for the current redirects.

### Cloudflare Configuration

-   **Build Command**:

    ```bash
    npx pnpm i --store=node_modules/.pnpm-store && npx pnpm run build
    ```

-   **Build Output Directory**:

    ```bash
    /.svelte-kit/cloudflare
    ```

All pushes to the `development` branch is deployed to the `beta` subdomain @ [beta.wanderer.moe](https://beta.wanderer.moe).

## Contributing

-   **Development**: All contributions are welcome. Please make all pull requests to the `development` branch!
-   **Assets and Translation**: Asset contributions or requesting access to the Crowdin project can be sent on Discord (@dromzeh) or email: [marcel@dromzeh.dev][mail].

A more detailed guide on contributing can be found in [CONTRIBUTING.md][Contributing].

## Contributors

#### Developers

-   [@dromzeh][Dromzeh] - Project Lead & Developer (Website, API & CDN)

#### Asset Contributors and Translators

A full list can be found [here][Contributors].

## Translations

Translations are managed on [Crowdin][Crowdin]. All translations can be found on the [i18n repository][i18n].

## License

[wanderer.moe][wanderer.moe] is licensed under [GNU Affero General Public License v3.0][License] — **You must state all significant changes made to the original software, make the source code available to the public with credit to the original author, original source, and use the same license.**

[Banner]: https://files.catbox.moe/qoyuka.svg
[Discord Badge]: https://img.shields.io/discord/982385887000272956?color=323379&label=discord&logo=discord&logoColor=fff&style=for-the-badge
[Release Badge]: https://img.shields.io/github/v/release/wanderer-moe/site?color=%233b3d91&label=latest%20release&logo=github&logoColor=fff&style=for-the-badge
[Svelte Badge]: https://img.shields.io/github/package-json/dependency-version/wanderer-moe/site/dev/svelte?color=4547a9&logo=svelte&logoColor=fff&style=for-the-badge
[api.wanderer.moe]: https://git.wanderer.moe/api
[api.wanderer.moe Usage]: https://git.wanderer.moe/api#usage
[Mail]: mailto:marcel@dromzeh.dev
[Contributing]: CONTRIBUTING.md
[Dromzeh]: https://github.com/dromzeh
[Contributors]: https://wanderer.moe/contributors
[Crowdin]: https://crowdin.com/project/wanderermoe
[i18n]: https://github.com/wanderer-moe/i18n/tree/main/site
[wanderer.moe]: https://wanderer.moe
[License]: LICENSE
