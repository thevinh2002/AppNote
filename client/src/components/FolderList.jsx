import { Card, CardContent, List, Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import NewFolder from "./NewFolder";
export default function FolderList({ folders = [] }) {
  const { folderId } = useParams();
  const [activeFolderID, setActiveFolderID] = useState(folderId);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "#7D9D9C",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2, // thêm margin dưới cho thoáng
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
          Folders
        </Typography>
        <NewFolder />
      </Box>

      <List
        disablePadding
        sx={{
          flexGrow: 1,
          overflow: "auto", // Cho phép scroll nếu nội dung dài
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#576F72",
            borderRadius: "3px",
          },
        }}
      >
        {folders.map(({ id, name }) => (
          <Link
            to={`/folder/${id}`}
            key={id}
            style={{ textDecoration: "none" }}
            onClick={() => setActiveFolderID(id)}
          >
            <Card
              sx={{
                mb: 2,
                borderRadius: 1,
                bgcolor: "#fff",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  transform: "translateY(-2px)",
                  transition: "all 0.2s ease-in-out",
                },
                background:
                  id === activeFolderID ? "rgb(255 211 140)" : "white",
              }}
            >
              <CardContent sx={{ px: 2, py: 1.5 }}>
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontSize={16}
                  fontWeight={"bold"}
                  textAlign={"left"}
                >
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </List>
    </Box>
  );
}
