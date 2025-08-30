import { Box } from "@mui/material"

const ModalDocumentImage = ({ img }) => {
    return (
        <Box
            component="img"
            src={img}
            alt={"Documento"}
            sx={{
                width: "calc(100vw - 2rem)",
                maxWidth: "1024px",
                maxHeight: "80vh",
                borderRadius: "5px",
                objectFit: "contain",
                display: "block",
                margin: "0 auto"
            }}
        />
    )
}

export default ModalDocumentImage