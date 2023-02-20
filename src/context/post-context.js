import useHttp from "../hooks/useHttp";
import React, { useState, createContext, useEffect } from "react";

export const PostContext = createContext();

const PostContextProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const updatePosts = () => {
    setPosts();
  };
  const loadPosts = () => {
    setPosts();
  };
  const initPosts = () => {
    setPosts();
  };
  const { isLoading, error, sendRequest: fetchPosts } = useHttp();

  useEffect(() => {
    const transformPosts = (posts) => {
      console.log("post:" + posts);
      setPosts(posts);
    };
    fetchPosts({ url: "/api/users/posts/0" }, transformPosts);
  }, [fetchPosts]);

  return (
    <PostContext.Provider value={{ posts, updatePosts, loadPosts, initPosts }}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
