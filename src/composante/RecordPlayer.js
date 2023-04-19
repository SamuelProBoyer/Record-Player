import './recordPlayer.css';
import { Link } from 'react-router-dom';
import AnimatedPage from './AnimatedPage';





const RecordPlayer = () => {

    // const [isPlaying, setIsPlaying] = useState(false);
    // const song = audioFile;
    // const audioRef = useRef(null);
    
    


    // // A changer pour handle le commencement des musiques. !!!
    // const handleClick = () => {
    //     const audioElement = audioRef.current;
    //     if(audioElement.paused) {
    //         audioElement.play();
    //     } else {
    //         audioElement.pause();
    //     }
    //     setIsPlaying(!isPlaying);
    // };


    // console.log(audio);
    return (
        <>

                <AnimatedPage>
                    <h1>Accueil</h1>
                    <div className='container-accueil'>
                        <div className="img-accueil"><img src="https://cdn.pixabay.com/photo/2023/02/14/23/57/sunset-7790623_960_720.jpg" alt="img" /></div>
                        <div className='text-accueil'>
                            <p>Bienvenue dans LofiTunes, l'application web ultime pour les amateurs de musique lofi ! Si vous êtes passionné par les rythmes apaisants et les mélodies relaxantes du lofi, alors vous êtes au bon endroit. Notre application vous permet de stocker et d'organiser facilement votre collection de musiques lofi préférées pour les écouter à tout moment, où que vous soyez.</p>
                            <Link to="/musiques"><button className='btn'>Gérer mes musiques</button></Link>
                        </div>
                    </div>
                </AnimatedPage>
           
        </>
    )
}

export default RecordPlayer;