import React, {useState, useEffect} from 'react';
import cake from '../photos/bars-art/cake.png'
import drinks from '../photos/bars-art/drinks.png'
import aisle from '../photos/bars-art/aisle.png'
import three from '../photos/transparent/three.png'
import five from '../photos/transparent/five.png'
import Modal from '../components/modal.jsx'
import { useNavigate } from 'react-router-dom';

const Dash = () => {
  const nav = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [todo, setTodo] = useState([])

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
      nav('/')
    } else {
      console.error('Failed to sign out');
    }
  } catch (err) {
    console.error('Error during sign out:', err);
  }
};

  return (
    <div>
      <h5>Welcome Back! </h5>
      <button className='sign' onClick={signOut}> Log Out </button> 
      <button className='sign' onClick={() => setOpenModal(true)}>Edit Profile</button>
    <Modal isOpen={openModal} onClose={() => setOpenModal(false)}> </Modal>

      <div className='main-desh'>
      <div className='todo-dash'> 
        {/* <div>  */}
        <p>To do list</p>
        <ul className='list-dash'>
          {todo.map((todos, id) => (
            <li key={id}> {todos.todo_title}</li>
          ))}
        </ul>
        </div>

        <div className='part-two'> 
        <div className='weather'> 
          <p> weather </p>
          <p>look more into getGeolocation() function to get coords and then place them into 
            https://open-meteo.com/en/docs?location_mode=csv_coordinates
          </p>
        </div>
                <img className='main-one' src={three}></img>

          <div className='proandbud'> 
            <div className='bud-bar'>
            <p>budget bar</p>
            <img id='cake' src={cake}></img>
            <p>maybe focus on creating the art for this</p>
          </div>
          <div className='progbar'> 
            <p> progress bar</p>
            <img id='drink' src={drinks}></img>
            <img id='aisle' src={aisle}></img>
            <p>maybe focus on creating the art for this</p>
          </div>
        </div>
      </div>
      </div>
       <img className='main-two' src={five}></img>
    </div>
  );
};

export default Dash;
