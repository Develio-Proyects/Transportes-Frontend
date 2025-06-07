import { Button } from '@mui/material'

const IconButton = ({ children, Icon, onClick }) => {
    
    return (
        <Button variant="outlined" startIcon={<Icon />}
            onClick={onClick}
            sx={{
                border: 'none',
                color: 'var(--color-dark)',
                fontSize: 'clamp(12px, 4vw, 16px)',
                textTransform: 'none',
                '& .MuiButton-startIcon': {
                    '& svg': {
                        fontSize: '16px',
                    },
                },
            }}
        >
            {children}
        </Button>
    )
}

export default IconButton