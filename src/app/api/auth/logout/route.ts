import { NextResponse } from 'next/server'

export async function DELETE(req: Request) {
  try {
    const response = NextResponse.json(
      { message: 'Logged out' },
      { status: 200 }
    )

    response.cookies.delete('access_token')
    response.cookies.delete('refresh_token')

    return response
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong: ${error}` },
      { status: 500 }
    )
  }
}
