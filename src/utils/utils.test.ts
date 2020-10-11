import { mockField } from "../mock"
import { countAlive } from "./countAlive"
import { generateField } from "./generateField";

describe('countAlive', () => {
    it('should return all the alive cells on the field', () => {
        expect(countAlive(mockField)).toEqual(8);
        expect(countAlive([])).toEqual(0);
    })
});

describe('generateField', () => {
    it('should return a 2d array of given size, filled with zeros', () => {
        const randomInteger = Math.floor(Math.random() * 100) + 1;
        const field = generateField(randomInteger);
        expect(field.length).toEqual(randomInteger);
        expect(field[0].length).toEqual(randomInteger);
        field.forEach(row => row.forEach(value => expect(value).toEqual(0)));
    })
});

// TODO write more tests for other utils