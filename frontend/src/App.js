import React from 'react'
import logo from './logo.svg';
import './App.css';
import ProjectList from './components/ProjectList.js'
import TodoList from './components/TodoList.js'
import UserList from './components/UserList.js'
import ProjectTodoList from './components/ProjectTodoList.js'
import ProjectUserList from './components/ProjectUserList.js'
import axios from 'axios'
import {HashRouter, BrowserRouter, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom'


const NotFound = () => {
    let location = useLocation()
    return (
        <div> Page {location.pathname} not found </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'projects': [],
            'todos': [],
            'users': []
        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data

                this.setState({
                    'projects': projects
                })
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/todos/')
            .then(response => {
                const todos = response.data

                this.setState({
                    'todos': todos
                })
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data

                this.setState({
                    'users': users
                })
            })
            .catch(error => console.log(error))
    }
//                        http://localhost:3000/#/todos

    render () {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <li><Link to='/'>Projects</Link></li>
                        <li><Link to='/todos'>Todos</Link></li>
                        <li><Link to='/users'>Users</Link></li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element = {<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todos' element = {<TodoList todos={this.state.todos} />} />
                        <Route exact path='/users' element = {<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element = {<Navigate to='/' />} />
                        <Route path='/project/:id' element = {<ProjectTodoList todos={this.state.todos} />} />
                        <Route path='/user/:id' element = {<ProjectUserList projects={this.state.projects} />} />
                        <Route path="*" element = {<NotFound />} />
                    </Routes>

                </BrowserRouter>
            </div>
        )
    }
}

export default App;