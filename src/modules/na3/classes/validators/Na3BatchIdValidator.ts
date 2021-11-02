export class Na3BatchIdValidator {
  isBrazilianBatchId(testBatchId: unknown): testBatchId is string {
    if (typeof testBatchId !== "string") return false;
    return /^([c-fikr][a-dfgk-mx][0-3]\d-?\d{3}-?[2-4]\d[0-3]\d{2} ?[a-g])$/i.test(
      testBatchId
    );
  }

  isMexicanBatchId(testBatchId: unknown): testBatchId is string {
    if (typeof testBatchId !== "string") return false;
    return /^(ka-?((nt)|(ci))-?\d+)$/i.test(testBatchId);
  }

  isBatchId(
    testBatchId: unknown,
    format?: "brazil" | "mexico"
  ): testBatchId is string {
    if (typeof testBatchId !== "string") return false;
    if (format) {
      return format === "brazil"
        ? this.isBrazilianBatchId(testBatchId)
        : this.isMexicanBatchId(testBatchId);
    }
    return (
      this.isBrazilianBatchId(testBatchId) || this.isMexicanBatchId(testBatchId)
    );
  }
}
