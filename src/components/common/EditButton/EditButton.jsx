import { Button } from '@mui/material'
import { useWindowResolution } from '../../../hooks/useWindowResolution';
import EditSquareIcon from '@mui/icons-material/EditSquare';

const EditButton = () => {
    const isMobile = useWindowResolution() < 900

    return (
        <Button 
            className='editButton'
            variant='contained'
            sx={{
                width: {
                    xs: '20px', 
                    md: 'auto',
                },
                gap: '.5rem',
                color: 'var(--color-secondary)',
                fontWeight: 600,
                fontSize: '12px',
                minWidth: '20px',
                textTransform: 'capitalize',
                boxShadow: 'none',
                border: '1px solid var(--color-light-gray)',
                borderRadius: '5px',
                backgroundColor: '#f1f1f1'
            }}
        >
            <EditSquareIcon sx={{color: 'var(--color-gray)'}}/> 
            {!isMobile && <span>Editar información</span>}
        </Button>
    )
}

export default EditButton