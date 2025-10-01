export class TrackingSession {
  constructor(
    public readonly sessionId: string,
    public readonly vehicleId: string,
    public readonly startedAt: Date,
    public stoppedAt: Date | null = null,
  ) {}
  
   static fromJSON(data: any): TrackingSession {
    const session = new TrackingSession(
      data.sessionId,
      data.vehicleId,
      new Date(data.startedAt),
      data.stoppedAt ? new Date(data.stoppedAt) : undefined,
    );
    return session;
  }

  stop() {
    this.stoppedAt = new Date();
  }

  isActive(): boolean {
    return this.stoppedAt === null;
  }
  
  toJSON() {
    return {
      id: this.sessionId,
      vehicleId: this.vehicleId,
      startTime: this.startedAt.toISOString(),
      endTime: this.stoppedAt?.toISOString() || null,
    };
  }
}
