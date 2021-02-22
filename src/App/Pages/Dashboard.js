import React, {useEffect, useState} from "react"
import {Button, Container, Col, Row, ListGroup, InputGroup, FormControl} from "react-bootstrap"
import {useAuth} from "../Contexts/AuthContext"
import {Link, useHistory} from "react-router-dom"
import {BsFillPlusSquareFill, BsCheckBox, BsCheck, BsX} from "react-icons/bs";
import {postTodoToUser, updateTodoToUser} from '../Root/methods';
import firebase from "firebase";
import {SetTodos, DeleteTodos, UpdateTodos, AddTodos} from '../Redux/Actions/TodoActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


function Dashboard(props) {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    const [TodoValue, setTodoValue] = useState('')

    useEffect(() => {
        let uid = currentUser.uid
        firebase.database().ref('users').child(uid).once('value')
            .then((data) => {
                const newData = snapshotToArray(data)
                props.SetTodos(newData)
            })
            .catch((error) => {
                console.log(error)
            })
        console.log(props.todos)
    }, []);

    async function handleLogout() {
        setError("")
        try {
            await logout()
            history.push("/login")
        } catch {
            setError("  log Out Failed")
        }
    }

    function snapshotToArray(snapshot) {
        let returnArr = [];
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        return returnArr;
    };

    async function pushTodo() {
        if (TodoValue === '') {
            return
        }
        const todo = {todo: TodoValue, isDone: true}
        let uid = currentUser.uid
        await postTodoToUser(uid, todo)
        props.AddTodos(todo)
    }

    async function changeTodoState(data) { // UPDATE Edildiğinde snapshotToArray func. key oluşturamıyor.
        let uid = currentUser.uid
        /* await firebase.database().ref('users').child(uid).set({'isDone': !data.isDone, 'todo': `${data.todo}`}).then(res => console.log(res))*/
    }

    return (
        <>
            <Col className='col-md-12 justify-content-end text-right'>
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </Col>
            <Container>
                <Row className='mt-4'>
                    <Col md={{span: 5, offset: 4}}>
                        <InputGroup className="mb-3 border shadow-lg" style={{borderRadius: 10}}>
                            <FormControl
                                className='shadow-none'
                                placeholder="New Task .. "
                                size="lg"
                                aria-label="New Task"
                                style={{borderRadius: 10, border: 'none'}}
                                value={TodoValue}
                                onChange={e => setTodoValue(e.target.value)}
                            />

                            <InputGroup.Append>
                                <Button
                                    className=' shadow-none'
                                    variant=""
                                    size="lg"
                                    onClick={pushTodo}

                                >
                                    <BsFillPlusSquareFill size={30}/>
                                </Button>
                            </InputGroup.Append>

                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{span: 5, offset: 4}}>
                        <ListGroup>
                            {
                                props.todos ? props.todos.map(todo =>
                                    <ListGroup.Item style={{borderRadius: 10}} id={todo.key}>
                                        <div className='row justify-content-end align-items-center'>
                                            <div className='col-8'>
                                                <p style={{color: todo.isDone ? "black" : 'red'}}>{todo.todo}</p>
                                            </div>
                                            <div className='row d-flex col-4'>
                                                <BsCheck color={'green'} size={25}/>
                                                <BsX className='ml-3' color={'red'} onClick={() => changeTodoState(todo)} size={25}/>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                ) : null
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        SetTodos,
        DeleteTodos,
        UpdateTodos,
        AddTodos
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
