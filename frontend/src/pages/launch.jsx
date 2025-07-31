import { useNavigate } from 'react-router-dom'
import Login from './login'
import one from '../photos/transparent/one.png'
import two from '../photos/transparent/two.png'

function Home() {
  // using the Navigation hook hehe ^.^
  const nav = useNavigate()

  //making our on click function 
  const handleClick  = () => {
    // we are navigating to this page 
    // its not working rn so i need to figure this out 
      nav('/login')
  }

  return (
    <>
    <div className="home-main">
      <img className='main-two' src={two}></img>
     <h1 id='main-name'>Something Blue</h1>
     <p id='main-quote'>“You find Something Old, <br></br> Something New, Something Borrowed 
      and <br></br> we will handle Something Blue”</p>
      <img className='main-one' src={one}></img>

      <button className='main-butt' onClick={handleClick}>Start Here</button>
      </div>
    </>
  )
}

export default Home
