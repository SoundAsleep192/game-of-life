import { isNil } from "lodash";

export function getNeighbours(cellX: number, cellY: number, field: number[][]): number[] {
    const neighbours: number[] = [];

    for (let y = cellY - 1; y <= cellY + 1; y++) {
        for (let x = cellX - 1; x <= cellX + 1; x++) {
            if (x == cellX && y == cellY) continue;
            if (isNil(field[y]?.[x])) continue;
            neighbours.push(field[y][x]);
        }
    }

    return neighbours;
}
