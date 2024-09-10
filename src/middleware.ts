import { jwtVerify, SignJWT } from 'jose'
import { JWTExpired } from 'jose/errors'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value

  const { pathname } = request.nextUrl

  if (!token && pathname === '/login') {
    /// user navigates to login page to retrieve token
    const response = NextResponse.next()
    response.headers.delete('x-user-authenticated')
    return response
  }

  if (!token) {
    const response = NextResponse.redirect(new URL('/login', request.url)) /// user tries to access unauthorized route, should redirect
    response.headers.delete('x-user-authenticated')
    return response
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_KEY!)) /// token, therefore we verify

    if (pathname === '/login')
      /// user should not navigate to login page if already authorized
      return NextResponse.redirect(new URL('/', request.url))

    const response = NextResponse.next()
    response.headers.set('x-user-authenticated', 'true') /// if verified we authorize user
    return response
  } catch (error) {
    if ((error as JWTExpired).code === 'ERR_JWT_EXPIRED' && refreshToken) {
      console.log('Access token expired, trying to refresh')

      try {
        await jwtVerify(
          refreshToken,
          new TextEncoder().encode(process.env.REFRESH_KEY!)
        )
        const response = NextResponse.next()

        const accessToken = await new SignJWT({
          user: 'ADMIN',
          issuedAt: new Date(Date.now())
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('15m')
          .sign(new TextEncoder().encode(process.env.AUTH_KEY!))

        response.cookies.set('access_token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 15
        })

        return response
      } catch (error) {
        console.log('REFRESH_ERROR', error)

        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('access_token')
        response.cookies.delete('refresh_token')
        response.headers.delete('x-user-authenticated')
        return response
      }
    }

    // If there's some other error or the token is invalid, redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('access_token')
    response.cookies.delete('refresh_token')
    response.headers.delete('x-user-authenticated')
    return response
  }
}

export const config = {
  matcher: ['/dashboard', '/api/auth/check', '/login', '/testPath'] // TODO: I want to match everything and filter on protected routes within middleware
}
