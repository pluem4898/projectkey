'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import anime from 'animejs/lib/anime.es.js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { loadCurrentUser } from '@/lib/encryption';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentUser(loadCurrentUser());

    // Animate hero text
    anime({
      targets: '.hero-title .char',
      translateY: [-100, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: anime.stagger(50),
      easing: 'easeOutExpo',
    });

    // Animate particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      anime({
        targets: particle,
        translateX: () => anime.random(-200, 200),
        translateY: () => anime.random(-200, 200),
        scale: [0, anime.random(0.5, 1.5)],
        opacity: [0, anime.random(0.3, 0.8), 0],
        duration: anime.random(3000, 6000),
        delay: index * 100,
        loop: true,
        easing: 'easeInOutQuad',
      });
    });

    // Animate circles
    anime({
      targets: '.circle-animation',
      rotate: 360,
      duration: 20000,
      easing: 'linear',
      loop: true,
    });

    anime({
      targets: '.circle-inner',
      scale: [1, 1.1, 1],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true,
    });
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden">
      {/* Particles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-emerald-500 rounded-full opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center glow group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gradient">
                KeyCipher
              </h1>
            </div>
          </Link>

          <nav className="flex items-center gap-8">
            <Link href="#features" className="text-zinc-400 hover:text-emerald-400 transition-colors text-sm font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="text-zinc-400 hover:text-emerald-400 transition-colors text-sm font-medium">
              How it works
            </Link>
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-500">
                  <strong className="text-emerald-400">{currentUser}</strong>
                </span>
                <Link href="/cipher">
                  <Button size="sm">Dashboard</Button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 pt-32 pb-20" ref={heroRef}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-8">
              <h1 className="hero-title text-7xl font-bold leading-tight">
                {splitText('Encrypt')}
              </h1>
            <p className="font-bold text-gradient text-7xl">
                  {splitText('Domo.')}
            </p>
              <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
                Advanced key-derived config encryption. Each user has unique configuration.
                Secure, fast, and 100% reversible.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/signup">
                  <Button size="lg" className="text-lg">
                    Get started
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="text-lg">
                    Learn more
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm text-zinc-500">Multi-char mapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="text-sm text-zinc-500">XOR encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                  <span className="text-sm text-zinc-500">100% reversible</span>
                </div>
              </div>
            </div>

            {/* Right: Animated Circle */}
            <div className="relative flex items-center justify-center">
              <div className="circle-animation relative w-96 h-96">
                {/* Outer ring */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    opacity="0.5"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="160"
                    fill="none"
                    stroke="url(#gradient2)"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                    opacity="0.3"
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center icon */}
                <div className="circle-inner absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center glow-strong transform rotate-12">
                    <svg className="w-20 h-20 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>

                {/* Floating dots */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#06b6d4' : '#f59e0b',
                      left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
                      top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 8)}%`,
                      animation: `pulse ${2 + i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative container mx-auto px-6 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-white">
              Why <span className="text-gradient">KeyCipher</span>?
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Advanced encryption designed for maximum security
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                ),
                title: 'Key-Derived Config',
                description: 'Each user has unique private key and auto-generated config',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Multi-Char Mapping',
                description: 'Each character maps to multi-character like A → "xSAb"',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
                title: '100% Reversible',
                description: 'Decrypt perfectly with correct private key',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'XOR & Scramble',
                description: 'XOR encryption, scramble table, and nonlinear function',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ),
                title: 'Local Storage',
                description: 'Keys stored on your device only, not on server',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: 'Easy to Use',
                description: 'Simple interface, fast, just type and click encrypt',
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="group hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:glow"
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-emerald-500/30 group-hover:to-cyan-500/30 transition-all">
                    <div className="text-emerald-400">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-zinc-400 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 border-emerald-500/30 glow">
            <CardContent className="p-16 text-center">
              <h2 className="text-5xl font-bold mb-6 text-white">
                Start encrypting today
              </h2>
              <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
                Sign up for free and get your private key instantly
              </p>
              <Link href="/signup">
                <Button size="lg" className="text-lg px-12">
                  Get started now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

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
