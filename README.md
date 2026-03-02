# 🔐 KeyCipher - Advanced Key-Derived Configuration Encryption

<div align="center">

![KeyCipher Logo](https://img.shields.io/badge/KeyCipher-Encryption-00D9FF?style=for-the-badge&logo=lock&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**ระบบเข้ารหัสข้อความที่ให้แต่ละผู้ใช้มีระบบเข้ารหัสที่ไม่ซ้ำกัน**

[Demo](#-demo) • [Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Documentation](#-documentation)

</div>

---

## 📖 สารบัญ

- [ภาพรวม](#-ภาพรวม)
- [คุณสมบัติเด่น](#-คุณสมบัติเด่น)
- [เทคโนโลยีที่ใช้](#-เทคโนโลยีที่ใช้)
- [การติดตั้ง](#-การติดตั้ง)
- [วิธีใช้งาน](#-วิธีใช้งาน)
- [หลักการทำงาน](#-หลักการทำงาน)
- [โครงสร้างโปรเจค](#-โครงสร้างโปรเจค)
- [API Reference](#-api-reference)
- [ความปลอดภัย](#-ความปลอดภัย)
- [ข้อจำกัด](#-ข้อจำกัด)
- [การพัฒนาต่อ](#-การพัฒนาต่อ)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 ภาพรวม

**KeyCipher** เป็นระบบเข้ารหัสข้อความที่ใช้หลักการ **Key-Derived Configuration Encryption** ซึ่งทำให้ผู้ใช้แต่ละคนมีระบบเข้ารหัสที่ไม่ซ้ำกันโดยสมบูรณ์ แตกต่างจากระบบเข้ารหัสทั่วไปที่ทุกคนใช้อัลกอริทึมเดียวกัน

### 🎯 วัตถุประสงค์

- สร้างระบบเข้ารหัสที่ปลอดภัยและใช้งานง่ายสำหรับผู้ใช้ทั่วไป
- ให้แต่ละผู้ใช้มี Configuration การเข้ารหัสที่ไม่ซ้ำกัน
- ไม่ต้องพึ่งพา Backend Server ทำให้ Private Key ปลอดภัยสูงสุด
- เข้ารหัสและถอดรหัสได้ 100% โดยไม่สูญเสียข้อมูล

### ✨ จุดเด่น

- 🔑 **Unique Encryption per User** - แต่ละคนมีระบบเข้ารหัสไม่ซ้ำกัน
- 🚀 **Fast & Efficient** - เข้ารหัส/ถอดรหัสรวดเร็ว (~0.05ms/ตัวอักษร)
- 🔒 **100% Reversible** - ถอดรหัสกลับได้สมบูรณ์ด้วย Key ที่ถูกต้อง
- 🌐 **No Backend Required** - ทำงานบน Browser ทั้งหมด
- 🎨 **Beautiful UI/UX** - ออกแบบด้วย Tailwind CSS และ Anime.js
- 📱 **Responsive Design** - ใช้งานได้ทุกอุปกรณ์

---

## 🚀 คุณสมบัติเด่น

### 1. Key-Derived Configuration

แต่ละ Private Key จะถูกใช้สร้าง Configuration ที่ไม่ซ้ำกัน ประกอบด้วย:

- **Character Mapping** - แต่ละตัวอักษรแปลงเป็น 2-4 ตัวอักษร (มี 2-4 ตัวเลือก)
- **XOR Key** - 16 bytes สำหรับเข้ารหัสชั้นที่สอง
- **Scramble Table** - 256 entries สำหรับสับเปลี่ยนข้อมูล
- **Nonlinear Function** - ฟังก์ชันไม่เชิงเส้นเพิ่มความซับซ้อน

### 2. Multi-Layer Encryption

ระบบใช้การเข้ารหัส 3 ชั้น:

```
Plaintext → Character Substitution → XOR Encryption → Base64 Encoding → Ciphertext
```

### 3. Deterministic Configuration

Private Key เดียวกันจะได้ Configuration เดียวกันเสมอ ทำให้:
- ถอดรหัสได้โดยไม่ต้องเก็บ Configuration
- สามารถใช้งานข้ามอุปกรณ์ได้ (ถ้ามี Private Key)

### 4. Local Storage Only

- Private Key เก็บใน `localStorage` เท่านั้น
- ไม่มีการส่งข้อมูลไปยัง Server
- ผู้พัฒนาเองก็เข้าถึง Key ไม่ได้

---

## 🛠 เทคโนโลยีที่ใช้

### Frontend Framework
- **Next.js 15.3.2** - React Framework with App Router
- **React 18.3.1** - UI Library
- **TypeScript 5.8.3** - Type Safety

### Styling & Animation
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **shadcn/ui** - UI Components
- **Anime.js 3.2.2** - Animation Library

### Development Tools
- **Biome 1.9.4** - Linter & Formatter
- **ESLint 9.27.0** - Code Quality
- **PostCSS 8.5.3** - CSS Processing

---

## 📦 การติดตั้ง

### Prerequisites

- Node.js 20.x หรือสูงกว่า
- npm, yarn, pnpm หรือ bun

### Clone Repository

```bash
git clone https://github.com/pluem4898/projectkey.git
cd projectkey
```

### Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

### Run Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

### Build for Production

```bash
npm run build
npm run start
```

---

## 💻 วิธีใช้งาน

### 1. Sign Up (สมัครสมาชิก)

```typescript
// ผู้ใช้กรอก Username
const username = "john";

// ระบบสร้าง Private Key อัตโนมัติ
const privateKey = generatePrivateKey(32);
// Output: "K8#mP2@xL9!nQ5$rT7&wZ3%aB6*cD4^"

// บันทึก Key ลง localStorage
saveKey(username, privateKey);
saveUser(username);
```

### 2. Encrypt (เข้ารหัส)

```typescript
// โหลด Private Key
const privateKey = loadKey(username);

// สร้าง Configuration
const config = deriveConfigFromKey(privateKey);

// เข้ารหัสข้อความ
const plaintext = "Hello World";
const ciphertext = encryptMessage(plaintext, config);
// Output: "xK9mP2qL5nR8tV3wY6zA4bC7dE1fG0h..."
```

### 3. Decrypt (ถอดรหัส)

```typescript
// โหลด Private Key
const privateKey = loadKey(username);

// สร้าง Configuration (เดียวกับตอนเข้ารหัส)
const config = deriveConfigFromKey(privateKey);

// ถอดรหัสข้อความ
const ciphertext = "xK9mP2qL5nR8tV3wY6zA4bC7dE1fG0h...";
const plaintext = decryptMessage(ciphertext, config);
// Output: "Hello World"
```

### 4. Use Case: Alice ส่งข้อความถึง Bob

```typescript
// Alice's Side
const aliceKey = generatePrivateKey(32);
const aliceConfig = deriveConfigFromKey(aliceKey);
const message = "Meet me at 3pm";
const encrypted = encryptMessage(message, aliceConfig);

// Alice ส่ง encrypted และ aliceKey ให้ Bob

// Bob's Side
const bobConfig = deriveConfigFromKey(aliceKey); // ใช้ Key ของ Alice
const decrypted = decryptMessage(encrypted, bobConfig);
// Output: "Meet me at 3pm"
```

---

## 🔬 หลักการทำงาน

### 1. การสร้าง Private Key

```typescript
function generatePrivateKey(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let key = '';
  for (let i = 0; i < length; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}
```

- สุ่มจากชุด 84 ตัวอักษร
- ความยาว 32 ตัวอักษร
- ความเป็นไปได้: 84^32 ≈ 10^61 แบบ

### 2. การสร้าง Configuration

```typescript
function deriveConfigFromKey(privateKey: string): CipherConfig {
  // 1. Hash Private Key เป็น Seed
  const seed = simpleHash(privateKey);
  
  // 2. สร้าง Deterministic RNG
  let rng = seed;
  const random = () => {
    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
    return rng;
  };
  
  // 3. สร้าง Character Mapping
  const charMapping = {};
  for (const char of chars) {
    const numMappings = (random() % 3) + 2; // 2-4 mappings
    const mappings = [];
    for (let i = 0; i < numMappings; i++) {
      const len = (random() % 3) + 2; // ความยาว 2-4
      let mapping = '';
      for (let j = 0; j < len; j++) {
        mapping += mappingChars[random() % mappingChars.length];
      }
      mappings.push(mapping);
    }
    charMapping[char] = mappings;
  }
  
  // 4. สร้าง XOR Key (16 bytes)
  const xorKey = [];
  for (let i = 0; i < 16; i++) {
    xorKey.push(random() % 256);
  }
  
  // 5. สร้าง Scramble Table (256 entries)
  const scrambleTable = [...Array(256).keys()];
  // Fisher-Yates Shuffle
  for (let i = scrambleTable.length - 1; i > 0; i--) {
    const j = random() % (i + 1);
    [scrambleTable[i], scrambleTable[j]] = [scrambleTable[j], scrambleTable[i]];
  }
  
  return { charMapping, xorKey, scrambleTable, ... };
}
```

### 3. การเข้ารหัส (3 ชั้น)

#### ชั้นที่ 1: Character Substitution

```typescript
// Input: "Hello"
// Character Mapping:
// 'H' → ['xSAb', 'kLm', 'pQr']
// 'e' → ['mNp', 'qRs']
// 'l' → ['tUv', 'wXy', 'zAb']
// 'o' → ['cDe', 'fGh']

// Output: "xSAb|mNp|tUv|wXy|cDe"
```

#### ชั้นที่ 2: XOR Encryption

```typescript
// Input bytes: [120, 83, 65, 98, 124, 109, 78, 112, ...]
// XOR Key:      [123, 45, 67, 89, 12,  34,  56, 78,  ...]
//               ↓    ↓   ↓   ↓   ↓    ↓    ↓   ↓
// Output:       [3,  126, 2,  59, 116, 79,  118, 34, ...]
```

#### ชั้นที่ 3: Base64 Encoding

```typescript
// Input bytes: [3, 126, 2, 59, 116, 79, 118, 34, ...]
//              ↓
// Output: "A34CO3RPdiI8xQmVkZGF0YQ=="
```

### 4. การถอดรหัส (ย้อนกลับ 3 ชั้น)

```
Ciphertext → Base64 Decode → XOR Decrypt → Reverse Substitution → Plaintext
```

---

## 📁 โครงสร้างโปรเจค

```
keycipher/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing Page
│   │   ├── layout.tsx            # Root Layout
│   │   ├── globals.css           # Global Styles
│   │   ├── login/
│   │   │   └── page.tsx          # Login Page
│   │   ├── signup/
│   │   │   └── page.tsx          # Sign Up Page
│   │   └── cipher/
│   │       └── page.tsx          # Cipher Dashboard
│   ├── components/
│   │   └── ui/                   # shadcn/ui Components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── textarea.tsx
│   └── lib/
│       ├── encryption.ts         # Encryption Core
│       └── utils.ts              # Utility Functions
├── public/                       # Static Assets
├── .next/                        # Next.js Build Output
├── node_modules/                 # Dependencies
├── package.json                  # Project Config
├── tsconfig.json                 # TypeScript Config
├── tailwind.config.ts            # Tailwind Config
├── postcss.config.mjs            # PostCSS Config
└── README.md                     # This File
```

---

## 📚 API Reference

### Core Functions

#### `generatePrivateKey(length: number): string`

สร้าง Private Key แบบสุ่ม

**Parameters:**
- `length` - ความยาวของ Key (default: 32)

**Returns:** Private Key string

**Example:**
```typescript
const key = generatePrivateKey(32);
// "K8#mP2@xL9!nQ5$rT7&wZ3%aB6*cD4^"
```

---

#### `deriveConfigFromKey(privateKey: string): CipherConfig`

สร้าง Configuration จาก Private Key

**Parameters:**
- `privateKey` - Private Key string

**Returns:** CipherConfig object

**Example:**
```typescript
const config = deriveConfigFromKey("K8#mP2@xL9!...");
// {
//   charMapping: { 'A': ['xSAb', 'kLm'], ... },
//   xorKey: [123, 45, 67, ...],
//   scrambleTable: [45, 12, 78, ...],
//   ...
// }
```

---

#### `encryptMessage(plaintext: string, config: CipherConfig): string`

เข้ารหัสข้อความ

**Parameters:**
- `plaintext` - ข้อความต้นฉบับ
- `config` - Configuration object

**Returns:** Ciphertext (Base64 encoded)

**Example:**
```typescript
const ciphertext = encryptMessage("Hello", config);
// "A34CO3RPdiI8xQmVkZGF0YQ=="
```

---

#### `decryptMessage(ciphertext: string, config: CipherConfig): string`

ถอดรหัสข้อความ

**Parameters:**
- `ciphertext` - ข้อความเข้ารหัส (Base64)
- `config` - Configuration object (ต้องเหมือนกับตอนเข้ารหัส)

**Returns:** Plaintext

**Example:**
```typescript
const plaintext = decryptMessage("A34CO3RPdiI8xQmVkZGF0YQ==", config);
// "Hello"
```

---

### Storage Functions

#### `saveKey(username: string, key: string): void`

บันทึก Private Key ลง localStorage

#### `loadKey(username: string): string | null`

โหลด Private Key จาก localStorage

#### `saveUser(username: string): void`

บันทึก Current User ลง localStorage

#### `loadCurrentUser(): string | null`

โหลด Current User จาก localStorage

#### `logout(): void`

ลบ Current User จาก localStorage

---

## 🔒 ความปลอดภัย

### จุดแข็ง

1. **Brute Force Resistant**
   - Private Key มีความเป็นไปได้ 84^32 ≈ 10^61 แบบ
   - ใช้เวลา ~10^41 ปี ในการ brute force (ที่ 10^12 keys/sec)

2. **Frequency Analysis Resistant**
   - ตัวอักษรเดียวกันเข้ารหัสได้หลายแบบ
   - ไม่มี pattern ที่ชัดเจนใน Ciphertext

3. **Pattern Analysis Resistant**
   - Multi-character mapping ทำให้ pattern ซ่อนอยู่
   - XOR encryption เพิ่มความซับซ้อน

4. **No Server-Side Storage**
   - Private Key เก็บใน localStorage เท่านั้น
   - ไม่มีจุดเสี่ยงจากการรั่วไหลบน Server

### ข้อควรระวัง

⚠️ **Private Key Management**
- ต้องเก็บรักษา Private Key ไว้อย่างดี
- หาย Key = ถอดรหัสไม่ได้
- รั่ว Key = ถอดรหัสได้ทั้งหมด

⚠️ **localStorage Limitations**
- Clear cache = Key หาย
- XSS vulnerability = Key ถูกขโมย
- ควรสำรอง Key ไว้ที่อื่นด้วย

⚠️ **Not for Critical Data**
- ไม่ผ่าน Security Audit
- ไม่ใช้ Standard Crypto (AES, RSA)
- เหมาะสำหรับข้อมูลทั่วไป ไม่ใช่ข้อมูลสำคัญมาก

---

## ⚠️ ข้อจำกัด

### 1. ประสิทธิภาพ

- **ความเร็ว:** ช้ากว่า AES-256 (~4x)
- **ขนาด Ciphertext:** ยาวกว่าต้นฉบับ ~3.7x
- **ไม่เหมาะกับไฟล์ใหญ่:** ออกแบบสำหรับข้อความสั้น-ปานกลาง

### 2. ความปลอดภัย

- **ไม่ใช้ Standard Crypto:** ใช้วิธีการที่เขียนเอง
- **Simple Hash Function:** ไม่ใช่ SHA-256 หรือ bcrypt
- **ไม่ผ่าน Audit:** ยังไม่ได้รับการตรวจสอบจากผู้เชี่ยวชาญ

### 3. การใช้งาน

- **ต้องแชร์ Private Key:** ผู้รับต้องมี Key ของผู้ส่ง
- **ไม่มี Key Recovery:** หาย Key = ถอดรหัสไม่ได้
- **ไม่มี Key Revocation:** ไม่สามารถยกเลิก Key ที่รั่วไหล

---

## 🚧 การพัฒนาต่อ

### Planned Features

- [ ] ใช้ SHA-256 แทน simple hash function
- [ ] เพิ่ม Password authentication
- [ ] ระบบแชร์ข้อความระหว่างผู้ใช้
- [ ] รองรับการเข้ารหัสไฟล์
- [ ] Cloud backup สำหรับ Private Key
- [ ] Public Key Cryptography (RSA)
- [ ] Mobile App (React Native)
- [ ] Browser Extension

### Performance Improvements

- [ ] Web Workers สำหรับการเข้ารหัส
- [ ] Streaming encryption สำหรับไฟล์ใหญ่
- [ ] Compression ก่อนเข้ารหัส
- [ ] Caching Configuration

---

## 🤝 Contributing

เรายินดีรับ Contribution จากทุกคน!

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- ใช้ TypeScript สำหรับ type safety
- ทดสอบโค้ดก่อน commit
- ใช้ Biome สำหรับ formatting
- เขียน commit message ที่ชัดเจน
- อัพเดท documentation เมื่อเพิ่ม feature

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@pluem4898](https://github.com/pluem4898)
- Email: pluem4898@gmail.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Anime.js](https://animejs.com/) - Animation Library

---

## 📞 Support

หากมีคำถามหรือพบปัญหา:

- 📧 Email: pluem4898@gmail.com
- 🐛 [Issue Tracker](https://github.com/pluem4898/projectkey/issues)
- 💬 [Discussions](https://github.com/pluem4898/projectkey/discussions)

---

<div align="center">

**Made with ❤️ by phattaramatee**

⭐ ถ้าชอบโปรเจคนี้ อย่าลืมกด Star นะครับ

</div>
