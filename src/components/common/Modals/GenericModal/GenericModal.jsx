import { Box, Fade, Modal } from "@mui/material"
import Backdrop from '@mui/material/Backdrop'
import { useModalStore } from "../../../../store/modalStore"
import FilterModal from "../FilterModal"
import SortModal from "../SortModal"

const GenericModal = () => {
    const { modal, closeModal } = useModalStore()
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    if (!modal) return null

    const renderContent = () => {
        switch (modal.type) {
            case "filter":
                return <FilterModal {...modal.props}/>;
            case "sort":
                return <SortModal {...modal.props}/>;
            default:
                return null;
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={closeModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    {renderContent()}
                </Box>
            </Fade>
        </Modal>
    )
}

export default GenericModal