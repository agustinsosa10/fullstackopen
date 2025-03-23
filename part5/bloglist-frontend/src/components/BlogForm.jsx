import React from "react";

const BlogForm = ({
  onClick,
  name,
  onSubmit,
  title,
  onChangeTitle,
  url,
  onChangeUrl,
  formVisible,
  setFormVisible
}) => {

  const hideWhenVisible = {display : formVisible ? 'none' : ''}

  const showWhenVisible = {display: formVisible ? '' : 'none'}

  return (
    <div>
    <h2>Blogs</h2>
      <p>
        {name} logged in
        <button onClick={onClick}>Logout</button>
      </p>
      <h2>create new blog</h2>

      <form onSubmit={onSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={onChangeTitle}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={onChangeUrl}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
