import { Na3People } from "./Na3People";
import { Na3Products } from "./Na3Products";
import { Na3Validator } from "./Na3Validator";

export class Na3 {
  private static _instance?: Na3;
  private static _products?: Na3Products;
  private static _people?: Na3People;
  private static _validator?: Na3Validator;

  private constructor() {
    return;
  }

  static get(): Na3 {
    if (!Na3._instance) Na3._instance = new Na3();
    return Na3._instance;
  }

  products(): Na3Products {
    if (!Na3._products) Na3._products = new Na3Products();
    return Na3._products;
  }

  people(): Na3People {
    if (!Na3._people) Na3._people = new Na3People();
    return Na3._people;
  }

  validator(): Na3Validator {
    if (!Na3._validator) Na3._validator = new Na3Validator();
    return Na3._validator;
  }
}
