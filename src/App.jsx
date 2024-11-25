import NavBar from "./components/navbar"
import Auth from "./components/login"
import { Routes, Route } from "react-router-dom"
import Blogs from "./components/blogs"
import Home from "./components/home"
import Footer from "./components/footer"
import AllBlogs from "./components/allblogs"
import Blogpost from "./components/blogpost"
import { AuthProvider } from "./components/authcontext"
import MyBlogs from "./components/myblogs"
import EditBlog from "./components/editblog"

function App() {

  return (
    <>
      <div className="app-container">
        <AuthProvider>
          <NavBar />
          <div className="app-content">
            <Routes>

              <Route path="/" element={<Home title={"BlogCraft"} />} />
              <Route path="/create-a-blog" element={<Blogs />} />
              <Route path="/all-blogs" element={<AllBlogs />} />
              <Route path="my-blogs" element={<MyBlogs />} />
              <Route path="/blog/:slug" element={<Blogpost />} />
              <Route path="/edit-blog/:id" element={<EditBlog />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </div>
        </AuthProvider>
        <Footer />
      </div>
    </>
  )
}

export default App
