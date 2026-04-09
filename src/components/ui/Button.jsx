// src/components/ui/Button.jsx
import { motion } from 'framer-motion';
import './Button.css';

export default function Button({
  children,
  variant = 'gold',
  size = 'md',
  icon,
  iconRight,
  disabled,
  loading,
  onClick,
  type = 'button',
  fullWidth,
  className = '',
}) {
  return (
    <motion.button
      type={type}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${loading ? 'btn--loading' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {loading && <span className="btn-spinner" />}
      {icon && !loading && <span className="btn-icon">{icon}</span>}
      <span className="btn-label">{children}</span>
      {iconRight && !loading && <span className="btn-icon-right">{iconRight}</span>}
    </motion.button>
  );
}
