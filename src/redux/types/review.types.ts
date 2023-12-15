import { ImageType } from "./users.types";

export type createReviewType = {
  product_id?: string;
  service_id?: string;
  review: string;
  rating: number;
};

export type userReviewType = {
  _id: string;
  user_id: {
    _id: string;
    username: string;
    email: string;
    image?: ImageType[];
  };
  product_id?: string;
  service_id?: string;
  review: string;
  rating: number;
  createdAt: string;
};

export type reviewStatType = {
  averageRating: number;
  totalReviews: number;
};
