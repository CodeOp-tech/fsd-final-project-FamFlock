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
  }

  function showReaction(message) {
    // Reactions for this message; can be []
    let msgReactions = props.reactions.filter(
      (r) => r.FK_message_id === message.id
    );
    // Reaction for the logged-in user; can be undefined
    let userReaction = msgReactions.find((r) => r.FK_user_id === props.user.id);

    if (!userReaction) {
      return (
        <BothUnfilled
          messageId={message.id}
          thumbsDownCount={message.thumbsDownCount}
          thumbsUpCount={message.thumbsUpCount}
          reactionClickCb={(reaction) => reactionClick(reaction, message.id)}
        />
      );
    } else if (userReaction.reaction === 1) {
      return (
        <ThumbUpFilled
          messageId={message.id}
          thumbsDownCount={message.thumbsDownCount}
          thumbsUpCount={message.thumbsUpCount}
          reactionClickCb={(reaction) => reactionClick(reaction, message.id)}
        />
      );
    } else {
      return (
        <ThumbDownFilled
          message={message.id}
          thumbsDownCount={message.thumbsDownCount}
          thumbsUpCount={message.thumbsUpCount}
          reactionClickCb={(reaction) => reactionClick(reaction, message.id)}
        />
      );
    }
  }

  if (!props.messages || !props.reactions) {
    return <h1>loading</h1>;
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
