import { Button } from "@mui/material"

const PrimaryButton = ({children, onClick, style, size}) => {
    return (
        <Button 
            size={size}
            className="primary-btn"
            variant="contained"
            style={style}
            sx={{
                fontFamily: "'Inter', sans-serif;",
                fontWeight: 600,
                textTransform: 'none',
                borderRradius: "5px",
                color: "var(--color-secondary)",
                backgroundColor: "var(--color-primary)"
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}

export default PrimaryButton