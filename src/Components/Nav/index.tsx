import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SecurityIcon from "@mui/icons-material/Security";

export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogsButtonClick = () => {
    navigate("/");
  };

  const handleEditorButtonClick = () => {
    navigate("/editor");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SecurityIcon fontSize="large" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            &nbsp; Labyrinth Log Viewer
          </Typography>
          <Button color="inherit" onClick={handleLogsButtonClick}>
            Logs
          </Button>
          <Typography>&nbsp; | &nbsp;</Typography>
          <Button color="inherit" onClick={handleEditorButtonClick}>
            File Editor
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
