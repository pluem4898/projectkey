'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  loadCurrentUser,
  loadKey,
  deriveConfigFromKey,
  encryptMessage,
  decryptMessage,
  logout
} from '@/lib/encryption';

export default function CipherPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);


  useEffect(() => {
    const user = loadCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setCurrentUser(user);

    const key = loadKey(user);
    if (key) setGeneratedKey(key);
  }, [router]);


  const handleProcess = () => {
    if (!inputText.trim()) {
      alert('กรุณากรอกข้อความ');
      return;
    }

    if (!currentUser) {
      alert('กรุณาเข้าสู่ระบบก่อน');
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      const key = loadKey(currentUser);
      if (!key) {
        alert('ไม่พบ Private Key กรุณาเข้าสู่ระบบใหม่');
        router.push('/login');
        return;
      }

      const config = deriveConfigFromKey(key);

      if (mode === 'encrypt') {
        const ciphertext = encryptMessage(inputText, config);
        setOutputText(ciphertext);
      } else {
        const plaintext = decryptMessage(inputText, config);
        setOutputText(plaintext);
      }
    } catch (error) {
      alert(mode === 'encrypt' ? 'การเข้ารหัสล้มเหลว' : 'การถอดรหัสล้มเหลว กรุณาตรวจสอบ Ciphertext');
      console.error(error);
    }

    setLoading(false);
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      alert('คัดลอกแล้ว!');
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center">กำลังโหลด...</div>;
  }

  return (
    <div className="min-h-screen security-grid">
      {/* Header */}
      <header className="relative z-10 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                KeyCipher
              </h1>
            </div>
          </Link>
          {/* <code className="text-gradient">
                      <>You private keys - </>{generatedKey}
                </code> */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-zinc-600">
              ผู้ใช้: <strong className="text-emerald-700">{currentUser}</strong>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-zinc-100">เข้ารหัส / ถอดรหัสข้อความ</h1>
            <p className="text-lg text-zinc-200">ใช้ Key-Derived Config Encryption ของคุณ</p>



          </div>


          

          {/* Mode Selector */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={mode === 'encrypt' ? 'default' : 'outline'}
              onClick={() => {
                setMode('encrypt');
                handleClear();
              }}
              className="px-8"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              เข้ารหัส
            </Button>
            <Button
              variant={mode === 'decrypt' ? 'default' : 'outline'}
              onClick={() => {
                setMode('decrypt');
                handleClear();
              }}
              className="px-8"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              ถอดรหัส
            </Button>
          </div>

          {/* Main Card */}
          <Card className="border-2 border-emerald-100 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {mode === 'encrypt' ? (
                  <>
                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    เข้ารหัสข้อความ
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                    ถอดรหัสข้อความ
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {mode === 'encrypt'
                  ? 'กรอกข้อความที่ต้องการเข้ารหัส ระบบจะใช้ Key ของคุณในการสร้าง Config'
                  : 'กรอก Ciphertext ที่ต้องการถอดรหัส ระบบจะใช้ Key ของคุณในการถอดรหัส'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Input */}
              <div className="space-y-2">
                <Label htmlFor="input">
                  {mode === 'encrypt' ? 'ข้อความต้นฉบับ (Plaintext)' : 'ข้อความเข้ารหัส (Ciphertext)'}
                </Label>
                <Textarea
                  id="input"
                  placeholder={mode === 'encrypt' ? 'กรอกข้อความที่ต้องการเข้ารหัส...' : 'กรอกข้อความที่ต้องการถอดรหัส...'}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[150px] font-mono"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleProcess}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    'กำลังประมวลผล...'
                  ) : mode === 'encrypt' ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      เข้ารหัส
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      ถอดรหัส
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClear}
                >
                  ล้าง
                </Button>
              </div>

              {/* Output */}
              {outputText && (
                <div className="space-y-2">
                  <Label htmlFor="output">
                    {mode === 'encrypt' ? 'ข้อความเข้ารหัส (Ciphertext)' : 'ข้อความต้นฉบับ (Plaintext)'}
                  </Label>
                  <div className="relative">
                    <Textarea
                      id="output"
                      value={outputText}
                      readOnly
                      className="min-h-[150px] font-mono  border-emerald-300"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="absolute top-2 right-2"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      คัดลอก
                    </Button>
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-zinc-950/80 border-2 rounded-lg p-4">
                <p className="text-sm text-zinc-400">
                  <strong>วิธีใช้งาน</strong>
                </p>
                <ul className="text-sm text-zinc-600 mt-2 space-y-1 list-disc list-inside list-none">
                  <li>• กรอกข้อความที่ต้องการ {mode === 'encrypt' ? 'เข้ารหัส' : 'ถอดรหัส'}</li>
                  <li>• คลิกปุ่ม "{mode === 'encrypt' ? 'เข้ารหัส' : 'ถอดรหัส'}" เพื่อประมวลผล</li>
                  <li>• ผลลัพธ์จะแสดงด้านล่าง คุณสามารถคัดลอกได้</li>
                  <li>• ข้อความจะถูกเข้ารหัสด้วย Config ที่สร้างจาก Private Key ของคุณ</li>
                </ul>
              </div>
              <div className="text-sm text-zinc-600 mt-2 space-y-1 list-disc list-inside list-none">
                <p className="text-xs text-zinc-500 mb-2">Your Private Key</p>
                  <code className="text-sm font-mono text-gradient break-all">
                      {generatedKey}
                    </code>
                </div>
            </CardContent>
          </Card>

          {/* Features Info */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="border border-zinc-200">
              <CardHeader>
                <CardTitle className="text-lg text-zinc-400">คุณสมบัติการเข้ารหัส</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-zinc-600 space-y-2">
                <p>• Multi-char mapping: แต่ละตัวอักษร map เป็น 2-4 ตัวอักษร</p>
                <p>• XOR encryption: เพิ่มความปลอดภัยด้วย XOR key</p>
                <p>• Base64 encoding: เข้ารหัส output เป็น Base64</p>
                <p>• Config ถูกสร้างจาก Private Key อัตโนมัติ</p>
              </CardContent>
            </Card>

            <Card className="border border-zinc-200">
              <CardHeader>
                <CardTitle className="text-lg text-zinc-400">ความปลอดภัย</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-zinc-600 space-y-2">
                <p>• Private Key เก็บใน localStorage เท่านั้น</p>
                <p>• แต่ละคนมี Config ไม่เหมือนกัน</p>
                <p>• Reversible 100% เมื่อมี Key ที่ถูกต้อง</p>
                <p>• ไม่มีการส่งข้อมูลขึ้น Server</p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>

      
      {/* Footer */}
      <footer className="relative border-t border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-6 py-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gradient">KeyCipher</span>
          </div>
          <p className="text-zinc-500">© 2025 KeyCipher. Advanced encryption security.</p>
        </div>
      </footer>
    </div>
  );
}
