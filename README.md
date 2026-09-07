# Pasadena Afterschool Program — SOP Site

This is a small, self-updating website. It costs $0 to run. Anyone you add as a
collaborator can edit a page on GitHub, and the live site updates itself
automatically about a minute later — no coding required.

## One-time setup (you do this once)

1. **Create a new GitHub repository** (github.com → New repository). Make it
   **private** if you don't want the public reading your SOPs, or public if
   you don't mind (public repos get unlimited free GitHub Actions minutes;
   private repos get 2,000 free minutes/month, which is far more than this
   site will ever use).

   ⚠️ **Important:** whatever you name the repo, open `src/_data/site.json`
   and set `"pathPrefix"` to match — e.g. if your repo is named `my-sop-site`,
   set `"pathPrefix": "/my-sop-site/"` (slashes on both ends). GitHub Pages
   serves a project repo at `yourusername.github.io/repo-name/`, not at the
   domain root, so every link and stylesheet on the site needs to know that
   prefix — otherwise every internal link 404s the moment you click it. If
   you later set up a custom domain instead, change this back to `"/"`.
2. **Upload this whole folder** to that repo. Easiest way: on the repo's main
   page, click **"Add file" → "Upload files"**, then drag this entire
   `sop-site` folder's contents in, and commit.
3. Go to **Settings → Pages**. Under "Build and deployment", set **Source**
   to **GitHub Actions**. (You don't need to pick a template — the workflow
   file already included in this repo handles the build.)
4. Push/commit once more if needed to trigger the first build — check the
   **Actions** tab to watch it run. When it finishes, your site's URL will be
   shown at Settings → Pages (something like
   `https://yourusername.github.io/sop-site/`).

## Adding editors

Go to **Settings → Collaborators → Add people**, and add each person's GitHub
username or email. They'll need a free GitHub account.

## How editors update a page (no coding)

1. Go to the repo, open the **`src/content/`** folder.
2. Click the file for the section you want to change (e.g.
   `04-dismissal.md`).
3. Click the **pencil icon** (top right of the file view) to edit.
4. Edit the text. It's plain text with light formatting:
   - A blank line starts a new paragraph.
   - Lines starting with `-` become a bullet list.
   - Lines starting with `1.` `2.` `3.` become a numbered list.
   - Lines wrapped in `**two asterisks**` show up **bold**.
   - A line starting with `>` becomes a highlighted callout box.
5. Scroll down, add a short commit message (e.g. "update pickup time"), and
   click **"Commit changes directly to the main branch"**.
6. Wait about a minute. The **Actions** tab shows the rebuild in progress;
   when it turns green, the live site is updated.

To add a whole new SOP section: duplicate an existing file in
`src/content/`, give it a new `order` number in the header at the top of the
file (the `---` block), and change the `permalink`. It'll appear in the
sidebar automatically.

## Search & tags

The site has a built-in search box (top of the sidebar) powered by
[Pagefind](https://pagefind.app) — a free, no-backend search tool that
re-indexes the whole site automatically on every build. Nothing to configure.

Every section can carry `tags` in its front matter (the `---` block at the
top of the file), e.g. `tags: ["safety", "emergency"]`. Tags show as pills on
the page and automatically become filter checkboxes in the search box — no
extra setup, Pagefind picks them up on every build.

## Adding a video

Videos are **not** stored in this repo (git is bad at large files, and it
would slow every checkout down for everyone). Instead:

1. Upload the video to YouTube as **Unlisted** (Anthropic/Google account,
   free, unlimited). Unlisted means it won't show up in search or on your
   channel — only people with the link can view it.
2. Copy the video's URL.
3. In the relevant `src/content/*.md` file, add a line to the front matter:
   ```
   video: https://www.youtube.com/watch?v=YOUR_VIDEO_ID
   ```
4. Commit. The page will show the embedded video automatically above the
   text.

See `07-emergency.md` for a working example (replace its placeholder ID with
a real one, or remove the `video:` line if you don't have a video for that
section yet).

## Comments

Comments are powered by [giscus](https://giscus.app) — a free tool that
stores each page's comment thread as a GitHub Discussion on this same repo.
Because it's backed by GitHub, the same collaborators you already added can
comment, reply, react, and **@mention each other** — no new accounts, no
new service, and it's genuinely free with no usage limit.

One-time setup:

1. In this repo: **Settings → General → Features → check "Discussions"**.
2. Go to **github.com/apps/giscus** and click "Install", choosing this repo
   (only this repo, not all repos, unless you want that).
3. Go to **giscus.app**, enter this repo's name where it asks, and it will
   generate a small script with your real `data-repo-id` and
   `data-category-id` values.
4. Open `src/_includes/section.njk` in this repo, find the `<script
   src="https://giscus.app/client.js" ...>` block near the bottom, and
   replace the four placeholder values (`YOUR-ORG/YOUR-REPO`,
   `REPLACE_WITH_REPO_ID`, `General`, `REPLACE_WITH_CATEGORY_ID`) with the
   ones giscus.app gave you. Commit.

After that, every section page has a live comment thread at the bottom.

## Tracking who's completed training

Real per-staff completion tracking needs somewhere to store submissions —
this site has no backend, so the free option is a **Google Form** feeding a
**Google Sheet** (both free with any Google account):

1. Create a Google Form with three questions: **Name**, **Section**
   (dropdown — list all 12 section titles), and it will auto-timestamp
   responses. Link its "Responses" tab to a Google Sheet.
2. Click **Send** on the form, copy the short link (`forms.gle/...`).
3. Open `src/_data/site.json` in this repo and replace the
   `trainingFormUrl` placeholder with that link. Commit.

Every section page will then show a **"Confirm you've read this"** button
that opens the form in a new tab. The Sheet gives you a live, filterable
record of who's completed what — sort by Section to see gaps, or by Name to
see an individual's progress. It's manual (staff self-report by picking
their name and the section) rather than automatic, but it's genuinely free
and needs no server.

If you outgrow this later, tools like Airtable (free tier) or a proper LMS
can replace the Google Form without changing anything else on the site —
just point `trainingFormUrl` at the new destination, or replace that one
link in `section.njk` with an embed.

## Local preview (optional, for anyone comfortable with a terminal)

```
npm install
npm run build
npx serve _site
```
