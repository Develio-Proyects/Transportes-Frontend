import Swal from 'sweetalert2'

export const alert = (title, msg, icon) => {
    return Swal.fire({
        title: title,
        text: msg,
        icon: icon,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#FFC500'
    })
}