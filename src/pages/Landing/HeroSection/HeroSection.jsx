import { Link } from 'react-router-dom'
import './heroSection.scss'

const HeroSection = () => {
    return (
        <section id='hero'>
            <div className="container">
                <div className="hero-container">
                    <h1>Carga segura, Conexión Instantánea</h1>
                    <p>Unimos a quienes necesitan enviar con quienes saben transportar.</p>
                    <Link to="/signup" className="hero-button">
                        <button>Empezá a conectar</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HeroSection