import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";

function ChatView(props) {
  const [messages, setMessages] = useState([]); // useState 1
  const [text, setText] = useState(""); // useState 2
  const pusherRef = useRef(null);
  const socketIdRef = useRef(null);
  let listDiv = useRef(null);

  // Connect to Pusher; called once, when component mounts
  useEffect(() => {
    Pusher.logToConsole = true; // very useful for debugging!

    // Establish connection with Pusher
    // pusherKey is stored in client's .env file
    let pusherKey = process.env.REACT_APP_PUSHER_KEY;
    let options = { cluster: "eu", forceTLS: true };
    pusherRef.current = new Pusher(pusherKey, options);

    // Save socket ID; we send it to server so we don't get sent our own messages
    pusherRef.current.connection.bind("connected", () => {
      socketIdRef.current = pusherRef.current.connection.socket_id;
    });

    // Cleanup function: Disconnect when component unmounts
    return () => {
      pusherRef.current.disconnect();
    };
  }, []);

  // Subscribe to a channel; called whenever participants change
  useEffect(() => {
    // Return immediately if sender/receiver are the same
    if (props.senderId === props.groupId) {
      return;
    }

    // Create channel name from sender/receiver IDs
    // Something like: 'channel-1-2'

    let channelName = "channel-" + props.groupId;

    // Subscribe to channel
    let channel = pusherRef.current.subscribe(channelName);

    // Listen for messages broadcast on channel
    channel.bind("message", function (msg) {
      setMessages((messages) => [...messages, msg]);
    });

    // Cleanup function: Unsubscribe when participant changes
    return () => {
      pusherRef.current.unsubscribe(channelName);
    };
  }, [props.senderId, props.groupId]);

  useEffect(() => {
    // Call whenever participants change
    getRecentMessages();
  }, [props.senderId, props.groupId]);

  // Load previous messages from DB
  async function getRecentMessages() {
    let options = {
      method: "GET",
    };

    try {
      let response = await fetch(`/chat/${props.groupId}`, options);

      if (response.ok) {
        let data = await response.json();
        setMessages(data);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      if (err.response) {
        let r = err.response;
        console.log(`Server error: ${r.status} ${r.statusText}`);
      } else {
        console.log(`Network error: ${err.message}`);
      }
    }
  }

  // POST user-entered text to server as message
  async function sendMessage(text) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, socketId: socketIdRef.current }),
    };

    try {
      // Send text and socketId to our server
      let response = await fetch(
        `/chat/${props.groupId}/${props.senderId}`,
        options
      );

      // Server responds with "complete" msg (including ID and date/time)
      if (response.ok) {
        let completeMsg = await response.json();
        setMessages((messages) => [...messages, completeMsg]);
      } else {
        console.log(`server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      if (err.response) {
        let r = err.response;
        console.log(`Server error: ${r.status} ${r.statusText}`);
      } else {
        console.log(`Network error: ${err.message}`);
      }
    }
  }

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(text);
    setText("");
  }

  // When new msg is added, scroll if necessary so it's visible
  useEffect(() => {
    let lastPara = listDiv.current.lastElementChild;
    if (lastPara) {
      lastPara.scrollIntoView(false);
    }
  }, [props.messages]);

  function formatDT(dt) {
    return new Date(dt).toLocaleString();
  }

  return (
    <div>
      <h1>chat</h1>
      <div className="ChatList rounded mb-1" ref={listDiv}>
        {messages.map((m) => (
          <p
            key={m.id}
            className={m.senderId !== props.receiverId ? "sender" : "receiver"}
          >
            <span title={formatDT(m.dateTime)}>{m.text}</span>
          </p>
        ))}
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            // className="form-control"
            name="text"
            value={text}
            onChange={handleChange}
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-send"
              viewBox="0 0 16 16"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatView;
