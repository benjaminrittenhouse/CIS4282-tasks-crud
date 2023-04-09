import "../style/spaPage.css"

function Home() {
    return (
        <div className = "spaPage">
            <h4 className = "headerText">Welcome to Task Manager</h4>
            <p>
                Task Manager is a web application that allows you to create and manage tasks among a database of users. These tasks can be assigned to users and can be 
                given details such as date assigned or completion date. Task Manager can be used to keep track of who is assigned to what task, as well as create, read,
                update, and delete both records from the users of a company as well as records from the tasks list of a company. 
            </p>

            <h4 className = "headerText">Background</h4>
            <p>
                This web application was created as an independent study project under Professor Sally Kyvernitis at Temple University. There were 2 semesters put into it. 
                Last fall, Bradley Dinger made a great amount of contributions to the project. This spring, it is just I, Benjamin Rittenhouse, who worked on the project.
            </p>
        </div>
    )
}

export default Home;