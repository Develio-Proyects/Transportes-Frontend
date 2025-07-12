import './informacion.scss'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const InformacionAdicional = ({viaje}) => {
    return (
        <section id='informacion' className="dv-section">
            <div className="dv-s-header">
                <div className="dv-s-header-title">
                    <ErrorOutlineIcon className='icon'/>
                    <h2>Información adicional</h2>
                </div>
            </div>
            <div className="i-type">
                <h3 className='subtitle'>Tipo de carga:</h3>
                <span>{viaje?.tipoDeCarga}</span>
            </div>
            <div className="i-type">
                <h3 className='subtitle'>Peso:</h3>
                <span>{viaje?.peso}kg</span>
            </div>
            <div className="i-type">
                <h3 className='subtitle'>Dimensiones:</h3>
                <div className="dimensiones">
                    Alto: {viaje?.dimensiones.alto}m <br/>
                    Largo: {viaje?.dimensiones.largo}m <br/>
                    Ancho: {viaje?.dimensiones.ancho}m
                </div>
            </div>
        </section>
    )
}

export default InformacionAdicional