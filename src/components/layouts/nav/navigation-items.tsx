'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/account/user-dropdown'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { LogIn } from 'lucide-react'
import { SideBar } from './side-bar'
import { useAuthContext } from '@/context/auth-context'

export function NavItems(): React.ReactElement {
    const { isLoadingSession, session } = useAuthContext()
    console.log(isLoadingSession, session)

    return (
        <NavigationMenu>
            <NavigationMenuList className="flex">
                <NavigationMenuItem>
                    {!session ? (
                        <Link href="/login" passHref>
                            <Button variant="outline">
                                <LogIn size={16} />
                            </Button>
                        </Link>
                    ) : (
                        <UserNav {...session} />
                    )}
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <SideBar />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
