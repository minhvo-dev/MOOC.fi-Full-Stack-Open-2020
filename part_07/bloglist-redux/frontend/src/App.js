import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Toggable from "./components/Togglable";
import User from "./components/User";
import Users from "./components/Users";
import Navigator from "./components/Navigator";

import {
  Switch,
  Route
} from "react-router-dom";

import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div className="container">

      <Notification />
      {!user && <LoginForm />}
      {user &&
        <div>
          <Navigator />
          <div>
            <h2>Blog App</h2>
          </div>
          <Switch>
            <Route path="/blogs/:id">
              <Blog />
            </Route>

            <Route path="/users/:id">
              <User />
            </Route>

            <Route path="/users">
              <Users />
            </Route>

            <Route path="/">
              <Toggable
                buttonLabel="new blog"
                ref={blogFormRef}
              >
                <NewBlogForm
                  formToggle={blogFormRef}
                />
              </Toggable>
              <Blogs />
            </Route>
          </Switch>

        </div>
      }
    </div>
  );
};

export default App;