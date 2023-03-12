import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Blog from './components/Blog';
import Insert from './components/webUser/Insert';
import InsertTask from './components/tasks/Insert'
import Login from './components/profile/Login'
import LogoutPage from './components/profile/LogoutPage'
import ViewProfile from './components/profile/ViewProfile';

import logo from "./img/logo192.png"

import Display from './components/webUser/display/Display';
import Tasks from './components/tasks/display/Display'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function SPA() {
    return (
        <div class="App">
            <div class="navbar">
                <img src={logo} alt="Logo" height="50" width="50" />
                <div class="links">
                    <Link class="link" to="/">HOME</Link>
                    <Link class="link" to="blog">BLOG</Link>
                    <Link class="link" to="users">USERS</Link>
                    <Link class="link" to="insert">INSERT USER</Link>
                    <Link class="link" to="tasks">TASKS</Link>
                    <Link class="link" to="insertTask">INSERT TASK</Link>
                </div>

                <div class="dropdown">
                    <button class="dropbtn">Profile</button>
                    <div class="dropdown-content">
                        <Link class="link" to="login">Login</Link>
                        <Link class="link" to="logout">Logout</Link>
                        <Link class="link" to="viewProfile">ViewProfile</Link>

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
            </Routes>
        </div>
    );
}

// To access our component outside of this file, we must export it.
export default SPA;