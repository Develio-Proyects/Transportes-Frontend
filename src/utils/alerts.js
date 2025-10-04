import Swal from 'sweetalert2'

export const alerta = (title, msg, icon) => {
    return Swal.fire({
        title: title,
        text: msg,
        icon: icon,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#FFC500',
        ...(icon === 'success' && { timer: 1500, showConfirmButton: false })
    })
}