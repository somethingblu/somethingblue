import React, {useState, useEffect}  from 'react'

const Countdown = () => {
let [time, setTime] = useState(null)
let [ann, setAnn] = useState(null)

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
      if (user.wedding_date) {
        setTime(new Date (user.wedding_date).getTime());
        console.log(user.wedding_date)
      }
    })
    .catch(err => {
      console.error('Error fetching user info', err);
    });
}, [])
    // let countDown = new Date('November 11, 2025').getTime()

useEffect(() => {

    let x = setInterval(() => {
        let now = new Date().getTime()

        let distance = time - now

        if (distance < 0){
            clearInterval(x)
            setAnn(`It's time!`)
        } else {
            let days = Math.floor(distance / (1000 * 60 * 60 * 24))
            setAnn(days)
        }
    }, 1000)

    return () => clearInterval(x)
}, [time])
    
return (
    <div className='countdown'>
        <div>
            <h1>Days Until the Big Day:</h1>
        </div>
        <div>
            <h1>{ann}</h1>
        </div>
    </div>
)}

export default Countdown