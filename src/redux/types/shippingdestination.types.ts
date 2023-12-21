export type shippingDestinationType = {
  _id: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zipcode: string;
  phone_number: string;
};

export type TrackDistanceTimeRequestType = {
  _id: string;
  origin: {
    city: string;
    state: string;
    country: string;
    address: string;
    zip_code: string;
  };
  destination: {
    city: string;
    state: string;
    country: string;
    address: string;
    zip_code: string;
  };
};

export type TrackDistanceTimeType = {
  _id: string;
  originCoordinates: {
    lat: number;
    lng: number;
  };
  destinationCoordinates: {
    lat: number;
    lng: number;
  };
  distance: number;
  timeShipping: string;
  timeFlight: string;
  deliveryDateShipping: string;
  deliveryDateFlight: string;
};
