export interface CardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
}

// Placeholder for button component props
export interface ButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

export interface address {
  state: string;
  city: string;
  country: string;
}

export interface offers {
  bed: string;
  shower: string;
  occupants: string;
}

export interface PropertyProps {
  id : number;
  name: string;
  address: address;
  rating: number;
  category: string[];
  price: number;
  offers: offers;
  image: string;
  description? : string;
  gallery : string[];
  reviews: ReviewsProps[];
  discount: string;
}

export interface PillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}


export interface ReviewsProps{
  propertyId : number;
  avatar: string;
  name: string;
  rating: string;
  comment: string;
}

export interface ReviewSectionProps {
  reviews: ReviewsProps[];
  propertyId: number;
}

export interface BookingSectionProps {
  price: number;
  checkIn: string;
  checkOut: string;
  setCheckIn: (date: string) => void;
  setCheckOut: (date: string) => void;
}

export interface GalleryProps{
  gallery: string[];
}

export interface BookingDetailsProps {
  propertyName: string;
  price: number;
  bookingFee: number;
  totalNights: number;
  startDate: string;
}