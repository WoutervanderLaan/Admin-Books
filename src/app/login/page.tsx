'use client'

import { Button } from '@/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/context/AuthContext'
import { TPasswordForm, passwordSchema } from '@/lib/schema/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const LoginPage = () => {
  const router = useRouter()
  const { login } = useAuth()

  const { handleSubmit, setError, control } = useForm<TPasswordForm>({
    resolver: zodResolver(passwordSchema)
  })

  const onSubmit = async (data: TPasswordForm) => {
    const { password } = data

    try {
      const response = await login(password)

      if (response.status !== 200)
        return setError('password', { message: response.message })

      router.push('/dashboard')
    } catch (error) {
      return setError('password', { message: 'Something went wrong' })
    }
  }

  return (
    <div className="container flex h-full items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Log in to access data</CardTitle>
          <CardDescription>
            Get full insights into your financial records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login" onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              control={control}
              rules={{ required: true }}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button form="login" type="submit">
            Log in
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage
