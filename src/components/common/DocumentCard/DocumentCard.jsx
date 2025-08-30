import { useModal } from '../../../context/ModalContext'
import './documentCard.scss'
import { Button } from '@mui/material'

const DocumentCard = ({document}) => {
    const {openModal} = useModal()

    return (
        <article className='documentCard'>
            <div className="docData">
                <h3 className="docTitle">{document.name}</h3>
                <span className="status vigente">Vigente</span>
                <span className="expires">19 Junio de 2026</span>
            </div>
            <div className="docActions">
                <Button variant='contained' className='docBtn'>Editar</Button>
                <Button variant='contained' className='docBtn' onClick={()=>openModal("modalDocumentImage", {img: document.fileLink})}>Ver</Button>
            </div>
        </article>
    )
}

export default DocumentCard