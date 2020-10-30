export interface LatLng {
  lat: number,
  lng: number,
}

export interface IJourney {
  id: number,
  vendor_id: number,
  passengerCount: number,
  distance?: number,
  pickupLocation?: LatLng,
  dropoffLocation?: LatLng,
  pickupTime?: Date,
  dropoffTime?: Date,
  fare_amount?: number,
}

export class Journey {
  constructor(
    public id: number,
    public vendor_id: number,
    public passengerCount: number,
    public distance?: number,
    public pickupLocation?: LatLng,
    public dropoffLocation?: LatLng,
    public pickupTime?: Date,
    public dropoffTime?: Date,
    public fare_amount?: number,
  ){}
}