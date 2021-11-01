export class Na3Validator {
  isBrazilianBatchId(batchId: string): boolean {
    return /^([c-fikr][a-dfgk-mx][0-3]\d-?\d{3}-?[2-4]\d[0-3]\d{2} ?[a-g])$/i.test(
      batchId
    );
  }

  isMexicanBatchId(batchId: string): boolean {
    return /^(ka-?((nt)|(ci))-?\d+)$/i.test(batchId);
  }

  isBatchId(batchId: string, format?: "brazil" | "mexico"): boolean {
    if (format) {
      return format === "brazil"
        ? this.isBrazilianBatchId(batchId)
        : this.isMexicanBatchId(batchId);
    }
    return this.isBrazilianBatchId(batchId) || this.isMexicanBatchId(batchId);
  }
}
