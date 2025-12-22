import { motion } from 'framer-motion';

const CyberButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "font-semibold uppercase tracking-wide transition-all duration-300 rounded-xl border-2 relative overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-neon-green to-neon-dark text-black border-neon-green hover:shadow-lg hover:shadow-neon-green/30",
    secondary: "bg-transparent text-neon-green border-neon-green hover:bg-neon-green/10",
    ghost: "bg-cyber-card/30 text-gray-300 border-cyber-border hover:border-neon-green hover:text-neon-green"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={disabled ? {} : { y: -2, scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
};

export default CyberButton;