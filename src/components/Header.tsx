'use client'

import Button from './Button'
import LogoutIcon from '../icons/Logout'
import LoginIcon from '../icons/Login'
// import XLSXtoJSONConverter from "../Converter";

export const Header = () => {
  return (
    <header>
      <div className="flex flex-row w-full justify-between items-center px-5 py-4 shadow-md">
        <div className="cursor-pointer flex flex-row items-center gap-8">
          <h1 className="text-xl">BOOKS</h1>
          {/* <XLSXtoJSONConverter /> */}
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Button
            intent="secondary"
            onClick={() => console.log('logout')}
            icon={<LogoutIcon />}
          >
            Log out
          </Button>

          <Button onClick={() => console.log('login')} icon={<LoginIcon />}>
            Log in
          </Button>
        </div>
      </div>
    </header>
  )
}
