declare global {
    export type Uuid = string & { _uuidBrand: undefined };
  }
  
  console.log(process.env)
  export {};
  