'use client'

import Button from '@/components/Button'
import Card from '@/components/Card'
import Input from '@/components/TextInput'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { FieldValues, useForm } from 'react-hook-form'

const LoginPage = () => {
  const router = useRouter()
  const { login } = useAuth()

  const {
    handleSubmit,
    formState: { isLoading },
    setError,
    control
  } = useForm()

  const onSubmit = async (data: FieldValues) => {
    const { password } = data

    try {
      const response = await login(password)

      if (response.status !== 200)
        return setError('password', { message: response.message })

      router.push('/testPath')
    } catch (error) {
      return setError('password', { message: 'Something went wrong' })
    }
  }

  return (
    <div className="container flex h-full items-center justify-center">
      <Card>
        {isLoading && <div className="h-2 w-full animate-pulse bg-red" />}

        {!isLoading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="password"
              type="password"
              placeholder="password"
              control={control}
              required
            />
            <Button type="submit">Log in</Button>
          </form>
        )}
      </Card>
    </div>
  )
}

export default LoginPage
