import React, { useEffect, useState } from "react";
import "./CRUDApp.css";  // Import the CSS file

const CRUDApp = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const addPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ title, body, userId: 1 }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((newPost) => setPosts([newPost, ...posts]));
    setTitle("");
    setBody("");
  };

  const updatePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((updatedPost) => {
        setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
        setEditingId(null);
        setTitle("");
        setBody("");
      });
  };

  const deletePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then(() => setPosts(posts.filter((post) => post.id !== id)));
  };

  return (
    <div className="container">
      <h1 className="header">CRUD App</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="input-field"
        />
        {editingId ? (
          <button onClick={() => updatePost(editingId)} className="button update-button">
            Update Post
          </button>
        ) : (
          <button onClick={addPost} className="button add-button">
            Add Post
          </button>
        )}
      </div>
      <div className="post-container">
        {posts.map((post) => (
          <div key={post.id} className="post-container">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button
              onClick={() => {
                setEditingId(post.id);
                setTitle(post.title);
                setBody(post.body);
              }}
              className="edit-button"
            >
              Edit
            </button>
            <button onClick={() => deletePost(post.id)} className="delete-button">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CRUDApp;
