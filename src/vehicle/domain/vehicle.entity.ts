export class Vehicle {
  constructor(
    public readonly id: string,
    public make: string,
    public model: string,
    public plateNumber: string,
    public ownerId: string, // relasi ke customer / user
  ) {}
}
