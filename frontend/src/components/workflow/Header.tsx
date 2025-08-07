import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeaderProps {}

export const Header = () => {
  return (
    <header className="h-16 border-b border-border bg-surface/80 backdrop-blur-xl flex items-center justify-between px-6">
      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center glow-primary">
            <Image
              src="/logo.png"
              alt="Automate2Code Logo"
              width={40}
              height={40}   
                className="w-8 h-8"
            />
          </div>
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Automate2Code
          </h1>
        </div>
      </motion.div>

      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Button 
          className="gradient-primary hover-glow font-medium px-4"
          size="sm"
        >
          Run Workflow
        </Button>
      </motion.div>
    </header>
  );
};

export default Header;