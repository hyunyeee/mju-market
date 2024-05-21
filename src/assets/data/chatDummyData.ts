export const chatDummyData = {
  chatRoomId: '1',
  participants: [
    {
      id: 'user1',
      name: 'John Doe',
    },
    {
      id: 'user2',
      name: 'Alice Johnson',
    },
  ],
  messages: [
    {
      senderId: 'user1',
      message: 'Hello Alice!',
      timestamp: '2024-05-18T14:00:00Z',
    },
    {
      senderId: 'user2',
      message: 'Hi John! How are you?',
      timestamp: '2024-05-18T14:01:00Z',
    },
    {
      senderId: 'user1',
      message: "I'm good, thanks. Are we still on for the meeting tomorrow?",
      timestamp: '2024-05-18T14:02:00Z',
    },
    {
      senderId: 'user2',
      message: 'Yes, looking forward to it.',
      timestamp: '2024-05-18T14:03:00Z',
    },
    {
      senderId: 'user1',
      message: 'Great! See you then.',
      timestamp: '2024-05-18T14:04:00Z',
    },
  ],
};
