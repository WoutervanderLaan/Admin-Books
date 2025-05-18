import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex grow flex-col items-center gap-4 self-center">
      <h2>Something went wrong!</h2>
      <div className="flex flex-row gap-4">
        <Link href="/dashboard">
          <Button variant="secondary">Go back</Button>
        </Link>
      </div>
    </div>
  )
}
