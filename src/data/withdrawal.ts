export type withdrawalDataType = {
  date: string;
  time: string;
  charge: number;
  amount: number;
  status: string;
  uploadedby: string;
};

export const withdrawalDataItem: Array<withdrawalDataType> = [
  {
    date: "Mar 18, 2023 ",
    time: "12:25PM",
    charge: 340,
    amount: 243947,
    status: "Paid",
    uploadedby: "Olivia Rhye",
  },
];
