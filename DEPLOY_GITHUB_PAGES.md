# Deploy to GitHub Pages

This repository contains an automated GitHub Actions workflow (`.github/workflows/gh-pages.yml`) that builds the Vite app and publishes the `dist/` folder to the `gh-pages` branch every time you push to `main`.

How it works

- The workflow installs dependencies and runs `npm run build`.
- During the build the environment variable `VITE_BASE` is set to `/<repo-name>/` so Vite emits correct asset paths for project pages.
- The generated `dist/` directory is published to the `gh-pages` branch using `peaceiris/actions-gh-pages`.

Local build

If you want to build locally and inspect the output, run:

```powershell
npm ci
npm run build
```

If your repository is a project page (served at `https://<user>.github.io/<repo>/`) set the `VITE_BASE` env var when building locally:

```powershell
$env:VITE_BASE = '/my-repo/'; npm run build
```

Repository-specific

- This project is set up to publish to the repository `testmind-qa/testmind-qa`. The GitHub Pages URL for the project will be:

	`https://testmind-qa.github.io/testmind-qa/`

- The CI workflow (`.github/workflows/gh-pages.yml`) automatically sets `VITE_BASE` to `/testmind-qa/` during the build so assets reference the correct base path for the published site.

Manual deploy

If you prefer to deploy manually, you can copy the contents of `dist/` to the `gh-pages` branch or use the `gh-pages` npm package to publish the folder.
