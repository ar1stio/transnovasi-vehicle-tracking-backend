export class Location {
  constructor(
    public readonly vehicleId: string,
    public readonly lat: number,
    public readonly lng: number,
    public readonly timeLocation: Date = new Date(),
  ) {}
}
