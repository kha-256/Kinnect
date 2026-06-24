import { Users } from "../../dummyData";

export const initialRecentSearches = [
  {
    id: 1,
    type: "user",
    label: Users[1].username,
    profilePicture: Users[1].profilePicture,
    username: Users[1].username,
  },
  { id: 2, type: "query", label: "hamza nasir" },
  { id: 3, type: "query", label: "sardar logs" },
  {
    id: 4,
    type: "user",
    label: Users[2].username,
    profilePicture: Users[2].profilePicture,
    username: Users[2].username,
  },
  { id: 5, type: "query", label: "react tutorials" },
];

export const initialNotifications = [];

export const initialChats = [
  {
    id: 1,
    user: Users[1],
    lastMessage: "Hey! Are we still meeting tomorrow?",
    time: "2m",
    unread: true,
    online: true,
  },
  {
    id: 2,
    user: Users[2],
    lastMessage: "Thanks for sharing that post!",
    time: "1h",
    unread: true,
    online: false,
  },
  {
    id: 3,
    user: Users[3],
    lastMessage: "See you at the event 🎉",
    time: "3h",
    unread: false,
    online: true,
  },
  {
    id: 4,
    user: Users[4],
    lastMessage: "You sent a photo.",
    time: "Yesterday",
    unread: false,
    online: false,
  },
  {
    id: 5,
    user: Users[5],
    lastMessage: "Sounds good to me!",
    time: "Monday",
    unread: false,
    online: true,
  },
];

export const chatConversations = {
  1: [
    { id: 1, sender: "them", text: "Hi! Long time no see.", time: "9:15 AM" },
    { id: 2, sender: "me", text: "Hey Janell! Yeah it's been a while.", time: "9:20 AM" },
    { id: 3, sender: "them", text: "Hey! Are we still meeting tomorrow?", time: "2m ago" },
  ],
  2: [
    { id: 1, sender: "them", text: "That post was amazing!", time: "12:30 PM" },
    { id: 2, sender: "me", text: "Thank you so much!", time: "12:45 PM" },
    { id: 3, sender: "them", text: "Thanks for sharing that post!", time: "1h ago" },
  ],
  3: [
    { id: 1, sender: "me", text: "Are you going to the event?", time: "Yesterday" },
    { id: 2, sender: "them", text: "Yes! I'll be there.", time: "Yesterday" },
    { id: 3, sender: "them", text: "See you at the event 🎉", time: "3h ago" },
  ],
  4: [
    { id: 1, sender: "me", text: "Check out this photo!", time: "Monday" },
    { id: 2, sender: "them", text: "Wow, looks great!", time: "Monday" },
    { id: 3, sender: "me", text: "You sent a photo.", time: "Yesterday" },
  ],
  5: [
    { id: 1, sender: "them", text: "Can we reschedule our call?", time: "Tuesday" },
    { id: 2, sender: "me", text: "Sure, how about Thursday?", time: "Tuesday" },
    { id: 3, sender: "them", text: "Sounds good to me!", time: "Monday" },
  ],
};

export const commonEmojis = ["😀", "😂", "😍", "👍", "🎉", "❤️", "😊", "🔥", "👋", "🙏", "😎", "💯"];
