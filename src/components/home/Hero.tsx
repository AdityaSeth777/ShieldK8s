import React from 'react';
import { Shield, ChevronRight, Activity, Lock, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';

const Hero: React.FC = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 200,
  });

  const slideIn = useSpring({
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    delay: 400,
  });

  const imageSlide = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 600,
  });

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-cyber-black to-[#0F172A] z-0" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 z-1" />
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <animated.div style={fadeIn} className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <Shield className="w-12 h-12 text-cyber-blue mr-3 animate-pulse-slow" />
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue via-blue-400 to-cyber-purple">
                ShieldK8s
              </h1>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Secure Your <span className="text-cyber-blue">Kubernetes</span> Infrastructure
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Real-time security monitoring and threat detection for your Kubernetes clusters. Powered by eBPF and Cilium.
            </p>
            
            <animated.div style={slideIn} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/login"
                className="px-8 py-4 bg-cyber-blue hover:bg-cyber-blue/90 text-black font-semibold rounded-lg flex items-center justify-center group transition-all"
              >
                Get Started
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/docs"
                className="px-8 py-4 border border-cyber-blue/30 hover:border-cyber-blue/60 text-white rounded-lg flex items-center justify-center group transition-all"
              >
                Documentation
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </animated.div>
          </animated.div>
          
          {/* 3D Visualization */}
          <animated.div style={imageSlide} className="flex-1 relative">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000&h=1500"
              alt="Kubernetes Security"
              className="rounded-lg shadow-2xl border border-cyber-blue/20 w-full max-w-2xl mx-auto"
            />
            
            {/* Floating Stats */}
            <animated.div style={useSpring({
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
              delay: 800,
            })} className="absolute -top-4 -left-4 bg-black/80 backdrop-blur-sm border border-cyber-blue/20 p-4 rounded-lg">
              <div className="flex items-center text-cyber-blue">
                <Activity className="w-5 h-5 mr-2" />
                <span>99.9% Uptime</span>
              </div>
            </animated.div>
            
            <animated.div style={useSpring({
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
              delay: 1000,
            })} className="absolute -bottom-4 -right-4 bg-black/80 backdrop-blur-sm border border-cyber-blue/20 p-4 rounded-lg">
              <div className="flex items-center text-cyber-green">
                <Lock className="w-5 h-5 mr-2" />
                <span>Real-time Protection</span>
              </div>
            </animated.div>
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;