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
                <span>{viaje?.cargoType}</span>
            </div>
            <div className="i-type">
                <h3 className='subtitle'>Tipo de unidad:</h3>
                <span>{viaje?.unitType}</span>
            </div>
            <div className="i-type">
                <h3 className='subtitle'>Peso:</h3>
                <span>{viaje?.weight}kg</span>
            </div>
            <div className="i-type">
                <h3 className='subtitle'>Dimensiones:</h3>
                <div className="dimensiones">
                    Alto: {viaje?.dimensions.high}m <br/>
                    Largo: {viaje?.dimensions.width}m <br/>
                    Ancho: {viaje?.dimensions.long}m
                </div>
            </div>
            {viaje?.observations &&
                <div className="i-type">
                    <h3 className='subtitle'>Observaciones:</h3>
                    <span>{viaje?.observations}</span>
                </div>
            }
        </section>
    )
}

export default InformacionAdicional