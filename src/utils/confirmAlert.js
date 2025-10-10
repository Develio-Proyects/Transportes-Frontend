import Swal from 'sweetalert2'

export const confirmAlerta = async (title, msg, ) => {
    const result = await Swal.fire({
        title: title,
        text: msg,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#FFC500',
        cancelButtonColor: '#494949',
        reverseButtons: true
    })

    return result.isConfirmed
}