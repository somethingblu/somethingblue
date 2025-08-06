import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const nav = useNavigate();
      const handleClick  = () => { 
      nav('/')
  }
  return (
    <div>
      <div>
        <h1>
          404 - Page Not Found
        </h1>
        <p>
          Sorry, the page you're looking for doesn't exist.
        </p>
        <button  className='main-butt' onClick={handleClick}>Go back home</button>
      </div>
    </div>
  );
}