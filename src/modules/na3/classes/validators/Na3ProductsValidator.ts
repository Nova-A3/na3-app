import type { ApiProduct } from "../../../na3-types";
import { formatQueryInput } from "../../utils";

export class Na3ProductsValidator {
  isProduct(testProduct: unknown): testProduct is ApiProduct {
    return (
      testProduct instanceof Object &&
      Object.prototype.hasOwnProperty.call(testProduct, "masterProductId") &&
      Object.prototype.hasOwnProperty.call(testProduct, "originProductId") &&
      Object.prototype.hasOwnProperty.call(testProduct, "perCarton")
    );
  }

  isProductId(testId: unknown): testId is `00A000${number}` {
    if (typeof testId !== "string") return false;
    const formatted = formatQueryInput(testId);
    return /^00A000[\dA-Z]{4}$/.test(formatted);
  }

  isProductCode(testCode: unknown): testCode is `${number}` | `S-${number}` {
    if (typeof testCode !== "string") return false;
    const formatted = formatQueryInput(testCode);
    return /^((\d{10})|(S-\d{7}))$/.test(formatted);
  }

  isDartBagCode(testCode: unknown): testCode is `S-${number}` {
    return this.isProductCode(testCode) && testCode.startsWith("S-");
  }
}
