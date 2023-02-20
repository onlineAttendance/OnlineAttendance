import useHttp from "../hooks/useHttp";
import { useEffect, useState, useContext } from "react";
import { PostContext } from "../context/post-context";
import { CardContent, Typography, Paper, Card } from "@mui/material";

const TodaysWord = () => {
  const postContext = useContext(PostContext);

  return (
    <Paper >
      {postContext.posts.map((post) => (
        <Card key={post.id} mt={2}>
          <CardContent>
          <Typography variant="body2" component="p">
              {post.date}
            </Typography>
            <Typography variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography variant="body2" component="p">
              {post.content}
            </Typography>
            
          </CardContent>
          <Paper sx={{ backgroundColor: "#1976d2", color: "#FFF",p:1 }}>
              {post.questions.map((question, index) => (
                <Typography variant="body3" component="p" m={1}>
                  {"Q" + (index + 1) + ". " + question}
                </Typography>
              ))}
            </Paper>
        </Card>
      ))}
    </Paper>
  );
};

export default TodaysWord;
