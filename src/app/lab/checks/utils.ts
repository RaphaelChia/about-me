// Pack booleans into Base64
export function packCheckboxesBase64(bools: boolean[]): string {
  const byteLength = Math.ceil(bools.length / 8);
  const buffer = new Uint8Array(byteLength);

  for (let i = 0; i < bools.length; i++) {
    if (bools[i]) {
      const byteIndex = Math.floor(i / 8);
      const bitIndex = i % 8;
      buffer[byteIndex] |= 1 << bitIndex;
    }
  }

  // Convert buffer → Base64
  return btoa(String.fromCharCode(...buffer));
}

// Unpack Base64 back into booleans
export function unpackCheckboxesBase64(
  base64: string,
  numCheckboxes: number,
): boolean[] {
  // Convert Base64 → Uint8Array
  const binaryStr = atob(base64);
  const buffer = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    buffer[i] = binaryStr.charCodeAt(i);
  }

  // Extract bits
  const bools: boolean[] = [];
  for (let i = 0; i < numCheckboxes; i++) {
    const byteIndex = Math.floor(i / 8);
    const bitIndex = i % 8;
    bools.push((buffer[byteIndex] & (1 << bitIndex)) !== 0);
  }
  console.log('returning bools', bools.length);
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
