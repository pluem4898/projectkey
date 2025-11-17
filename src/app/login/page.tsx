'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { loadKey, saveUser, deriveConfigFromKey } from '@/lib/encryption';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!username.trim() || !privateKey.trim()) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    setLoading(true);

    // ตรวจสอบว่ามี key ใน localStorage หรือไม่
    const savedKey = loadKey(username);

    if (savedKey && savedKey === privateKey) {
      // Login สำเร็จ
      saveUser(username);
      alert('เข้าสู่ระบบสำเร็จ!');
      router.push('/cipher');
    } else if (!savedKey) {
      // ถ้าไม่มี key ให้บันทึกแล้ว login
      try {
        // ทดสอบว่า key ใช้งานได้
        deriveConfigFromKey(privateKey);

        // บันทึก
        if (typeof window !== 'undefined') {
          localStorage.setItem(`cipher_key_${username}`, privateKey);
        }
        saveUser(username);
        alert('เข้าสู่ระบบสำเร็จ!');
        router.push('/cipher');
      } catch (error) {
        alert('Private Key ไม่ถูกต้อง');
      }
    } else {
      alert('Private Key ไม่ถูกต้อง');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen security-grid flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                KeyCipher
              </h1>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-zinc-800 mb-2">เข้าสู่ระบบ</h2>
          <p className="text-zinc-600">ใช้ Private Key ของคุณเพื่อเข้าสู่ระบบ</p>
        </div>

        <Card className="border-2 border-emerald-100 shadow-2xl">
          <CardHeader>
            <CardTitle>ข้อมูลเข้าสู่ระบบ</CardTitle>
            <CardDescription>
              กรอกชื่อผู้ใช้และ Private Key ของคุณ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">ชื่อผู้ใช้</Label>
              <Input
                id="username"
                placeholder="กรอกชื่อผู้ใช้"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="privateKey">Private Key</Label>
              <Input
                id="privateKey"
                type="password"
                placeholder="กรอก Private Key"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <Button
              onClick={handleLogin}
              className="w-full"
              disabled={loading}
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </Button>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
              <p className="text-sm text-emerald-800">
                💡 <strong>เคล็ดลับ:</strong> ถ้าคุณยังไม่เคยสมัครด้วยชื่อผู้ใช้นี้ ระบบจะสร้างบัญชีใหม่ให้อัตโนมัติ
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-zinc-600">
            ยังไม่มีบัญชี?{' '}
            <Link href="/signup" className="text-emerald-600 font-semibold hover:text-emerald-700">
              สมัครสมาชิก
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
