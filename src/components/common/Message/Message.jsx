import './message.scss'

const Message = ({msg, isOwn}) => {
    const getTime = () => {
        const fecha = msg?.time ? new Date(msg?.time) : new Date()

        return  fecha.toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        })
    }

    return (
        <div className={`msg ${isOwn? "own" : "other"}`}>
            <div className="cover">
                <span className='msg-text'>{msg.message}</span>
                <span className="time">{getTime()}</span>
            </div>
        </div>
    )
}

export default Message