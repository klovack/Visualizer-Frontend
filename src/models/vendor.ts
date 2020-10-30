export class Vendor {
  constructor(
    public id: number,
    public name: string,
  ){}
}

export interface IVendor {
  id: number,
  name?: string,
}