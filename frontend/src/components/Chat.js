import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"

function Chat() {

    const [ message, setMessage ] = useState("")
    const [ userName, setUserName ] = useState("random")
	const [ chat, setChat ] = useState([])

	const socketRef = useRef()

	useEffect(
		() => {
			socketRef.current = io.connect("/")
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)


	const onMessageSubmit = (e) => {
		socketRef.current.emit("message", { userName, message })
		e.preventDefault()
		// setState({ message: "", name })
        setMessage(message)
        setUserName(userName)
	}

    const renderChat = () => {
		return chat.map(({ name, message }, index) => (
                      <div className="card">
                      <div className="card-body rounded-3 bg-secondary">
                        <h4 className="card-title">{name}</h4>
                        <p className="card-text">
                         {message}
                        </p>
                      </div>
                    </div>
		))
	}
    return (
        <div className="container mt-3">
        <div
          style={{
            height: "50vh",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column-reverse"
          }}
        >
            {renderChat}
        </div>
        <div className="mt-3">
          <div className="input-group">
            <input className="form-control" type="text" value={message}  onChange={(e) => setMessage(e.target.value)} placeholder="Enter your message"/><button
              className="btn btn-primary"
              type="button" onClick={onMessageSubmit}
            >
              send
            </button>
          </div>
        </div>
      </div>
    )
}

export default Chat
