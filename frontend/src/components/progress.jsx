import React,{useEffect, useState} from 'react'
import drinks from '../photos/bars-art/drinks.png'
import aisle from '../photos/bars-art/aisle.png'

const Prog = () => {
    const [total, setTotal] = useState([])
    let current = 0
    let done = 0

      useEffect(() => {
        fetch('http://localhost:8080/todos', {
          method: 'GET',
          credentials: 'include',
        })
          .then(res => res.json())
          .then(data => 
            setTotal(data)
          )
          }, [] )

     const finding = () => {
        for(let i=0; i < total.length; i++){
            if (total[i].status === 'finished'){
                done++
                current++
            } else {
                current++
            }
        }
     }

     finding()

    return (
        <div>
            <h1>Progress Bar</h1>
        <div className='progress-bar'>
            <div className='aisle-con'>
            <img src={drinks} id='drink' style={{ left: `${(done / current) * 100}%` }}></img>
            <img src={aisle} id='aisle'></img>
            </div>
            <p>{done}/{current} To Do's Done</p>
        </div>
</div>
    )

}

export default Prog;