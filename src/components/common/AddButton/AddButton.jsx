import AddIcon from '@mui/icons-material/Add';
import { useWindowResolution } from '../../../hooks/useWindowResolution';
import { Button } from '@mui/material';

const AddButton = ({name}) => {
    const isMobile = useWindowResolution() < 600

    return (
        <Button 
            className='addButton'
            variant='contained'
            sx={{
                width: {
                    xs: '20px', 
                    sm: 'auto',
                },
                gap: '.5rem',
                color: 'black',
                fontWeight: 600,
                fontSize: '12px',
                minWidth: '20px',
                maxWidth: '160px',
                height: '36px',
                textTransform: 'capitalize',
                borderRadius: '5px',
                backgroundColor: 'var(--color-primary)'
            }}
        >
            {
                isMobile ? (
                    <AddIcon sx={{color: 'black'}}/> 
                ) : (
                    <span>Agregar {name}</span>
                )
            }
        </Button>
    )
}

export default AddButton