import { motion } from 'framer-motion'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
  as = 'div',
}) {
  const Component = motion[as] ?? motion.div
  return (
    <Component
      className={className}
      initial={{ y }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  )
}
