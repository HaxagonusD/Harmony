function Comment({ content, displayName }) {
  return (
    <div>
      <h1>{displayName}</h1>
      {content}
    </div>
  );
}
export default Comment;
