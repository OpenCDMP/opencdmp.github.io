# OpenCDMP documentation

This repository holds the source of the OpenCDMP documentation site, **[opencdmp.github.io](https://opencdmp.github.io/)**. It covers using OpenCDMP, administering an installation, deploying and configuring every service, the API, and plugin development. The site is built with [Docusaurus](https://docusaurus.io/).

The platform itself is in the [OpenCDMP repository](https://github.com/OpenCDMP/OpenCDMP).

## Layout

| Path | Contents |
| --- | --- |
| `docs/` | The current documentation (2.x), served at the root of the site |
| `versioned_docs/version-1.x/` | The frozen 1.x documentation, served under `/1.x/` |
| `static/images/`, `static/images-1.x/` | Screenshots and images of each version |
| `sidebars.ts`, `versioned_sidebars/` | The sidebars |
| `docusaurus.config.ts` | Site configuration, versions, and redirects for moved pages |
| `src/` | Custom styles and theme components |

The `docs/` folder is split by audience: `using/` (researchers), `administering/` (organisation administrators), `deployment/` (the people who run an installation), `developers/` (API and plugins), and `optional-services/` (notifications, comments, file transformers, deposit services, and evaluators).

## Run locally

Requires Node.js 20 or later.

```bash
npm install
npm start          # development server on http://localhost:3000, reloads on change
npm run build      # static site in build/; fails on broken links and anchors
npm run serve      # serve the build/ folder
```

## Contributing

- Follow the [style guide](STYLE_GUIDE.md): sentence-case headings, the terms the interface uses, and pages written for the reader.
- Link between pages with absolute paths to the Markdown files, for example `/docs/deployment/install/index.md`, so that the build can check them.
- Edit `docs/` for the current version. Change `versioned_docs/version-1.x/` only for critical corrections.
- Run `npm run build` before opening a pull request.

Report mistakes and missing topics in the [OpenCDMP issue tracker](https://github.com/OpenCDMP/OpenCDMP/issues).

Questions: email opencdmp at cite.gr.

## License

The documentation is licensed under the [European Union Public Licence (EUPL) v1.2](LICENSE).
