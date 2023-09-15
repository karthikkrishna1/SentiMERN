import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Heading() {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      bgcolor={"black"}
      color={"white"}
    >
      {/* <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton> */}
      <Typography
        fontWeight={"bold"}
        fontSize={50}
        variant="h6"
        component="div"
      >
        SentiMERN
      </Typography>
      {/* <Button color="inherit">Login</Button> */}
    </Box>
  );
}
