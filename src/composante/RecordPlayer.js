import './recordPlayer.css';
import { Link } from 'react-router-dom';
import AnimatedPage from './AnimatedPage';
import ChansonsVedettes from './ChansonsVedettes';







const RecordPlayer = () => {
    return (
        <>

            <AnimatedPage>
                <h1>Accueil</h1>
                <div className='container-accueil'>
                    <div className="img-accueil"><img src="https://cdn.pixabay.com/photo/2023/02/14/23/57/sunset-7790623_960_720.jpg" alt="img" /></div>
                    <div className='text-accueil'>
                        <p>Bienvenue dans LofiTunes, l'application web ultime pour les amateurs de musique lofi ! Si vous êtes passionné par les rythmes apaisants et les mélodies relaxantes du lofi, alors vous êtes au bon endroit.</p>
                        <Link to="/musiques"><button className='btn'>Gérer mes musiques</button></Link>
                    </div>
                </div>
                <div className="chansonsVedettes">
                    <ChansonsVedettes />
                </div>
            </AnimatedPage>

        </>
    )
}

export default RecordPlayer;