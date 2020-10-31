import date from 'date-and-time';

export interface LatLng {
  lat: number,
  lng: number,
}

export interface IJourney {
  id: number,
  vendorId: number,
  passengerCount: number,
  distance?: number,
  pickupLocation?: LatLng,
  dropoffLocation?: LatLng,
  pickupTime?: Date,
  dropoffTime?: Date,
  fare_amount?: number,
}

export interface IResponseJourney {
  id?: number,
  vendor_id?: number,
  passenger_count?: number,
  distance?: number,
  pickup_latitude?: number,
  pickup_longitude?: number,
  dropoff_latitude?: number,
  dropoff_longitude?: number,
  pickup_time?: string,
  dropoff_time?: string,
  total_fare_amount: number,
}

export class Journey {
  constructor(
    public id: number,
    public vendorId: number,
    public passengerCount: number,
    public distance?: number,
    public pickupLocation?: LatLng,
    public dropoffLocation?: LatLng,
    public pickupTime?: Date,
    public dropoffTime?: Date,
    public fare_amount?: number,
  ){}

  get timeSpan(): string {
    return date.format(this.pickupTime, 'hh:mm A') + ' - ' + date.format(this.dropoffTime, 'hh:mm A');
  }

  static fromResponse(element: IResponseJourney) {
    return new Journey(
      element.id,
      element.vendor_id,
      element.passenger_count,
      element.distance,
      {
        lat: element.pickup_latitude,
        lng: element.pickup_longitude,
      },
      {
        lat: element.dropoff_latitude,
        lng: element.dropoff_longitude,
      },
      new Date(element.pickup_time),
      new Date(element.dropoff_time),
      element.total_fare_amount,
    );
  }
}