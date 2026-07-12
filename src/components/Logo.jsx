import clipwingLogo from '../assets/logo/clipwing-logo.svg'

export default function Logo({ className = '' }) {
  return (
    <img
      src={clipwingLogo}
      alt="Clipwing"
      className={`h-9 w-auto ${className}`}
    />
  )
}
