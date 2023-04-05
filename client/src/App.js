import { Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react'
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

import MenuIcon from '@mui/icons-material/Menu';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function SPA() {
    const [users, setUsers] = useState(false)
    const [tasks, setTasks] = useState(false)
    const [profile, setProfile] = useState(false)

    const [expand, setExpand] = useState("navbar-expand-false")

    function handleUsersClick() {
        if (!users) {
            setUsers(true)
            setTasks(false)
            setProfile(false)
        } else {
            setUsers(false)
        }
    }

    function handleTasksClick() {
        if (!tasks) {
            setTasks(true)
            setUsers(false)
            setProfile(false)
        } else {
            setTasks(false)
        }
    }

    function handleProfileClick() {
        if (!profile) {
            setProfile(true)
            setUsers(false)
            setTasks(false)
        } else {
            setProfile(false)
        }
    }

    function handleLink() {
        setUsers(false)
        setTasks(false)
        setProfile(false)
        setExpand("navbar-expand-false")
    }


    function handleExpand() {
        // console.log(handleExpand + " equals: " + (handleExpand == "navbar-expand-false"))
        if (expand === "navbar-expand-false") {
            console.log("setting to true")
            setExpand("navbar-expand-true")
        } else {
            setExpand("navbar-expand-false")
            console.log("setting to false")
        }
    }


    return (
        <div class="App">
            <div className={expand}>
                <div class="brud">

                    <div className="tAndL">
                    <img src={logo} alt="Logo" height="50" width="50" />
                    <div className="title">
                        <div className="titleText">Task Manager</div>
                    </div>

                    </div>
                    
                    <button class="btn" onClick={handleExpand}><MenuIcon style={{fontSize: 48}}/></button>
                </div>


                <div className="allNav">
                    <div class="links">
                        <Link onClick={handleLink} class="link" to="/">Home</Link>
                    </div>

                    <div class="dropdown">
                        <button className={`dropbtn${users}`} onClick={handleUsersClick}>Users</button>
                        <div className={`${users}`}>
                            <Link onClick={handleLink} class="link" to="users">Users List</Link>
                            <Link onClick={handleLink} class="link" to="insert">Add User</Link>
                        </div>
                    </div>

                    <div class="dropdown">
                        <button className={`dropbtn${tasks}`} onClick={handleTasksClick}>Tasks</button>
                        <div className={`${tasks}`}>
                            <Link onClick={handleLink} class="link" to="tasks">Tasks List</Link>
                            <Link onClick={handleLink} class="link" to="insertTask">Create Task</Link>
                        </div>
                    </div>

                    <div class="dropdown">
                        <button className={`dropbtn${profile}`} onClick={handleProfileClick}>Profile</button>
                        <div className={`${profile}`}>
                            <Link onClick={handleLink} class="link" to="login">Login</Link>
                            <Link onClick={handleLink} class="link" to="logout">Logout</Link>
                            <Link onClick={handleLink} class="link" to="viewProfile">View Profile</Link>
                        </div>
                    </div>
                </div>

            </div>
            <Routes >
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
        </div>
    );
}

// To access our component outside of this file, we must export it.
export default SPA;