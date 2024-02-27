import Button from '@/components/Button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 self-center grow">
      <h2>Something went wrong!</h2>
      <div className="flex flex-row gap-4">
        <Link href="/dashboard">
          <Button intent="secondary">Go back</Button>
        </Link>
      </div>
    </div>
  )
}
