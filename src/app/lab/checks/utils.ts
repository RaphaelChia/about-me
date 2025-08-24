// Direct 6-bit to base64 character mapping - more educational/interactive
export function packCheckboxesBase64(bools: boolean[]): string {
  const base64Chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';

  // Process in chunks of 6 bits (left-to-right, most significant first)
  for (let i = 0; i < bools.length; i += 6) {
    let sixBitValue = 0;
    for (let j = 0; j < 6 && i + j < bools.length; j++) {
      if (bools[i + j]) {
        sixBitValue |= 1 << (5 - j);
      }
    }
    result += base64Chars[sixBitValue];
  }

  return result;
}

export function unpackCheckboxesBase64(
  base64: string,
  numCheckboxes: number,
): boolean[] {
  const base64Chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  // Pre-allocate array to final size
  const bools = new Array(numCheckboxes).fill(false);
  let boolIndex = 0;

  for (let i = 0; i < base64.length && boolIndex < numCheckboxes; i++) {
    const char = base64[i];
    const sixBitValue = base64Chars.indexOf(char);

    // Extract 6 bits (most significant first)
    for (let j = 0; j < 6 && boolIndex < numCheckboxes; j++) {
      const bitValue = (sixBitValue & (1 << (5 - j))) !== 0;
      bools[boolIndex++] = bitValue;
    }
  }

  return bools;
}

// Pretty-print as binary string for display
// Unused atm
export function toBinaryStringBase64(
  base64: string,
  numCheckboxes: number,
): string {
  const unpacked = unpackCheckboxesBase64(base64, numCheckboxes);
  return unpacked.map((b) => (b ? '1' : '0')).join('');
}
