import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { logout } from '@/http/api'
import { useAuthStore } from '@/store'
import { useTheme } from '../ui/theme-provider'
import { Link } from 'react-router-dom'

type Props = {
    setIsMenuOpen?: (arg: boolean) => void
}

const Header = ({ setIsMenuOpen }: Props) => {
    const { logout: storeLogout, user } = useAuthStore()
    const { theme, setTheme } = useTheme()

    const { mutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: logout,
        onSuccess: () => {
            storeLogout()
        }
    })

    return (
        // ${!user ? 'md:fixed top-0 w-full' : ''}
        <header className={`dark:border-b shadow bg-background dark:bg-transparent `}>
            <div className="mx-auto px-4">
                <div className={`flex md:flex-row ${!user ? 'flex-col' : ''} justify-between items-center py-5`}>
                    <div className="logo text-primary text-3xl italic font-bold text-center">
                        {!user && <h1><Link to={'/'}>CapShare</Link></h1>}
                        {user && setIsMenuOpen && <button onClick={() => setIsMenuOpen(true)}><i className="fa-solid fa-bars text-gray-500 lg:hidden"></i></button>}
                    </div>
                    {!user &&
                        <div className='my-2'>
                            <Link className='dark:text-white hover:text-primary transition-all py-1 px-1 md:px-3 rounded' to={'/'}>Home</Link>
                            <Link className='dark:text-white hover:text-primary transition-all py-1 px-1 md:px-3 rounded' to={'/auth/login'}>Login</Link>
                            <Link className='dark:text-white hover:text-primary transition-all py-1 px-1 md:px-3 rounded' to={'/auth/signup'}>Signup</Link>
                        </div>
                    }

                    <div className='flex items-center gap-2'>
                        {!user && <Link className='bg-primary text-white py-1 px-3 rounded' to={'/auth/photo-selection'}>Photo Selection</Link>}
                        <div>

                            {
                                theme === 'dark' ?
                                    <Button onClick={() => setTheme('light')} variant='outline' className='rounded-full w-8 h-8 p-0'>
                                        <i className="fa-solid fa-sun"></i>
                                    </Button>
                                    :
                                    <Button onClick={() => setTheme('dark')} variant='outline' className='rounded-full w-8 h-8 p-0'>
                                        <i className="fa-solid fa-moon"></i>
                                    </Button>
                            }
                        </div>

                        {
                            user ?
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="outline">{user.name}
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="border p-5" align="end">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {/* <DropdownMenuItem className="hover:cursor-pointer">Profile</DropdownMenuItem> */}
                                        <DropdownMenuItem className="hover:cursor-pointer">
                                            <button onClick={() => mutate()} >Logout</button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                : ''
                        }


                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header