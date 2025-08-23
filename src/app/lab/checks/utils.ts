export const asciiStorageUtils = {
  // Convert checkbox states to ASCII string for DB storage
  checkboxesToAscii: (checkboxStates: boolean[]) => {
    const chars = [];
    for (let i = 0; i < checkboxStates.length; i += 8) {
      let byte = 0;
      for (let j = 0; j < 8 && i + j < checkboxStates.length; j++) {
        if (checkboxStates[i + j]) {
          byte |= 1 << (7 - j);
        }
      }
      // Ensure we use printable ASCII (32-126) for DB safety
      // Map 0-255 to 32-287, but keep within printable range by using modulo
      const asciiCode = Math.max(32, Math.min(126, byte + 32));
      chars.push(String.fromCharCode(asciiCode));
    }
    return chars.join('');
  },

  // Convert ASCII string from DB back to checkbox states
  asciiToCheckboxes: (asciiString: string, totalCheckboxes: number) => {
    const states = new Array(totalCheckboxes).fill(false);

    for (let charIndex = 0; charIndex < asciiString.length; charIndex++) {
      const byte = Math.max(0, asciiString.charCodeAt(charIndex) - 32);
      const startBit = charIndex * 8;

      for (
        let bitIndex = 0;
        bitIndex < 8 && startBit + bitIndex < totalCheckboxes;
        bitIndex++
      ) {
        states[startBit + bitIndex] = (byte & (1 << (7 - bitIndex))) !== 0;
      }
    }

    return states;
  },

  // Calculate storage efficiency
  getStorageStats: (numCheckboxes: number) => {
    const charsNeeded = Math.ceil(numCheckboxes / 8);
    const boolArraySize = numCheckboxes * 4; // 4 bytes per boolean in typical JS
    const asciiStringSize = charsNeeded * 2; // 2 bytes per char in UTF-16
    const compressionRatio = (
      ((boolArraySize - asciiStringSize) / boolArraySize) *
      100
    ).toFixed(1);

    return {
      checkboxes: numCheckboxes,
      asciiChars: charsNeeded,
      boolArraySize,
      asciiStringSize,
      compressionRatio,
      spaceSaved: boolArraySize - asciiStringSize,
    };
  },
};

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
