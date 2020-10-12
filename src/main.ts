
import { select, local, Selection } from 'd3';
import { isEqual } from 'lodash';
import { mockField } from './mock';
import { countAlive } from './utils/countAlive';
import { generateField } from './utils/generateField';
import { getNextStepField } from './utils/getNextStepField';

let field = mockField;

let svg = drawField(field);

const intervalRef = setInterval(() => {
  const newField = getNextStepField(field);
  svg = drawField(newField, svg);
  if (countAlive(field) === 0 || isEqual(field, newField)) {
    drawField(generateField(field.length), svg);
    clearInterval(intervalRef);
  }
  field = newField;
}, 100);

function drawField(field: number[][], svg?: Selection<SVGSVGElement, unknown, HTMLElement, any>): Selection<SVGSVGElement, unknown, HTMLElement, any> {
  svg?.remove();

  const newSvg = select('body')
  .append('svg')
  .attr('width', 500)
  .attr('height', 500);

  let localVar = local<number>();

  newSvg
  .selectAll('g')
  .data(field)
  .enter()
  .append('g')
  .selectAll('rect')
  .data(function(row, index) {localVar.set(this, index); return row})
  .enter()
  .append('rect')
  .attr('width', 50)
  .attr('height', 50)
  .attr('x', (_, index) => index * 50)
  .attr('y', function() {return localVar.get(this) as number * 50})
  .attr('fill', (alive) => alive ? '#0dd141' : '#dbdbdb')
  .attr('stroke', 'white');

  return newSvg;
}