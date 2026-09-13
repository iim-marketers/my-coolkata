const DIGITS = "০১২৩৪৫৬৭৮৯";

/** Western digits to Bengali ones, so 1868 reads ১৮৬৮. Everything else passes through. */
export function toBanglaDigits(value: number | string) {
  return String(value).replace(/[0-9]/g, (d) => DIGITS[Number(d)]);
}
