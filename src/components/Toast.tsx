import { IconSparkles } from './Icons'

export function Toast({ message }: { message: string }) {
  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-icon">
        <IconSparkles size={15} />
      </span>
      <span>{message}</span>
    </div>
  )
}
