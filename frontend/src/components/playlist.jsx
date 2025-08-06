import React, {useEffect, useState} from 'react'

const Playlist = () =>{
    const [music, setMusic] = useState([])
    const [form, setForm] = useState({
      song_name: '',
      song_artist: '',
      song_link: ''
    })

      useEffect(() => {
        fetch('http://localhost:8080/api/playlist', {
          method: 'GET',
          credentials: 'include'
        })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch playlist');
          }
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            console.log(data)
            setMusic(data);
          } else {
            console.error('Invalid playlist format:', data);
            setMusic([]);
          }
        })
        .catch((err) => {
          console.error('Error fetching playlists:', err);
          setMusic([]);
        });
    }, []);

      const handleSubmit = async (e) => {
         e.preventDefault();

      if (!form.song_name) {
        return alert('Song name');
      }

      try {
        const res = await fetch('http://localhost:8080/api/playlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            song_name: form.song_name,
            song_artist: form.song_artist,
            song_link: form.song_link,
          }),
        });

        if (!res.ok) throw new Error('Failed to submit registry item');

        const newItem = await res.json();
        setMusic([...music, newItem]); 

        // Reset form
        setForm({ song_name: '',
      song_artist: '',
      song_link: ''
     });
      } catch (err) {
        console.error(err);
        alert('There was an error adding the item.');
      }
};

      const handleChange = (e) => {
         const { name, value } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
};

const handleDelete = async (id) => {
  try {
    await fetch(`http://localhost:8080/playlist/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    setMusic(music.filter((item) =>  item.id !== id));
  } catch (err) {
    console.error('Failed to delete item:', err);
  }
};

    return (
            <div className='playlist-section'>
  <h1>Add to your wedding list playlist:</h1>
            <div className="playlist-container">
  <form onSubmit={handleSubmit} className="playlist-form">
    <input
      className="playlist-input"
      value={form.song_name}
      name="song_name"
      placeholder="Song Name"
      onChange={handleChange}
    />
    <input
      className="playlist-input"
      value={form.song_artist}
      name="song_artist"
      placeholder="Song Artist"
      onChange={handleChange}
    />
    <input
      className="playlist-input"
      value={form.song_link}
      name="song_link"
      placeholder="Song Link"
      onChange={handleChange}
    />
    <button className="playlist-submit">Submit</button>
  </form>
</div>

                <h1>Current Playlist:</h1>
            <ul>
                {music.map((song, id) => (
                    <li key={id}>
                      {song.song_name} - {song.song_artist} {song.song_link}
                      <button onClick={() => handleDelete(song.id)}>X</button>
                     </li>
                ))}
            </ul>
            </div>
    )
}

export default Playlist