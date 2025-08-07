import me from '../photos/me.jpg'
import example from '../photos/example.jpeg'
import ten from '../photos/transparent/ten.png'
import eleven from '../photos/transparent/eleven.png'

function about() {

  return (
    <>
    <h5 className='about-head'>About Us</h5>

    <img className='main-one' src={ten}></img>
    <div className='about-main'>

    <div className='about-blue'>
        <p className='about-p'>The most beautiful and life changing day is someone’s wedding day. It has to be perfect. . . well it should be perfect.  
          There is so much planning that goes into a wedding. The cake, shoes, dresses; what flowers will we have? Where is the venue? 
          Will it be raining? There is so much to worry about when one is planning a wedding. ‘Something Blue’ is here to help out and 
          keep track of tasks that need to be done, wedding contractor information, and budgeting details. You just have to handle “Something Old, 
          Something New, Something Borrowed and we will handle Something Blue”</p>

          <img className='about-example'src={example}></img>
    </div>
      <img className='main-two' src={eleven}></img>
        <h3>Meet the Team</h3>
    <div className='about-me'> 
        <img id='me' src={me}></img>
        <p className='about-p'> Irma Barrios 
          <br>
          </br>
          Irma lives in Staten Island, New York, where she was 
          born and raised. She is 24 years old and is fully Mexican. Irma is a software engineer with a pbig passion with working on front end 
          and design. She has a associates degree in Video Arts and Tech which gives her knowledge in video editing, 
          tv production, script writing, photoshop and design. She hopes to work with a team that values 
          new ideas and creative outputs over everything else. 
        </p>
    </div>
    <div className='links'>
        <a href="https://www.linkedin.com/in/irmabarrios1" target='_blank'>LinkedIn</a>
        <br></br>
        <a href="https://www.clippings.me/irmab" target='_blank'>Clippings</a>
        </div>
    </div>
    </>
  )
}

export default about
