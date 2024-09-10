import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { NextResponse } from 'next/server'
import z from 'zod'

const passwordSchema = z.string().min(8)

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    passwordSchema.parse(password)

    const isPasswordValid = await bcrypt.compare(
      password,
      process.env.HASHED_PASSWORD!
    )

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const accessToken = await new SignJWT({
      user: 'ADMIN',
      issuedAt: new Date(Date.now())
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('15m')
      .sign(new TextEncoder().encode(process.env.AUTH_KEY!))

    const refreshToken = await new SignJWT({
      user: 'ADMIN',
      issuedAt: new Date(Date.now())
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('15m')
      .sign(new TextEncoder().encode(process.env.REFRESH_KEY!))

    const response = NextResponse.json(
      { message: 'Login successful', accessToken },
      { status: 200 }
    )

    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 15
    })

    response.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    )
  }
}
