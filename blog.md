---
layout: default
title: Blog
---

<section class="page-header">
    <h1>My Blogs</h1>
</section>

<section class="blog">
    <div>
        <ul id="blog-list">
            {% for post in site.posts %}
            <li>
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
            </li>
            {% endfor %}
        </ul>
    </div>
</section>

<style>
    .blog ul {
        list-style: none;
        padding: 0;
        max-width: 800px;
        margin: 0 auto;
    }
    
    .blog li {
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        transition: transform 0.2s;
    }
    
    .blog li:hover {
        transform: translateX(5px);
    }
    
    .blog a {
        text-decoration: none;
        color: #333;
        font-size: 1.2rem;
        font-weight: 500;
    }
    
    .post-date {
        display: block;
        color: #666;
        font-size: 0.9rem;
        margin-top: 0.5rem;
    }
</style>