import './App.css';
import * as React from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../logoSigmaWhite.png";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Loading from "../components/Loading";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [serverName, setServerName] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    axios.get("/loggeduser/servers")
    .then(res => {
        console.log(res.data);
        setLoading(false);
    })
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickNavigate = () => {
    navigate("/", { replace: true });
  };

  const handleServerNameChange = (event) => {
    setServerName(event.target.value);
  };

  const handleServerNameSubmit = () => {
    setOpen(false);
    setServerName("");
  };

  return (
    <div>
      {
        loading ?
        (
          <Loading />
        )
        :
        (
          <div>
            <header className='App-header'>
              <img src={logo} alt="Logo"/>
              <nav>
                <ul>
                  <li><Link to="/channels/454/541">ServerChat</Link></li>
                  <li><Link to="/channels/@me/5874545">PrivateChat</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/logout">Logout</Link></li>
                </ul>
              </nav>
            </header>
            <body className='App-body'>
              <div className='ServersList'>
              <ul>
                  <li>
                      <Tooltip title="Home" placement='right'>
                        <IconButton aria-label="delete" size="large" color="warning" onClick={handleClickNavigate}>
                            <HomeIcon fontSize='60' />
                        </IconButton>
                      </Tooltip>
                  </li>
                  <li>
                      <Tooltip title="Add" placement='right'>
                        <IconButton aria-label="delete" size="large" color="warning" onClick={handleClickOpen}>
                            <AddIcon fontSize='60' />
                        </IconButton>
                      </Tooltip>
                  </li>
              </ul>
              </div>
              
              <main className='App-main' style={{ paddingLeft: "72px" }}>
                <Outlet/>
              </main>
            </body>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Create or join a server</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name or invite"
                  type="text"
                  value={serverName}
                  onChange={handleServerNameChange}
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleServerNameSubmit}>Create or join</Button>
              </DialogActions>
            </Dialog>
          </div>
        )
      }
    </div>
  );
}

export default Home;