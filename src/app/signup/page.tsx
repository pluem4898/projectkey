'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import anime from 'animejs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePrivateKey, saveKey, saveUser, deriveConfigFromKey } from '@/lib/encryption';

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'input' | 'key'>('input');

  useEffect(() => {
    // Animate card entrance
    anime({
      targets: '.signup-card',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  const handleGenerateKey = () => {
    if (!username.trim()) {
      alert('Please enter username');
      return;
    }

    setLoading(true);

    // Generate Private Key
    const key = generatePrivateKey(32);
    setGeneratedKey(key);

    // Test config generation
    const config = deriveConfigFromKey(key);
    console.log('Generated config:', config);

    setLoading(false);
    setStep('key');
  };

  const handleSave = () => {
    if (!generatedKey) return;

    // Save key and user
    saveKey(username, generatedKey);
    saveUser(username);

    alert('Sign up successful! You can now use the system');
    router.push('/cipher');
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedKey);
    alert('Private Key copied!');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Particles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-emerald-500 rounded-full opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${3 + i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center glow group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gradient">
                KeyCipher
              </h1>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Sign up</h2>
          <p className="text-zinc-400">Create your private key to get started</p>
        </div>

        <Card className="signup-card border-zinc-800/50 glow opacity-0">
          <CardHeader>
            <CardTitle className="text-white">
              {step === 'input' ? 'User Information' : 'Your Private Key'}
            </CardTitle>
            <CardDescription className="text-zinc-400">
              {step === 'input'
                ? 'Enter your username to generate a private key'
                : 'Keep this key safe. You\'ll need it to decrypt messages'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 'input' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleGenerateKey()}
                  />
                </div>

                <Button
                  onClick={handleGenerateKey}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Generating Key...' : 'Generate Private Key'}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="bg-zinc-900/80 border-2 border-emerald-500/30 rounded-lg p-4">
                    <p className="text-xs text-zinc-500 mb-2">Private Key</p>
                    <code className="text-sm font-mono text-emerald-400 break-all">
                      {generatedKey}
                    </code>
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleCopyKey}
                    className="w-full"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Private Key
                  </Button>
                </div>

                <div className="bg-amber-900/20 border-2 border-amber-500/30 rounded-lg p-4">
                  <p className="text-sm text-amber-400 font-semibold mb-1">
                    ⚠️ Important Warning
                  </p>
                  <p className="text-xs text-amber-300">
                    Please store this private key safely. If lost, you won't be able to decrypt your messages
                  </p>
                </div>

                <Button onClick={handleSave} className="w-full">
                  Save and Start Using
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    setStep('input');
                    setGeneratedKey('');
                  }}
                  className="w-full"
                >
                  Generate New Key
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-zinc-500">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
