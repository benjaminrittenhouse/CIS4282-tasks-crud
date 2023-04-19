import "../style/spaPage.css"
import React from 'react'

function Blog() {
    return (
        <div className = "spaPage">
            <h2 className = "headerText">Blog</h2>
            
            <div>
            <h4>Description</h4>
            <p>The Task Manager system allows you to manage a database of users and tasks. This can be useful for companies to assign tasks to users and see which user is working on a specific task. Tasks can be categorized to be more specific, and can also be assigned a date and completion date. The creation of a task allows for text file uploads for large descriptions. Both the users and the tasks have their own pages for viewing all of the items in list view, and viewing a more detailed expanded view by clicking on an item. The user can delete, add, update, or create records for both the tasks and the user list.</p>

            <h4>What I Learned</h4>
            <h5>React & MUI</h5>
            <p>
            This project was created using <a href="https://react.dev/">React JS</a>. One of the interesting libraries I used was material UI for React, or <a href="https://mui.com/">MUI</a>. I like this library because it provides easy and flexible components and icons for designing a clean looking UI. It is not used throughout the entire project, but for example, the detailed view of users and tasks, such as their description or picture, were created using an MUI <a href="https://mui.com/material-ui/react-card/">“card”</a> component that allows for information cards to be populated and styled nicely with little or no extra CSS.
            </p>

            <h5>Interesting Points about React</h5>
            <p>
            One of the most interesting aspects of React JS that I learned was passing state and prop variables. A parent component can create state variables which the React UI will listen to and updated based on if the variables change. However these state variables are only mutable by the parent. When they are passed to a child, they are considered “props” that are read only by the child. What is interesting though, is when we need a child to mutate something. We can simply pass a function to it as another prop, but a “callable” one. This stack overflow link describes it nicely: <a href="https://stackoverflow.com/questions/27991366/what-is-the-difference-between-state-and-props-in-react">Link</a>
            </p>

            <p>
                I also got very familiar with the components in react and passing props and state. I broke the web users and tasks into their own separate folders, and there are similar JS files within these that do similar things,
                just differently for tasks vs web user. For example there is a component to create little boxs, or "previews", in a list, before the user clicks on one and sees a "detailed view" on the right side of their screen.
            </p>

            <h5>Node.js & React File Uploads</h5>
            <p>Link to <a href="https://github.com/benjaminrittenhouse/CIS4282-tasks-crud/blob/main/server/webUserAPIs/uploadAPI.js">uploadAPI.js</a> code</p>
            <p>Link to <a href="https://github.com/benjaminrittenhouse/CIS4282-tasks-crud/blob/main/client/src/components/webUser/edit/Insert.js">Insert.js</a> (Web User)</p>

            <p>An interesting part that I learned was uploading files with a React frontend and storing them in a node backend. Then, I point to the uploaded images based on whatever they were named.
                In this case, I named the files after the users email, such as "user123@gmail.com.jpeg" once they clicked upload for a profile image. My code is currently working so the second
                the user changes the file, it uploads it to the server under their email name. There are obvious flaws and problems with this at the moment such as a user could change their email 
                to someone elses that already exists, uplaod a photo, and then save it and it would overrride the other users photo.
            </p>

            <p>
                However for the time being I think that this was a very cool learning experience because I learned about input fields on the frontend with react as well as looking at code and how to 
                save input files on the backend. The linked code above with the uploadAPI.js file is what I am referring too, and it actually is not that many lines of code. The Insert.js file is more lines of 
                code, but in this case I am referring to the code at the top of the functional component that is called "handleFileChange".
            </p>

            <h4>Potential Next Steps</h4>
            <p>
            In the next phase of development for this project, goal implementations would be a report writer. This would allow an administrator or someone with the right privileges to grab specific attributes and information about tasks and users and create a report about it. For example, they may like to grab the Names and Descriptions of all tasks, only created by the following users: Sally, Ben, Brad. The report writer would then grab this info and display it nicely in a similar manner to the “detailed view” of users and tasks. An interesting idea would to be able to write multiple reports and compare them side by side. 
            </p>
            
            <p>Another idea would be an admin portal that allows a user with specific privileges to log in and do things a non-admin cannot. For example admins can write reports but basic users cannot. Their could also be an extremely low level tier where the user logged in can only see the tasks and users but cannot edit or create any.
            </p>

            <h4>What I Wish I Could've Done</h4>
            <h5>Full MUI</h5>
            <p>I had a thought about fully using MUI for the entire project, but it was too late to do a full overhaul and fully implement it. MUI looks great for a lot of things, such as input fields and forms. Check out this <a href="https://mui.com/material-ui/react-text-field/">TextField component</a>. 
            I started working with it, but scrapped it (it is available under “webUser/edit/mui” in my project). These TextFields, when paired with a “Box” component (that pretty much acts as a form in MUI), styles a very nice and responsive looking modern form. If you also look at the previously mentioned link, there is cool features where the text moves from the input bot to the top of the box when a user starts typing. That way, a user never has to forget what the field name is called, and it takes up a lot less space.</p>

            <h5>Complete Implementation of File Upload</h5>
            <p>As I was talking about a little before, there are some errors surrounding the idea of a user being allowed to upload their own image. I wish I could've added more checking for this
                to make sure the file upload is verified and do some other error checking such as telling the user that the file is not allowed, etc. As of right now, any file is valid
                and there is some "ductape" javascript checking and rendering the images, such as in UserBox.js and UserDetail.js (these are the two components that would show the image).
            </p>

            <p>
                There is a mix of qualified URLs as well as ones that are hosted on the server, but mostly qualified URls. The image upload is also buggy in that it doens't always upload the image
                and I have to check whether it has been or not.
            </p>

            <h5>Reusability</h5>
            <p>The reusability of a lot of my components could definetely improve. For example, the Dropdown.js file that allows a user to pick a foreign key. Right now, many state variables must be
                passed in to communicate with the insert or edit component that is using it, in order for it to be used. Also it is currently specific to a specific API call and specific 
                information that gets returned. In a reusable component, I think that we could have a user pass a single API URL and the component does the rest of the work for the user. 
                This is something TBD and I would like to try before the end of the semester (as I am writing this we are wrapping things up).
            </p>

            <p>
                Also 
            </p>

            <h4>Links</h4>
            <div style={{display: 'flex', flexDirection: 'column'}}>
            <a href="https://github.com/benjaminrittenhouse/CIS4282-tasks-crud">GitHub</a>
            
            <a href="http://cis-linux2.temple.edu/~sallyk/#/Node">Node JS Tutorial</a> from last semester with Bradley Dinger and I
            </div>
            

            </div>
        </div>
    )
}

export default Blog;