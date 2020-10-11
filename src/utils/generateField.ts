import { constant, times } from "lodash";

export function generateField(size: number): number[][] {
    return times(size, () => times(size, constant(0)));
}
