import React, { useState } from "react";

import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  Typography
} from "@material-ui/core";

import "./index.css";

export function getClassName(direction, classname) {
  return direction + "-" + classname;
}
export default function UserMessage(props) {
  // props
  const { message, userId, onDeleteMessage, onUpdateMessage } = props;

  const isByMe = message.sender.userId === userId;
  //console.log(message.sender.userId + ' ' + userId + ' ' + isByMe);
  const isByMeClassName = isByMe ? "outgoing" : "incoming";
  const contentClass = isByMeClassName + "-message-content";
  const leftClass = isByMeClassName + "-message-content__left";
  const middleClass = isByMeClassName + "-message-content__middle";
  const rightClass = isByMeClassName + "-message-content__right";
  return (
    <div className={contentClass}>
      <div className={leftClass}></div>
      <div className={middleClass}>
        <Card 
          className={middleClass}
          style={
            isByMe
              ? { backgroundColor: "#742ddd", color: "white" }
              : { backgroundColor: "#eeeeee", color: "black" }
          }
        >
          <CardHeader
            avatar={
              message.sender ? (
                <Avatar alt="Us" src={message.sender.profileUrl} />
              ) : (
                <Avatar className="user-message__avatar">Us</Avatar>
              )
            }
            title={
              message.sender
                ? message.sender.nickname || message.sender.userId
                : "(No name)"
            }
            subheader="User Message"
          />
          <CardContent>
            <Typography variant="body2" component="p">
              Original: {message.message}
            </Typography>
            <Typography variant="body2" component="p">
              en: {message.translations["en"]}
            </Typography>
            <Typography variant="body2" component="p">
              es: {message.translations["es"]}
            </Typography>
            <Typography variant="body2" component="p">
              de: {message.translations["de"]}
            </Typography>
          </CardContent>
          {message.sender && message.sender.userId === userId && (
            <CardActions></CardActions>
          )}
        </Card>
      </div>
      <div className={rightClass}></div>
    </div>
  );
}
