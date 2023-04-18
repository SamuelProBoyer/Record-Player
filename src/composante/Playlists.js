import "./playlists.css";


const Playlists = () => {
    return (
        <>
        <h1 className="playlists-title">Mes playlists</h1>
        <ul className="container-playlists">
          <li className="item">
            <img
              className="playlist-image"
              src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
              alt="lofi"
            />
            <h3 className="playlist-name">Playlist 1</h3>
          </li>
          <li className="item">
            <img
              className="playlist-image"
              src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
              alt="lofi"
            />
            <h3 className="playlist-name">Playlist 1</h3>
          </li>
          <li className="item">
            <img
              className="playlist-image"
              src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
              alt="lofi"
            />
            <h3 className="playlist-name">Playlist 1</h3>
          </li>
        </ul>
      </>
    );
}

export default Playlists;