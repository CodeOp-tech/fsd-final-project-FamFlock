import React, { useEffect, useRef, useState } from "react";
import ChatListCss from "./ChatList.css";
import BothUnfilled from "./reactions/BothUnfilled";
import ThumbDownFilled from "./reactions/ThumbDownFilled";
import ThumbUpFilled from "./reactions/ThumbUpFilled";

function ChatList(props) {
  let listDiv = useRef(null);

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

  function reactionClick(reaction, messageId) {
    const result = props.newReactionCb(reaction, props.user.id, messageId);
    console.log(reaction, messageId);
  }

  function showReaction(message) {
    for (let j = 0; j < props.reactions.length; j++) {
      // console.log(props.reactions[j]);
      if (message.id === props.reactions[j].FK_message_id) {
        console.log(props.reactions[j].reaction);
        if (props.user.id === props.reactions[j].FK_user_id) {
          console.log("passed", message.id);
          if (props.reactions[j].reaction === 0) {
            return (
              <ThumbDownFilled
                message={message.id}
                thumbsDownCount={message.thumbsDownCount}
                thumbsUpCount={message.thumbsUpCount}
                reactionClickCb={() =>
                  reactionClick(props.reactions[j].reaction, message.id)
                }
              />
            );
          } else if (props.reactions[j].reaction === 1) {
            return (
              <ThumbUpFilled
                messageId={message.id}
                thumbsDownCount={message.thumbsDownCount}
                thumbsUpCount={message.thumbsUpCount}
                reactionClickCb={() =>
                  reactionClick(props.reactions[j].reaction, message.id)
                }
              />
            );
          }
        } else {
          console.log("else");
          return (
            <BothUnfilled
              messageId={message.id}
              thumbsDownCount={message.thumbsDownCount}
              thumbsUpCount={message.thumbsUpCount}
              reactionClickCb={() =>
                reactionClick(props.reactions[j].reaction, message.id)
              }
            />
          );
        }
      }
    }
  }

  if (
    props.messages.length === 0 ||
    props.reactions.length === 0 ||
    props.users.length === 0
  ) {
    return "loading ";
  }

  return (
    <div className="chatList" ref={listDiv}>
      {props.messages.map((m) => (
        <div key={m.id}>
          {m.senderId === props.user.id ? (
            <div>
              <div key={m.id} className="sender">
                <span title={formatDT(m.dateTime)}>{m.text}</span>
                {showReaction(m)}
              </div>
            </div>
          ) : (
            <div key={m.id}>
              <div className="receiver">
                {props.users.map((user) =>
                  user.id === m.senderId ? (
                    <div key={user.id}>{user.fullname}</div>
                  ) : (
                    <div key={user.id}></div>
                  )
                )}

                <span title={formatDT(m.dateTime)}>{m.text}</span>
                {showReaction(m)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatList;
