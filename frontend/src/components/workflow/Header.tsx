import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeaderProps {
  selectedLanguage: 'javascript' | 'python';
  onLanguageChange: (language: 'javascript' | 'python') => void;
  isCodePanelVisible: boolean;
  onToggleCodePanel: () => void;
}

export const Header = ({ 
  selectedLanguage, 
  onLanguageChange, 
  isCodePanelVisible, 
  onToggleCodePanel 
}: HeaderProps) => {
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
          <p className="text-xs text-muted-foreground">Visual Automation to Code</p>
        </div>
      </motion.div>

      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex bg-surface border border-border rounded-lg p-1">
          <Button
            variant={selectedLanguage === 'javascript' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onLanguageChange('javascript')}
            className="text-xs px-3 transition-all duration-200"
          >
            <Code2 className="w-3 h-3 mr-1" />
            JavaScript
          </Button>
          <Button
            variant={selectedLanguage === 'python' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onLanguageChange('python')}
            className="text-xs px-3 transition-all duration-200"
          >
            <Code2 className="w-3 h-3 mr-1" />
            Python
          </Button>
        </div>
      </motion.div>

      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleCodePanel}
          className="hover-lift"
        >
          {isCodePanelVisible ? (
            <EyeOff className="w-4 h-4 mr-2" />
          ) : (
            <Eye className="w-4 h-4 mr-2" />
          )}
          {isCodePanelVisible ? 'Hide Code' : 'Show Code'}
        </Button>

        <Button 
          className="gradient-primary hover-glow font-medium px-4"
          size="sm"
        >
          Export Workflow
        </Button>
      </motion.div>
    </header>
  );
};

export default Header;