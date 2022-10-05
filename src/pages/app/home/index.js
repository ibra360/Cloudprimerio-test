/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { PostCard } from "../../../components";
import axios from "axios";
import { useSelector } from "react-redux";
import { Paper, CircularProgress } from "@mui/material";
import { ButtonStyled, OuterGrid } from "./styles";
import { useNavigate } from "react-router-dom";
import { APPSCREENS, BASE_URL } from "../../../constants";
import { Box } from "@mui/material";

function Home() {
  useEffect(() => {
    fetchPosts();
  }, []);

  const { posts } = useSelector((state) => state.posts);
  const navigate = useNavigate();

  const [newFeedPosts, setNewFeedPosts] = useState([]);
  const [loading, setLoading] = useState([]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      addUsersPost(res.data.slice(0, 10));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addUsersPost = (apiPosts) => {
    const mixedPosts = [...posts, ...apiPosts];
    setNewFeedPosts(mixedPosts);
  };

  return (
    <OuterGrid item>
      {loading ? (
        <Box style={{ height: "93vh", paddingTop: "35vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        newFeedPosts.map((post, index) => <PostCard post={post} key={index} />)
      )}
      <ButtonStyled onClick={() => navigate(APPSCREENS.AddPost)}>
        Add Post
      </ButtonStyled>
    </OuterGrid>
  );
}

export default Home;
