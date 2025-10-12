import { Box, Modal, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useModal } from "../../../context/ModalContext"
import ModalPayment from "./ModalPayment/ModalPayment"
import ModalDocumentImage from "./ModalDocumentImage/ModalDocumentImage"
import ModalTrip from "./ModalTrip/ModalTrip"
import ModalTruck from "./ModalTruck/ModalTruck"
import ModalDocument from "./ModalDocument/ModalDocument"
import ModalPassword from "./ModalPassword/ModalPassword"
import ModalEmployee from "./ModalEmployee/ModalEmployee"

const MODAL_COMPONENTS = {
    modalDocumentImage: ModalDocumentImage,
    modalPayment: ModalPayment,
    modalTrip: ModalTrip,
    modalTruck: ModalTruck,
    modalDocument: ModalDocument,
    modalPassword: ModalPassword,
    modalEmployee: ModalEmployee
}

export const ModalContainer = () => {
    const { modalName, modalProps, closeModal } = useModal()
    const ModalComponent = modalName ? MODAL_COMPONENTS[modalName] : null

    return (
        <Modal
            open={!!modalName}
            onClose={closeModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            disableEnforceFocus={true}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    borderRadius: '5px',
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000
                }}
            >
                <IconButton
                    onClick={closeModal}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: 'black',
                        zIndex: 1001
                    }}
                    aria-label="Cerrar"
                >
                    <CloseIcon />
                </IconButton>
                {ModalComponent && <ModalComponent {...modalProps} />}
            </Box>
        </Modal>
    )
}