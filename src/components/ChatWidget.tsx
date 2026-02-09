'use client';

import { useRef } from 'react';
// @ts-ignore
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

export const ChatWidget = () => {
  const tawkMessengerRef = useRef<any>(null);

  const onTawkLoad = () => {
    console.log('Tawk.to loaded');
  };

  return (
    <TawkMessengerReact
      propertyId="697b257df774291c39949bad"
      widgetId="1jg4gkt78"
      ref={tawkMessengerRef}
      onLoad={onTawkLoad}
      onBeforeLoad={() => console.log('Before load')}
      onStatusChange={(status: any) => console.log('Status changed', status)}
      onChatMessageSystem={(message: any) => console.log('System message', message)}
      onUnreadCountChanged={(count: any) => console.log('Unread count', count)}
      onChatMaximized={() => console.log('Chat maximized')}
      onChatMinimized={() => console.log('Chat minimized')}
      onChatHidden={() => console.log('Chat hidden')}
      onChatStarted={() => console.log('Chat started')}
      onChatEnded={() => console.log('Chat ended')}
    />
  );
};
