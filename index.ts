import './style.css';

import { fromEvent } from 'rxjs';
import { takeUntil, mergeMap, map } from 'rxjs/operators';

const mousedown$ = fromEvent(document, 'mousedown')
const mouseup$ = fromEvent(document, 'mouseup');
const mousemove$ = fromEvent(document, 'mousemove');

// after mousedown, take position until mouse up
mousedown$.pipe(
  mergeMap(_ => {
    return mousemove$.pipe(
      map((e: any) => ({
        x: e.clientX,
        y: e.clientY
      })),
      // complete inner observable on mouseup event
      takeUntil(mouseup$)
    )
  })
)
.subscribe(console.log);
