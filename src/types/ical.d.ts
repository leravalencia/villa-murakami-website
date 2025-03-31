declare module 'ical.js' {
  export default class ICAL {
    static parse(icsString: string): {
      getAllSubcomponents: (type: string) => Array<{
        getFirstPropertyValue: (property: string) => any
      }>
    }
  }
} 