export class Tour {
  constructor(
    public id: number,
    public name: string,
    public location: string,
    public continent: string,
    public start_date: string,
    public end_date: string,
    public photo: string,
    public people?: number,
    public price?: number
  ) {}
}
