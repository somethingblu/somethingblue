import React from "react";

const Modal  = ({isOpen, onClose}) =>{
    if (!isOpen){
        return null
    }

    // const editUser = async () => {
//   try {
//     const res = await fetch('/api/auth/logout', {
//       method: 'POST',
//       credentials: 'include',
//     });

//     if (res.ok) {
//       console.log('Signed out');
//       nav('/')
//     } else {
//       console.error('Failed to sign out');
//     }
//   } catch (err) {
//     console.error('Error during sign out:', err);
//   }
// }

return (
    <div>
    <div className="modal" onClick={onClose}> 
        <h3>Update Your Information</h3>
         <form className="form-card" >
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          className="login-input"
        //   value={name}
        //   onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="login-input"
        //   value={email}
        //   onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="login-input"
        //   value={password}
        //   onChange={handleChange}
          required
        />
        <input
          type="number"
          name="budget"
          placeholder="Enter budget"
          className="login-input"
        //   value={budget}
        //   onChange={handleChange}
        />
        <input
          type="date"
          name="wedding_date"
          className="login-input"
        //   value={weddingDate}
        //   onChange={handleChange}
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    <button className="sign" onClick={onClose}>Close</button>
    </div>
    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
    </div>
    </div>
)
}

export default Modal;