# BTEC Unit 5 Physics Revision

This repository turns the quiz code from `code.txt` into a deployable React website.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The generated static site is written to `dist/`.

## GitHub Pages

The repository includes a GitHub Actions workflow that builds and deploys the site automatically.

1. Push the repository to GitHub.
2. In the GitHub repository settings, open **Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` and GitHub will publish the contents of `dist/`.

The Vite configuration uses a relative base path, so the site works on both a custom domain and the default GitHub Pages project URL.
