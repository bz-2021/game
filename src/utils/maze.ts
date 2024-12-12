export type WallGrid = boolean[][][];

class Maze {
  private width: number;
  private height: number;
  private walls: WallGrid;

  constructor(width: number, height: number, walls?: WallGrid | null) {
    this.width = height;
    this.height = width;
    if (walls !== undefined && walls !== null) {
      this.walls = walls;
    } else {
      this.walls = [[], []];
      for (let i = 0; i < 2; i++) {
        const rows = height + i;
        const cols = width + 1 - i;
        this.walls[i] = Array.from({ length: rows }, () =>
          Array.from({ length: cols }, () => true)
        );
      }
      this.refresh();
    }
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  public refresh(): void {
    const rand = () => this.getRandomInt(0, 100);
    this.backTracking(rand);
  }

  private backTracking(r: () => number): void {
    const n = this.width * this.height;
    let current = this.getRandomInt(0, n);
    const visited = new Array<boolean>(n).fill(false);
    visited[current] = true;
    const stack: number[] = [];

    while (true) {
      const neighbors = this.neighbors(current);
      const notVisited = neighbors.filter((n) => !visited[n]);

      if (notVisited.length > 0) {
        const next = notVisited[r() % notVisited.length];
        this.setWalls(current, next, false);
        visited[next] = true;
        stack.push(current);
        current = next;
      } else if (stack.length > 0) {
        const next = stack.pop()!;
        current = next;
      } else {
        break;
      }
    }
  }

  private setWalls(i: number, j: number, status: boolean) {
    const [ix, iy] = this.fromIndex(i);
    const [jx, jy] = this.fromIndex(j);
    if (iy == jy) {
      if (ix == jx + 1) {
        this.setWallLeftOf(ix, iy, status);
        return;
      }
      if (jx == ix + 1) {
        this.setWallLeftOf(jx, jy, status);
        return;
      }
    }
    if (ix == jx) {
      if (iy == jy + 1) {
        this.setWallAbove(ix, iy, status);
        return;
      }
      if (jy == iy + 1) {
        this.setWallAbove(jx, jy, status);
        return;
      }
    }
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getWalls(): WallGrid {
    return this.walls;
  }

  private setWallAbove(x: number, y: number, value: boolean): void {
    this.walls[0][x][y] = value;
  }

  private setWallLeftOf(x: number, y: number, value: boolean): void {
    this.walls[1][x][y] = value;
  }

  private toIndex(x: number, y: number): number {
    return x + this.width * y;
  }

  private fromIndex(index: number): [number, number] {
    const x = index % this.width;
    const y = Math.floor(index / this.width);
    return [x, y];
  }

  private neighbors(index: number): number[] {
    const [x, y] = this.fromIndex(index);
    const result: number[] = [];

    if (y > 0) result.push(this.toIndex(x, y - 1));
    if (x > 0) result.push(this.toIndex(x - 1, y));
    if (x + 1 < this.width) result.push(this.toIndex(x + 1, y));
    if (y + 1 < this.height) result.push(this.toIndex(x, y + 1));

    return result;
  }
}

export default Maze;
