# Bratt's Personal Website

This is a personal website for Adhokshaj Kulkarni (Bratt), built with Jekyll for blog functionality.

## Site Structure

- `index.md` - Home page
- `project.md` - Projects/Portfolio page
- `blog.md` - Blog listing page
- `_posts/` - Directory containing all blog posts in Markdown format
- `_layouts/` - Contains the site layouts
- `asset/` - Contains CSS, JavaScript, and images

## Adding Blog Posts

To add a new blog post, create a new Markdown file in the `_posts` directory with the following format:

```
---
layout: post
title: "Your Blog Post Title"
date: YYYY-MM-DD
categories: category-name
---

Your blog post content in Markdown format.
```

### File Naming Convention

Blog post files should be named using the format: `YYYY-MM-DD-title-with-hyphens.md`

For example: `2023-12-15-cybersecurity-best-practices.md`

## URLs

Jekyll generates clean URLs for the site:

- Home page: `/`
- Blog page: `/blog/`
- Project page: `/project/`
- Blog posts: `/blog/post-title/`

## Running the Site Locally

1. Install Jekyll and Bundler:
   ```
   gem install jekyll bundler
   ```

2. Navigate to the site directory and run:
   ```
   bundle install
   bundle exec jekyll serve
   ```

3. The site will be available at `http://localhost:4000`

## Deployment

The site can be deployed to any static hosting service like GitHub Pages, Netlify, or Vercel.

Build the site with:
```
bundle exec jekyll build
```

The compiled site will be available in the `_site` directory. 