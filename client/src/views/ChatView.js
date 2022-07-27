import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";

function ChatView(props) {
  const [messages, setMessages] = useState([]);
  const pusherRef = useRef(null);
  const socketIdRef = useRef(null);

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

  //   useEffect(() => {
  //     // Call whenever participants change
  //     getRecentMessages();
  //   }, [props.senderId, props.groupId]);

  //   // Load previous messages from DB
  //   async function getRecentMessages() {
  //     try {
  //       let response = await axios.get(
  //         `/chat/${props.senderId}/${props.groupId}`
  //       );
  //       setMessages(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         let r = err.response;
  //         console.log(`Server error: ${r.status} ${r.statusText}`);
  //       } else {
  //         console.log(`Network error: ${err.message}`);
  //       }
  //     }
  //   }

  return (
    <div>
      <h1>chat</h1>
    </div>
  );
}

export default ChatView;
