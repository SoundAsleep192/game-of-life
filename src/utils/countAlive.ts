export function countAlive(field: number[][]): number {
    let counter = 0;

    for (const row of field) {
        for (const cell of row) {
            counter += cell;
        }
    }

    return counter;
}
