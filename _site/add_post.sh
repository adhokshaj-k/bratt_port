#!/bin/bash

# Script to help create new blog posts for Jekyll
# Usage: ./add_post.sh "Title of Post" category-name

# Check if arguments are provided
if [ -z "$1" ]; then
  echo "Usage: ./add_post.sh \"Title of Post\" [category-name]"
  exit 1
fi

# Get current date in YYYY-MM-DD format
DATE=$(date +%Y-%m-%d)

# Get the title and convert to lowercase with hyphens
TITLE="$1"
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-')

# Get the category (default to "general" if not provided)
CATEGORY=${2:-general}

# Create the file name
FILENAME="_posts/$DATE-$SLUG.md"

# Create the file
cat > "$FILENAME" << EOF
---
layout: post
title: "$TITLE"
date: $DATE
categories: $CATEGORY
---

Write your blog post content here using Markdown syntax.

## Heading 2

### Heading 3

- Bullet points
- Another bullet point

1. Numbered list
2. Second item

**Bold text** and *italic text*

[Link text](https://example.com)

![Image alt text](https://example.com/image.jpg)

\`\`\`
// Code block
function example() {
  return "Hello world!";
}
\`\`\`
EOF

echo "Blog post created at $FILENAME"
echo "You can now edit this file to add your content." 