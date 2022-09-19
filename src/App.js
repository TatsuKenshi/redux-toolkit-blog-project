import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostsForm";

function App() {
  return (
    <main className="bg-yellow-200 h-[]">
      <AddPostForm />
      <PostsList />
    </main>
  );
}

export default App;
