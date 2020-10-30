export interface LatLng {
  lat: number,
  lng: number,
}

export class Journey {
  constructor(
    private id: number,
    private vendor_id: number,
    private passengerCount: number,
    private distance?: number,
    private pickupLocation?: LatLng,
    private dropoffLocation?: LatLng,
    private pickupTime?: Date,
    private dropoffTime?: Date,
    private fare_amount?: number,
  ){}
}