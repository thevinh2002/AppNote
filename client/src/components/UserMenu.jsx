import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Avatar, Box, Menu, Typography, MenuItem } from "@mui/material";

export default function UserMenu() {
  // Lấy thông tin người dùng từ context
  const {
    user: { displayName, photoURL, auth },
  } = useContext(AuthContext);

  // Quản lý trạng thái của Menu (Mở hoặc đóng)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Hàm đăng xuất
  const handleLogOut = () => {
    auth.signOut().then(() => {
      setAnchorEl(null); // Đóng menu sau khi đăng xuất
    }).catch((error) => {
      console.error("Logout error:", error); // Xử lý lỗi khi đăng xuất
    });
  };

  // Đóng menu khi nhấn ngoài
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Mở menu khi người dùng nhấn vào avatar hoặc tên
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  console.log(photoURL)

  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={handleClick}
      >
        {/* Hiển thị tên người dùng */}
        <Typography sx={{ mr: 1 }}>{displayName}</Typography>
        {/* Hiển thị ảnh đại diện */}
        <Avatar
          alt="avatar"
          src={photoURL || "https://via.placeholder.com/150"}
          sx={{ width: 40, height: 40 }}
        />
      </Box>
      
      {/* Menu người dùng */}
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* Mục đăng xuất */}
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </>
  );
}
