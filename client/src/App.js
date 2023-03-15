import { Routes, Route, Link } from 'react-router-dom';
import React, {useState} from 'react'
import Home from './components/Home';
import Blog from './components/Blog';
import Insert from './components/webUser/Insert';
import InsertTask from './components/tasks/edit/Insert'
import Login from './components/profile/Login'
import LogoutPage from './components/profile/LogoutPage'
import ViewProfile from './components/profile/ViewProfile';

import logo from "./img/logo192.png"

import Display from './components/webUser/display/Display';
import Tasks from './components/tasks/display/Display'
import { AppBar, Toolbar, Button, Typography, Menu, MenuItem } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function SPA() {
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const handleMenuClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleMenuClose1 = () => {
        setAnchorEl1(null);
    };

    const handleMenuClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleMenuClose2 = () => {
        setAnchorEl2(null);
    };

    return (
        <div class="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        CRUD
                    </Typography>
                    <Button color="inherit"><Link to="/">Home</Link></Button>
                    <Button color="inherit"><Link to="blog">Blog</Link></Button>
                    {/* USERS */}
                    <Button
                        color="inherit"
                        onClick={handleMenuClick1}
                        aria-controls="menu"
                        aria-haspopup="true"
                    >
                        Users
                    </Button>
                    <Menu
                        id="menu"
                        anchorEl1={anchorEl1}
                        open={Boolean(anchorEl1)}
                        onClose={handleMenuClose1}
                    >
                        <MenuItem onClick={handleMenuClose1}><Link to="users">Users List</Link></MenuItem>
                        <MenuItem onClick={handleMenuClose1}><Link class="link" to="insert">Insert a User</Link></MenuItem>
                    </Menu>
                    {/* ------- */}

                    {/* TASKS */}
                    <Button
                        color="inherit"
                        onClick={handleMenuClick2}
                        aria-controls="menu"
                        aria-haspopup="true"
                    >
                        Tasks
                    </Button>
                    <Menu
                        id="menu"
                        anchorEl2={anchorEl2}
                        open={Boolean(anchorEl2)}
                        onClose={handleMenuClose2}
                    >
                        <MenuItem onClick={handleMenuClose2}><Link to="tasks">Tasks List</Link></MenuItem>
                        <MenuItem onClick={handleMenuClose2}><Link class="link" to="insertTask">Insert a User</Link></MenuItem>
                    </Menu>
                    {/* ------------ */}

                </Toolbar>
            </AppBar>

            {/* Routes to pages */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="blog" element={<Blog />} />
                <Route path="users" element={<Display />} />
                <Route path="insert" element={<Insert />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="insertTask" element={<InsertTask />} />
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<LogoutPage />} />
                <Route path="viewProfile" element={<ViewProfile />} />
            </Routes>
            {/*<div class="navbar">
                <img src={logo} alt="Logo" height="50" width="50" />
                <div class="links">
                    <Link class="link" to="/">Home</Link>
                    <Link class="link" to="blog">Blog</Link>
                </div>

                <div class="dropdown">
                    <button class="dropbtn">Users</button>
                    <div class="dropdown-content">
                    <Link class="link" to="users">Users List</Link>
                    <Link class="link" to="insert">Insert a User</Link>
                    </div>
                </div>

                <div class="dropdown">
                    <button class="dropbtn">Tasks</button>
                    <div class="dropdown-content">
                    <Link class="link" to="tasks">Tasks List</Link>
                    <Link class="link" to="insertTask">Insert a Task</Link>
                    </div>
                </div>

                <div class="dropdown">
                    <button class="dropbtn">Profile</button>
                    <div class="dropdown-content">
                        <Link class="link" to="login">Login</Link>
                        <Link class="link" to="logout">Logout</Link>
                        <Link class="link" to="viewProfile">View Profile</Link>

                    </div>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="blog" element={<Blog />} />
                <Route path="users" element={<Display />} />
                <Route path="insert" element={<Insert />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="insertTask" element={<InsertTask />} />
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<LogoutPage />} />
                <Route path="viewProfile" element={<ViewProfile />} />
    </Routes>*/}
        </div>
    );
}

// To access our component outside of this file, we must export it.
export default SPA;