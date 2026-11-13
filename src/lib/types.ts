export type SessionUser = {
  id?: string;
  name: string;
  email: string;
  image?: string | null;
};

export type StudioCategorySlug =
  | "photo-studio"
  | "sound-stage"
  | "podcast-room"
  | "music-suite"
  | "art-workshop";

export type Studio = {
  id: string;
  title: string;
  category: StudioCategorySlug;
  hourlyRate: number;
  securityDeposit: number;
  capacity: number;
  location: string;
  imageUrl: string;
  /** Optional extra photos. Shown after imageUrl in the gallery. */
  gallery?: string[];
  amenities: string[];
  description: string;
  hostId: string;
  hostName: string;
  hostEmail: string;
  openTime: string;
  closeTime: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type StudioInput = {
  title: string;
  category: StudioCategorySlug;
  hourlyRate: number;
  securityDeposit: number;
  capacity: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  description: string;
};

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export type Booking = {
  id: string;
  studioId: string;
  studioTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  hours: number;
  totalPrice: number;
  hourlyRate: number;
  status: BookingStatus;
  createdAt: string;
};