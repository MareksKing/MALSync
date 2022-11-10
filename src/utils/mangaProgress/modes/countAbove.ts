import { ModeAbstract } from '../ModeAbstract';

type arguements = {
  selector: string;
};

export class countAbove extends ModeAbstract<arguements> {
  protected execute(args: arguements) {
    const elements = j.$(args.selector);
    if (elements.length === 0) throw new Error(`No element found for '${args.selector}'`);

    const activeElement = this.getElementInViewport(elements);
    if (!activeElement) return 0;

    const count = this.countElementsAbove(elements, activeElement);

    return count;
  }

  protected getElementInViewport(elements: JQuery<HTMLElement>) {
    const inPort: HTMLElement[] = [];
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const rect = element.getBoundingClientRect();
      if (rect.bottom <= windowHeight && rect.width && rect.height) {
        inPort.push(element);
      }
    }

    if (inPort.length) return inPort[inPort.length - 1];

    return null;
  }

  protected countElementsAbove(elements: JQuery<HTMLElement>, element: HTMLElement) {
    let count = 0;
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      count++;
      if (el === element) break;
    }
    return count;
  }
}
