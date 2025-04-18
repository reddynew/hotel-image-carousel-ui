
import { createContext, useContext, useState, ReactNode } from "react";

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  images: string[];
  description: string;
  latitude?: number;
  longitude?: number;
}

interface Booking {
  id: number;
  hotelId: number;
  // Add other booking-related fields as needed
}

interface HotelContextType {
  hotels: Hotel[];
  bookings: Booking[];
  addBooking: (booking: Partial<Booking>) => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider = ({ children }: { children: ReactNode }) => {
  const [hotels] = useState<Hotel[]>([
    {
      id: 1,
      name: "Luxury Resort & Spa",
      location: "Miami Beach, FL",
      price: 299,
      rating: 4.8,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ],
      description: "Experience luxury living with ocean views and world-class amenities."
    },
    {
      id: 2,
      name: "Mountain View Lodge",
      location: "Aspen, CO",
      price: 199,
      rating: 4.5,
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ],
      description: "Cozy mountain retreat with stunning views and ski-in/ski-out access."
    },
    {
      id: 3,
      name: "Urban Boutique Hotel",
      location: "New York City, NY",
      price: 349,
      rating: 4.7,
      images: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1567197427669-a0d3603a3586?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      ],
      description: "Sophisticated urban oasis in the heart of Manhattan."
    }
  ]);

  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (booking: Partial<Booking>) => {
    setBookings((prev) => [...prev, { ...booking, id: Date.now() }]);
  };

  return (
    <HotelContext.Provider value={{ hotels, bookings, addBooking }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotels = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotels must be used within a HotelProvider");
  }
  return context;
};
