import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
  as = 'div',
}) {
  const Component = motion[as] ?? motion.div
  // With "reduce motion" on, the content is simply there — no travel, no
  // transition — instead of sliding into place on every scroll.
  const reduced = useReducedMotion()
  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }
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
