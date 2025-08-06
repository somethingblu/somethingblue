import React, {useState, useEffect} from 'react';
import three from '../photos/transparent/three.png'
import five from '../photos/transparent/five.png'
import Modal from '../components/modal.jsx'
import Countdown from '../components/countdown.jsx';
import Weather from '../components/weather.jsx'
import Bud from '../components/budget.jsx'
import Prog from '../components/progress.jsx'
import { useContext } from 'react';
import CurrentUserContext from '../context/current-user-context';
import { useNavigate } from 'react-router-dom';

const Dash = () => {
  const nav = useNavigate()
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [openModal, setOpenModal] = useState(false)
  const [todo, setTodo] = useState([])
  let [name, setName] = useState('')

  useEffect (() => {
  
      fetch('http://localhost:8080/api/auth/me', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
      })
      .then(user => {
        if (user.name) {
          setName(user.name)
          console.log(user.name)
        }
      })
      .catch(err => {
        console.error('Error fetching user info', err);
      });
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/todos', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok)
        throw new Error('Failed to get todo')
        return res.json()
      })
      .then((data) => {
        setTodo(data)
      })
      .catch((err)  => console.error(err))
  }, [])

  const signOut = async () => {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (res.ok) {
      console.log('Signed out');
      setCurrentUser(null)
      nav('/')
    } else {
      console.error('Failed to sign out');
    }
  } catch (err) {
    console.error('Error during sign out:', err);
  }
};

const redirecting = () => {
    nav('/todo')
}

  return (
    <div>
      <div className='welcome-con'>
      <h5>Welcome Back {name}! </h5>
      <div className='welcome-butt'>
      <button className='sign' onClick={signOut}> Log Out </button> 
      <button className='sign' onClick={() => setOpenModal(true)}>Edit Profile</button>
      </div>
      </div> 
    <Modal isOpen={openModal} onClose={() => setOpenModal(false)}> </Modal>
      <div className='main-desh'>
      <div className='todo-dash'> 
        <p>To do list</p>
        <ul className='list-dash'>
          {todo.map((todos, id) => (
            <li key={id}> {todos.todo_title}</li>
          ))}
        </ul>
        <button className='todo-button' onClick={redirecting}>click here to add new todo</button>
        </div>

        <div className='part-two'>
          <Countdown /> 
                <img className='main-one' src={three}></img>
          <div className='proandbud'> 
            <div className='bud-bar'>
            <Bud />
          </div>
          <div className='progbar'> 
            <Prog />
          </div>
        </div>
      </div>
      <div className='weather'> 
          <Weather />
        </div>
      </div>
       <img className='main-two' src={five}></img>
    </div>
  );
};

export default Dash;
