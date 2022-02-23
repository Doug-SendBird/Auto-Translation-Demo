//import React, { useState, useCallback } from "react";
import React, { useState } from "react";
import {
  Channel as SBConversation,
  ChannelList as SBChannelList,
  ChannelSettings as SBChannelSettings,
  withSendBird
} from "sendbird-uikit";

import CustomizedMessageItem from "./CustomizedMessageItems/CustomizedMessageItem";

function CustomizedApp(props) {
  // props
  const {
    //stores: { sdkStore },
    config: { userId },
    customizedMessage
  } = props;

  // you can also use sendBirdSelectors.getSdk as in https://codesandbox.io/s/2-5-customizing-chatinput-wgi9d?file=/src/CustomizedMessageInput.js:3709-3756
  //const { sdk } = sdkStore;

  // useState
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  /* const onTranslateMessage = useCallback(
    message => () => {
      return new Promise((resolve, reject) => {
        const targetLanguages = ["es", "de"];
        sdk.GroupChannel.getChannel(currentChannelUrl).then(channel => {
          channel.translateUserMessage(
            message,
            targetLanguages,
            (userMessage, error) => {
              if (error) {
                console.warn(error);
                reject(error);
                return;
              }

              // you have to use your APPID and
              const esTranslatedMessage = userMessage.translations["es"]; // Spanish
              const deTranslatedMessage = userMessage.translations["de"]; // German

              resolve([esTranslatedMessage, deTranslatedMessage]);
            }
          );
        });
      });
    },
    [currentChannelUrl, sdk]
  );*/
  return (
    <div className="customized-app">
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <SBChannelList
            onChannelSelect={(channel) => {
              if (channel && channel.url) {
                setCurrentChannelUrl(channel.url);
              }
            }}
          />
        </div>
        <div className="sendbird-app__conversation-wrap">
          {customizedMessage ? (
            <SBConversation
              channelUrl={currentChannelUrl}
              onChatHeaderActionClick={() => {
                setShowSettings(true);
              }}
              renderChatItem={({
                message,
                onDeleteMessage,
                onUpdateMessage
                // onResendMessage
                // emojiContainer
              }) => (
                <CustomizedMessageItem
                  message={message}
                  onDeleteMessage={onDeleteMessage}
                  onUpdateMessage={onUpdateMessage}
                  userId={userId}
                />
              )}
            />
          ) : (
            <SBConversation
              channelUrl={currentChannelUrl}
              onChatHeaderActionClick={() => {
                setShowSettings(true);
              }}
            />
          )}
        </div>
        {showSettings && (
          <div className="sendbird-app__settingspanel-wrap">
            <SBChannelSettings
              channelUrl={currentChannelUrl}
              onCloseClick={() => {
                setShowSettings(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default withSendBird(CustomizedApp);
