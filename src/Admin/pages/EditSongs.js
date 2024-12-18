import React, { useState, useEffect, useRef } from "react";
import "../adminCss/editSong.css";

export default function EditSongs() {
  const [songs, setSongs] = useState([]);
  const [editingSong, setEditingSong] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    song_name: "",
    artist: "",
    duration: "",
    src: "",
    img: "",
  });
  const [newItemData, setNewItemData] = useState({
    song_name: "",
    artist: "",
    duration: "",
    src: "",
    img: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const audioRef = useRef(null);
  const phpUrl = "http://localhost/webdev/test-haru/music.php";

  // Fetch songs on component mount
  useEffect(() => {
    fetch(phpUrl)
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setNewItemData((prev) => ({ ...prev, [name]: value })); // Update newItemData too
  };

  // Handle file change for music and image
  const handleFileChange = (e, type) => {
    if (type === "music") {
      setFile(e.target.files[0]);
    } else if (type === "image") {
      setNewItemData((prev) => ({ ...prev, img: e.target.files[0] }));
    }
  };

  // Handle editing a song
  const handleEdit = (song) => {
    setEditingSong(song.id);
    setFormData(song);
  };

  // Save changes to a song
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(phpUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.status === "update success") {
        alert("Updated successfully!");
        setSongs((prev) =>
          prev.map((song) => (song.id === formData.id ? formData : song))
        );
        setEditingSong(null);
      } else {
        alert("Failed to update");
      }
    } catch (error) {
      console.error("Error updating song:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a song
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(phpUrl, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (result.status === "delete success") {
        alert("Deleted successfully!");
        setSongs((prev) => prev.filter((song) => song.id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting song:", error);
    } finally {
      setLoading(false);
    }
  };

  // Play song
  const handlePlaySong = (src) => {
    if (audioRef.current) {
      if (currentSong === src && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setCurrentSong(src);
        audioRef.current.src = `${phpUrl}/${encodeURIComponent(src)}`; // Ensure the correct path
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Stop song
  const handleStopSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentSong(null);
      setIsPlaying(false);
    }
  };

  // Handle song upload
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("song_name", formData.name);
      data.append("artist", formData.artist);
      data.append("duration", formData.duration);
      data.append("src", formData.src);
      data.append("img", formData.img);

      const response = await fetch(`${phpUrl}-upload.php`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("Song uploaded successfully!");
        setSongs((prev) => [...prev, result.newSong]); // Update songs without reload
      } else {
        alert("Failed to upload song");
      }
    } catch (error) {
      console.error("Error uploading song:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter songs based on search query
  const filteredSongs = songs.filter((song) => {
    // Ensure the song.name and song.artist are defined before calling toLowerCase
    const songName = song.name ? song.name.toLowerCase() : '';
    const artistName = song.artist ? song.artist.toLowerCase() : '';
    return songName.includes(searchQuery.toLowerCase()) || artistName.includes(searchQuery.toLowerCase());
  });

  // Handle adding a new item (song)
  const handleAddItem = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("song_name", newItemData.name);
      formDataToSend.append("artist", newItemData.artist);
      formDataToSend.append("duration", newItemData.duration);
      formDataToSend.append("src", file);
      formDataToSend.append("img", newItemData.img);
      
      const response = await fetch(
        "http://localhost/webdev/test-haru/song.php",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const result = await response.json();
      if (result.status === "insert success") {
        alert("Item added successfully");
        setSongs((prev) => [...prev, result.newItem]); // Update state without reload
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during fetch or parsing:", error);
    }
  };

  return (
    <div className="editItemContainer">
      <h1>Music List</h1>
      <div className="formSection">
        <input
          placeholder="Search by Song or Artist"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="formSection">
      <div className="d-flex col-2 upWrap">
        <label for="mp3">Upload mp3</label>
        <input
            type="file"
            onChange={(e) => handleFileChange(e, "music")}
            placeholder="src"
            className="show fileBtn"
            id="mp3"
        />
        </div>
        <div className="d-flex col-2 upWrap">
        <label for="songImg">Upload image</label>
        <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "image")}
            placeholder="img"
            className="show fileBtn"
            id="songImg"
        />
        </div>
  <input
    name="name"
    placeholder="Song Title"
    value={newItemData.name}
    onChange={handleInputChange}
  />
  <input
    name="artist"
    placeholder="Artist"
    type="text"
    value={newItemData.artist}
    onChange={handleInputChange}
  />
  <input
    name="duration"
    placeholder="Duration"
    type="number"
    value={newItemData.duration}
    onChange={handleInputChange}
  />
  <button onClick={handleAddItem}>Add Song</button>
</div>

      <div className="itemSection">
        {filteredSongs.length > 0 ? (
          <ul className="itemListSong">
            {filteredSongs.map((song) => (
              <li key={song.id} className="item">
                <img
                  src={`${process.env.PUBLIC_URL}/${song.img}`}
                  alt={song.name}
                />
                <div className="itemInfo">
                  {editingSong === song.id ? (
                    <>
                      <input
                        type="text"
                        name="song_name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Song Name"
                      />
                      <input
                        type="text"
                        name="artist"
                        value={formData.artist}
                        onChange={handleInputChange}
                        placeholder="Artist"
                      />
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="Duration"
                      />
                      <input
                        type="file"
                        name="img"
                        onChange={(e) => handleFileChange(e, "image")}
                      />
                      <button onClick={handleSave}>Save</button>
                      <button onClick={() => setEditingSong(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <p>Index: {song.id}</p>
                      <p>Title: {song.name}</p>
                      <p>Artist: {song.artist}</p>
                      <p>Duration: {song.duration}</p>
                      <div className="btnArea">
                        <button onClick={() => handleEdit(song)}>Edit</button>
                        <button onClick={() => handleDelete(song.id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
}
