import "../style/spaPage.css"

function Blog() {
    return (
        <div className = "spaPage">
            <h2 className = "headerText">Blog</h2>
            
            <div>
            <h4>Description</h4>
            The Task Manager system allows you to manage a database of users and tasks. This can be useful for companies to assign tasks to users and see which user is working on a specific task. Tasks can be categorized to be more specific, and can also be assigned a date and completion date. The creation of a task allows for text file uploads for large descriptions. Both the users and the tasks have their own pages for viewing all of the items in list view, and viewing a more detailed expanded view by clicking on an item. The user can delete, add, update, or create records for both the tasks and the user list.

            <h4>What I Learned</h4>
            <p>
            This project was created using <a href="https://react.dev/">React JS</a>. One of the interesting libraries I used was material UI for React, or <a href="https://mui.com/">MUI</a>. I like this library because it provides easy and flexible components and icons for designing a clean looking UI. It is not used throughout the entire project, but for example, the detailed view of users and tasks, such as their description or picture, were created using an MUI <a href="https://mui.com/material-ui/react-card/">“card”</a> component that allows for information cards to be populated and styled nicely with little or no extra CSS.
            </p>

            <p>
            One of the most interesting aspects of React JS that I learned was passing state and prop variables. A parent component can create state variables which the React UI will listen to and updated based on if the variables change. However these state variables are only mutable by the parent. When they are passed to a child, they are considered “props” that are read only by the child. What is interesting though, is when we need a child to mutate something. We can simply pass a function to it as another prop, but a “callable” one. This stack overflow link describes it nicely: <a href="https://stackoverflow.com/questions/27991366/what-is-the-difference-between-state-and-props-in-react">Link</a>
            </p>

            <h4>Next Steps</h4>
            <p>
            In the next phase of development for this project, goal implementations would be a report writer. This would allow an administrator or someone with the right privileges to grab specific attributes and information about tasks and users and create a report about it. For example, they may like to grab the Names and Descriptions of all tasks, only created by the following users: Sally, Ben, Brad. The report writer would then grab this info and display it nicely in a similar manner to the “detailed view” of users and tasks. An interesting idea would to be able to write multiple reports and compare them side by side. 
            </p>
            
            <p>Another idea would be an admin portal that allows a user with specific privileges to log in and do things a non-admin cannot. For example admins can write reports but basic users cannot. Their could also be an extremely low level tier where the user logged in can only see the tasks and users but cannot edit or create any.
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