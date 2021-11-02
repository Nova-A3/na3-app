import { Na3People } from "./Na3People";
import { Na3Products } from "./Na3Products";
import { Na3BatchIdValidator } from "./validators/Na3BatchIdValidator";
import { Na3ProductsValidator } from "./validators/Na3ProductsValidator";

type Na3Validators = {
  batchId: () => Na3BatchIdValidator;
  products: () => Na3ProductsValidator;
};

export class Na3 {
  private static _instance?: Na3;
  private _products?: Na3Products;
  private _people?: Na3People;
  private _validators?: Na3Validators;

  private constructor() {
    return;
  }

  static get(): Na3 {
    if (!Na3._instance) Na3._instance = new Na3();
    return Na3._instance;
  }

  products(): Na3Products {
    if (!this._products) this._products = new Na3Products();
    return this._products;
  }

  people(): Na3People {
    if (!this._people) this._people = new Na3People();
    return this._people;
  }

  validators(): Na3Validators {
    if (!this._validators) {
      this._validators = {
        batchId: (): Na3BatchIdValidator => new Na3BatchIdValidator(),
        products: (): Na3ProductsValidator => new Na3ProductsValidator(),
      };
    }
    return this._validators;
  }
}
