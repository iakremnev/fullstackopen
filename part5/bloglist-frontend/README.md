# Exercise 5.1

Implement bare minimum login functionality on the frontend.
If a user is not logged in, present a login form.
If a user is logged in, present their name and a list of blogs.

# Exercise 5.2

Make login persistent with local storage. Add logout functionality.

# Exercise 5.3

Allow logged in users to create new blog entries

# Exercise 5.4

Implement notifications about successful and failed operations (add blog, login)

# Exercise 5.5

Add togglable feature to the new blog form. Hide the form after submitting a new blog.

# Exercise 5.6

Move state of the blog form into the blog form component (already done)

# Exercise 5.7

Expand and fold each blog entry with a button

# Exercise 5.8

Implement liking a blog post

# Exercise 5.9

Owner of a blog post isn't showing after liking the post (not relevant)

# Exercise 5.10

Sort the blog posts by the number of likes

# Exercise 5.11

Implement deleting a blog post

# Exercise 5.12

Lint

# Exercise 5.13

Test (vitest): Blog component renders title and author by default but not URL or number of likes

# Exercise 5.14

Test: Blog component renders url and number of likes when a button is clicked

# Exercise 5.15

Test: like button clicking

# Exercise 5.16

Test: test new blog form

# Exercise 5.24

Add React Router with root and `/login`. Blogs (root) and login/logout must be present in the navigation bar.

# Exercsie 5.25

Move detailed blog view to `/blog/:id`

# Exercise 5.26

Create a new view for creating a new blog at `/create`

# Exercise 5.27

Update the unit tests for the single blog view:
* Blog info and number of likes are displayed to unauthenticated users, buttons are not displayed
* Authenticated users who are not the blog's creator are show only the like button
* The blog's creator is also show the delete button
