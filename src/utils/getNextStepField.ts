import { sum } from "lodash";
import { generateField } from "./generateField";
import { getNeighbours } from "./getNeighbours";

/** Generates new field based on previous one according to the game's rules */
export function getNextStepField(currentField: number[][]): number[][] {
    const nextField = generateField(currentField.length);
    
    currentField.forEach((row: number[], rowIndex: number): void => {
        row.forEach((cell: number, cellIndex: number): void => {
            /** Amount of neighbours alive */
            const neighboursAmount = sum(getNeighbours(cellIndex, rowIndex, currentField));

            const cellIsAlive = cell === 1;
            const cellShouldDie = neighboursAmount > 3 || neighboursAmount < 2;

            if (cellIsAlive && cellShouldDie) {
                nextField[rowIndex][cellIndex] = 0;
                return;
            }

            const cellShouldRevive = neighboursAmount === 3;

            if (cellShouldRevive) {
                nextField[rowIndex][cellIndex] = 1;
                return;
            }

            nextField[rowIndex][cellIndex] = cell;
        });
    });

    return nextField;
}
