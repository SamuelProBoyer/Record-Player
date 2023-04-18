import './recordPlayer.css';
import Header from './Header';
import Footer from './Footer';
import { db } from '../config/firebase';






const RecordPlayer = () => {
    console.log(db);
    return (
        <>
            {/* <Header /> */}
            <ul className="container">
                <li className="item">
                    <img
                        className="playlist-image"
                        src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                        alt="lofi"
                    />
                    <h3 className="playlist-name">Chanson 1</h3>
                </li>
                <li className="item">
                    <img
                        className="playlist-image"
                        src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                        alt="lofi"
                    />
                    <h3 className="playlist-name">Chanson 1</h3>
                </li>
                <li className="item">
                    <img
                        className="playlist-image"
                        src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                        alt="lofi"
                    />
                    <h3 className="playlist-name">Chanson 1</h3>
                </li>
                <li className="item">
                    <img
                        className="playlist-image"
                        src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                        alt="lofi"
                    />
                    <h3 className="playlist-name">Chanson 1</h3>
                </li>
                <li className="item">
                    <img
                        className="playlist-image"
                        src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                        alt="lofi"
                    />
                    <h3 className="playlist-name">Chanson 1</h3>
                </li>
                <li className="item">
                    <img
                        className="playlist-image"
                        src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                        alt="lofi"
                    />
                    <h3 className="playlist-name">Chanson 1</h3>
                </li>
                <li className="item">
                    <img
                        className="playlist-image"
                        src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                        alt="lofi"
                    />
                    <h3 className="playlist-name">Chanson 1</h3>
                </li>
                <li className="item">
                    <img
                        className="playlist-image"
                        src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                        alt="lofi"
                    />
                    <h3 className="playlist-name">Chanson 1</h3>
                </li>
                <li className="item">
                    <img
                        className="playlist-image"
                        src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                        alt="lofi"
                    />
                    <h3 className="playlist-name">Chanson 1</h3>
                </li>
                <li className="item">
                    <img
                        className="playlist-image"
                        src="https://cdn.pixabay.com/photo/2022/10/17/01/21/chill-7526430_1280.jpg"
                        alt="lofi"
                    />
                    <h3 className="playlist-name">Chanson 1</h3>
                </li>
            </ul>

            {/* <Footer/> */}
        </>
    )
}

export default RecordPlayer;