import { Box, Typography, Grid, Container } from "@mui/material";
import React from "react";
import UserMenu from "../components/UserMenu";
import FolderList from "../components/FolderList";
import { Outlet, useLoaderData } from "react-router-dom";

export default function Home() {
  const { folders = [] } = useLoaderData() || {};

  // console.log('[HomePage]',{data})
  return (
    <Container maxWidth="lg" sx={{ height: '70vh', py: 2 }}>
      <Typography variant="h4" sx={{ mb: "20px" }}>
        Note App
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "right", mb: "10px" }}>
        <UserMenu />
      </Box>

      <Grid
        container
        sx={{
          flexGrow: 1,
          height: 'calc(100% - 100px)', // Trừ chiều cao của tiêu đề + UserMenu
          boxShadow: "0 0 15px 0 rgba(193, 193, 193, 0.6)"
        }}
      >
        <Grid  size={3} sx={{ height: "100%" }}>
          <FolderList folders={folders} />
        </Grid>
        <Grid  size={9} sx={{ height: "100%", bgcolor: "#ffffff" }}>
          <Box sx={{ height: "100%" }}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
