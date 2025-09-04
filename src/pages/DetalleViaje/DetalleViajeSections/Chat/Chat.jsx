import './chat.scss'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useEffect, useState, useRef } from 'react'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import Message from '../../../../components/common/Message/Message'
import ChatIcon from '@mui/icons-material/Chat';
import { useAuth } from '../../../../context/AuthContext'
import { getChats } from '../../../../api/services/chatService'

const Chat = ({ id }) => {
    const [mensaje, setMensaje] = useState("")
    const [mensajes, setMensajes] = useState([])
    const {user} = useAuth()
    const msgContainerRef = useRef(null)
    
    const stompClient = useRef(null)

    const getConversation = async () => {
        const response = await getChats(id)
        if(response.status == 200){
            setMensajes(response.data || [])
        }
    }

    useEffect(() => {
        const socket = new SockJS(import.meta.env.VITE_API_URL + "/ws-chat", null, {
            withCredentials: true,
        })

        getConversation()

        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Conectado a WebSocket")
                client.subscribe(`/topic/chat/trip/${id}`, (msg) => {
                    const body = JSON.parse(msg.body)
                    setMensajes((prev) => [...prev, body])
                })
            },
            onStompError: (frame) => {
                console.error("Error en STOMP: ", frame)
            },
        })

        client.activate()
        stompClient.current = client

        return () => client.deactivate()
    }, [id])

    useEffect(() => {
        if (msgContainerRef.current) {
        msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight
        }
    }, [mensajes])

    const enviarMensaje = () => {
        if (mensaje.trim() === "" || !stompClient.current?.connected) return

        const msgObj = {
            transmitterId: user?.id, 
            message: mensaje    
        }

        stompClient.current.publish({
            destination: `/app/chat.send.${id}`,
            body: JSON.stringify(msgObj),
        })

        setMensaje("")
    }

    return (
        <section id="chat" className="dv-section">
            <div className="dv-s-header">
                <div className="dv-s-header-title">
                    <ChatIcon className='icon'/>
                    <h2>Chat</h2>
                </div>
            </div>
            <div className="msg-container" ref={msgContainerRef}>
                {mensajes.map((m, i) => (
                    <Message key={i} msg={m} isOwn={user?.id == m.transmitterId}/>
                ))}
            </div>
            <div className="chat-controls">
                <input
                    type="text"
                    className="msg-input"
                    placeholder="Escribe un mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
                />
                <Button
                    variant="contained"
                    className="send-msg-btn"
                    onClick={enviarMensaje}
                >
                    <SendIcon />
                </Button>
            </div>
        </section>
    )
}

export default Chat