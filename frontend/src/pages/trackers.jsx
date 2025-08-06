import React from 'react'
import twe from '../photos/transparent/twe.png'
import nty from '../photos/transparent/nty.png'
import Playlist from '../components/playlist'
import Gift from '../components/gift'

const Trackers = () =>{
    
    return (
        <div className='overall-lists'>
            <img src={twe} className="main-two" />
            <img src={nty} className="main-one" />
            <Playlist />
            <Gift />
        </div>
    )
}

export default Trackers