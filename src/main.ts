
import { select, local } from 'd3';
import { mockField } from './mock';
import { countAlive } from './utils/countAlive';
import { getNextStepField } from './utils/getNextStepField';

let field = mockField;

let svg = select('body')
  .append('svg')
  .attr('width', 500)
  .attr('height', 500);

let localVar = local<number>();

svg
  .selectAll('g')
  .data(field)
  .enter()
  .append('g')
  .selectAll('rect')
  .data(function(row, index) {localVar.set(this, index); return row})
  .enter()
  .append('rect')
  .attr('width', 20)
  .attr('height', 20)
  .attr('x', (_, index,) => index * 20 + 40)
  .attr('y', function() {return (localVar.get(this) as number * 20) + 40})
  .attr('fill', (alive) => alive ? '#0dd141' : '#dbdbdb')
  .attr('stroke', 'white')


const intervalRef = setInterval(() => {
  field = getNextStepField(field);
  svg.data(field);
  console.log(field);
  if (countAlive(field) === 0) clearInterval(intervalRef);
}, 500);
