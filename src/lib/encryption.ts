//demo
export interface CipherConfig {
  charMapping: Record<string, string[]>;
  tokenLength: number;
  roundSequence: string[];
  xorKey: number[];
  scrambleTable: number[];
  nonlinearFunc: (val: number) => number;
}


export function generatePrivateKey(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let key = '';
  for (let i = 0; i < length; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function deriveConfigFromKey(privateKey: string): CipherConfig {
  const seed = simpleHash(privateKey);

  let rng = seed;
  const random = () => {
    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
    return rng;
  };
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?@#$%^&*()_+-=[]{}|;:<>/"\'\\';
  const charMapping: Record<string, string[]> = {};

  const mappingChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (const char of chars) {
    const numMappings = (random() % 3) + 2;
    const mappings: string[] = [];
    for (let i = 0; i < numMappings; i++) {
      const len = (random() % 3) + 2;
      let mapping = '';
      for (let j = 0; j < len; j++) {
        mapping += mappingChars[random() % mappingChars.length];
      }
      mappings.push(mapping);
    }
    charMapping[char] = mappings;
  }

  const tokenLength = (random() % 3) + 3;

  const roundSequence = ['substitute', 'rotate', 'xor', 'scramble'];

  const xorKey: number[] = [];
  for (let i = 0; i < 16; i++) {
    xorKey.push(random() % 256);
  }

  const scrambleTable: number[] = [];
  for (let i = 0; i < 256; i++) {
    scrambleTable.push(i);
  }
  for (let i = scrambleTable.length - 1; i > 0; i--) {
    const j = random() % (i + 1);
    [scrambleTable[i], scrambleTable[j]] = [scrambleTable[j], scrambleTable[i]];
  }

  const nonlinearFunc = (val: number) => {
    return ((val * 7 + 13) ^ (random() % 256)) % 256;
  };

  return {
    charMapping,
    tokenLength,
    roundSequence,
    xorKey,
    scrambleTable,
    nonlinearFunc,
  };
}

export function encryptMessage(plaintext: string, config: CipherConfig): string {
  let result = plaintext;

  let substituted = '';
  for (const char of result) {
    if (config.charMapping[char]) {
      const mappings = config.charMapping[char];
      const chosen = mappings[Math.floor(Math.random() * mappings.length)];
      substituted += chosen + '|';
    } else {
      substituted += char.charCodeAt(0).toString(16).padStart(4, '0') + '|';
    }
  }
  result = substituted.slice(0, -1);

  const bytes = new TextEncoder().encode(result);
  const xored = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    xored[i] = bytes[i] ^ config.xorKey[i % config.xorKey.length];
  }

  const base64 = btoa(String.fromCharCode(...xored));

  return base64;
}

export function decryptMessage(ciphertext: string, config: CipherConfig): string {
  try {
    const decoded = atob(ciphertext);
    const bytes = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
      bytes[i] = decoded.charCodeAt(i);
    }

    const xored = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      xored[i] = bytes[i] ^ config.xorKey[i % config.xorKey.length];
    }

    const substituted = new TextDecoder().decode(xored);

    const tokens = substituted.split('|');
    let plaintext = '';

    const reverseMapping: Record<string, string> = {};
    for (const [char, mappings] of Object.entries(config.charMapping)) {
      for (const mapping of mappings) {
        reverseMapping[mapping] = char;
      }
    }

    for (const token of tokens) {
      if (reverseMapping[token]) {
        plaintext += reverseMapping[token];
      } else {
        try {
          const code = Number.parseInt(token, 16);
          if (!isNaN(code)) {
            plaintext += String.fromCharCode(code);
          } else {
            plaintext += '?';
          }
        } catch {
          plaintext += '?';
        }
      }
    }

    return plaintext;
  } catch (error) {
    throw new Error('Failed to decrypt: Invalid ciphertext or key');
  }
}

// Storage helpers
export function saveKey(username: string, key: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`cipher_key_${username}`, key);
  }
}

export function loadKey(username: string): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(`cipher_key_${username}`);
  }
  return null;
}

export function saveUser(username: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cipher_current_user', username);
  }
}

export function loadCurrentUser(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('cipher_current_user');
  }
  return null;
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cipher_current_user');
  }
}
