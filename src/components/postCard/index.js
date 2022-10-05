import { CardContent, Typography } from "@mui/material";

import { OuterContainer, CardStyled } from "./styles";

function PostCard({ post }) {
  return (
    <OuterContainer>
      <CardStyled elevation={3}>
        <CardContent>
          <Typography gutterBottom variant="h5" fontWeight="bold">
            {post?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post?.body}
          </Typography>
        </CardContent>
      </CardStyled>
    </OuterContainer>
  );
}

export default PostCard;
