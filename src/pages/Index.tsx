
import { useHotels } from "@/contexts/HotelContext";
import { HotelCard } from "@/components/HotelCard";
import { toast } from "@/components/ui/use-toast";
import { HotelProvider } from "@/contexts/HotelContext";

const Index = () => {
  const { hotels, addBooking } = useHotels();

  const handleBookNow = (hotel: any) => {
    addBooking({ hotelId: hotel.id });
    toast({
      title: "Booking Confirmed",
      description: `You've booked ${hotel.name}. Check your bookings for details.`,
    });
  };

  return (
    <HotelProvider>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Discover Amazing Hotels</h1>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Browse our selection of premium hotels and resorts for your next getaway.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        </div>
      </div>
    </HotelProvider>
  );
};

export default Index;
