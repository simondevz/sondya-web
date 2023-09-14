import {
  Chat1,
  Chat10,
  Chat2,
  Chat3,
  Chat4,
  Chat5,
  Chat6,
  Chat7,
  Chat8,
  Chat9,
} from "../images/chat";

export type chatDataType = {
  image: string;
  name: string;
  message: string;
  unread?: number;
  time: string;
};

export const chatDataItem: Array<chatDataType> = [
  {
    image: Chat1,
    name: "Esther Howard",
    unread: 1,
    message: "Microsoft",
    time: "1m",
  },
  {
    image: Chat2,
    name: "Devon Lane",
    message: "New Mexico",
    time: "5m",
  },
  {
    image: Chat3,
    name: "Jenny Wilson",
    message: "11/7/16",
    time: "1h",
  },
  {
    image: Chat4,
    name: "Annette Black",
    message: "2464 Royal Ln. Mesa, New...",
    time: "2h",
  },
  {
    image: Chat5,
    name: "Marvin McKinney",
    message: "Amet minim mollit non.",
    time: "2d",
  },
  {
    image: Chat6,
    name: "Theresa Webb",
    message: "177",
    time: "1w",
  },
  {
    image: Chat7,
    name: "Dianne Russell",
    message: "Women's white Handbag",
    time: "1m",
  },
  {
    image: Chat8,
    name: "Cameron Williamson",
    message: "2 hours",
    time: "1m",
  },
  {
    image: Chat9,
    name: "Albert Flores",
    message: "Contract Base",
    time: "1m",
  },
  {
    image: Chat10,
    name: "Guy Hawkins",
    message: "Marketing Officer",
    time: "2m",
  },
  {
    image: Chat10,
    name: "Jerome Bell",
    message: "New York",
    time: "2m",
  },
];
