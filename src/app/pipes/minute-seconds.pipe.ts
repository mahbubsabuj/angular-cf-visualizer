import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSeconds',
})
export class MinuteSecondsPipe implements PipeTransform {
  makeHumanReadable(num: number, singular: string): string {
    return num > 0
      ? num + (num === 1 ? ` ${singular}, ` : ` ${singular}s, `)
      : '';
  }
  transform(totalSeconds: number): string {
    const seconds: number = Math.floor(totalSeconds % 60);
    const minutes: number = Math.floor((totalSeconds % 3600) / 60);
    const hours: number =
      Math.floor((totalSeconds % (3600 * 24)) / 3600) +
      Math.floor(totalSeconds / (3600 * 24)) * 60;

    const secondsStr: string = this.makeHumanReadable(seconds, 'second');
    const minutesStr: string = this.makeHumanReadable(minutes, 'minute');
    const hoursStr: string = this.makeHumanReadable(hours, 'hour');

    return `${hoursStr}${minutesStr}${secondsStr}`.replace(/,\s*$/, '');
  }
}
