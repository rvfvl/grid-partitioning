class Grid {
  private regions: Record<string, { x: number; y: number; id: string }[]> = {};

  constructor(
    private xCells: number,
    private yCells: number,
    private regionSize: number
  ) {
    this.xCells = xCells;
    this.yCells = yCells;
    this.regionSize = regionSize;

    this.generateRegions();
  }

  public addEntities = (entities: { x: number; y: number; id: string }[]) => {
    for (const entity of entities) {
      const { x, y } = this.getRegionPosition(entity.x, entity.y);
      const region = this.regions[`${x}-${y}`];

      if (region) {
        region.push(entity);
      }
    }
  };

  public getRegionPosition = (x: number, y: number) => {
    const xRegion = x - (x % this.regionSize);
    const yRegion = y - (y % this.regionSize);

    return { x: xRegion, y: yRegion };
  };

  public getNearbyRegions = (x: number, y: number) => {
    const { x: xRegion, y: yRegion } = this.getRegionPosition(x, y);

    const nearbyRegions = [
      this.regions[`${xRegion - this.regionSize}-${yRegion}`],
      this.regions[`${xRegion + this.regionSize}-${yRegion}`],
      this.regions[`${xRegion}-${yRegion - this.regionSize}`],
      this.regions[`${xRegion}-${yRegion + this.regionSize}`],
      this.regions[`${xRegion - this.regionSize}-${yRegion - this.regionSize}`],
      this.regions[`${xRegion + this.regionSize}-${yRegion + this.regionSize}`],
    ].filter(Boolean);

    return nearbyRegions;
  };

  public updateEntities = (
    entities: {
      id: string;
      previousPosition: { x: number; y: number };
      newPosition: { x: number; y: number };
    }[]
  ) => {};

  private generateRegions = () => {
    const xRegions = this.xCells / this.regionSize;
    const yRegions = this.yCells / this.regionSize;

    for (let x = 0; x < xRegions; x += this.regionSize) {
      for (let y = 0; y < yRegions; y += this.regionSize) {
        this.regions[`${x}-${y}`] = [];
      }
    }
  };
}

const grid = new Grid(20, 20, 2);
grid.addEntities([
  { x: 3, y: 3, id: Math.random().toString() },
  { x: 3, y: 4, id: Math.random().toString() },
  { x: 3, y: 5, id: Math.random().toString() },
  { x: 4, y: 0, id: Math.random().toString() },
]);

grid.getNearbyRegions(3, 3);
