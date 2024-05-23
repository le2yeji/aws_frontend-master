/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  SPDX-License-Identifier: MIT-0 
*/
import { ref } from 'vue';

type MessageType = 'alert-success' | 'alert-danger' | 'alert-warning' | 'alert-info';

// Hook used to set alert messages in UI
export default function useAlert() {
  const message = ref<string>('');
  const messageStyleType = ref<MessageType>('alert-success');

  function setMessage(msg: string, type: MessageType) {
    message.value = msg;
    messageStyleType.value = type;
  }

  return {
    message,
    messageStyleType,
    setMessage,
  };
}
