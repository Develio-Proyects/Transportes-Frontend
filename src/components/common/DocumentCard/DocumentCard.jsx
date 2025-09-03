import './documentCard.scss'
import { useModal } from '../../../context/ModalContext'
import { Button } from '@mui/material'

const DocumentCard = ({document, employees, refresh}) => {
    const {openModal} = useModal()
    
    return (
        <article className='documentCard'>
            <div className="docData">
                <h3 className="docTitle">{document.documentName}</h3>
                <span className="status vigente">Vigente</span>
                <span className="expires">19 Junio de 2026</span>
            </div>
            <div className="docActions">
                <Button 
                    variant='contained' 
                    className='docBtn' 
                    onClick={()=>openModal("modalDocument", {
                        document: document, 
                        employees: employees, 
                        refresh: refresh
                    })}
                >
                    Editar
                </Button>
                <Button 
                    variant='contained' 
                    className='docBtn' 
                    onClick={()=>openModal("modalDocumentImage", {
                        img: document.fileLink
                    })}
                >
                    Ver
                </Button>
            </div>
        </article>
    )
}

export default DocumentCard