import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/authActions';
import { FaRegUserCircle } from 'react-icons/fa';
import { CiShoppingCart, CiSearch } from 'react-icons/ci';
import { GiHamburgerMenu } from "react-icons/gi";

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem
} from '@/components/ui/navigation-menu';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import CartSidebar from './CartSiderbar';
import { SidebarProvider } from './ui/sidebar';

const Navbar = () => {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navlinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/cart' },
        { name: 'Product', path: '/products' },
        { name: 'Contact Us', path: '/' },
    ];

    const icons = [
        { icon: <CiSearch />, onClick: () => console.log('Search icon clicked') },
        { icon: <CiShoppingCart />, onClick: () => navigate('/cart') },
        {
            icon: <FaRegUserCircle />,
            dropdown: true
        }
    ];

    const handleNavigation = (path: string) => navigate(path);

    const handleAuthAction = () => {
        if (isAuthenticated) {
            dispatch(logout());
        } else {
            navigate('/auth');
        }
    };

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex justify-between items-center py-4 px-4 md:px-8">

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="w-10 h-10 flex justify-center items-center">
                            <GiHamburgerMenu />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48">
                            {navlinks.map(({ name, path }, index) => (
                                <DropdownMenuItem key={index} onClick={() => handleNavigation(path)}>
                                    {name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <h2 className="text-xl font-bold">3legent.</h2>

                <div className="hidden md:flex">
                    <NavigationMenu>
                        <NavigationMenuList className="flex">
                            {navlinks.map(({ name, path }, index) => (
                                <NavigationMenuItem key={index} className="px-5">
                                    <Button variant="ghost" onClick={() => handleNavigation(path)}>
                                        {name}
                                    </Button>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>


                    </NavigationMenu>
                </div>

                <div className="flex items-center gap-4">
                    {icons.map(({ icon, onClick, dropdown }, index) => (
                        <div key={index} className="relative">
                            {dropdown ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="w-10 h-10 flex justify-center items-center">
                                        {icon}
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>
                                            {isAuthenticated ? `Hey, ${user.email}` : 'My Account'}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Billing</DropdownMenuItem>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleAuthAction}>
                                            {isAuthenticated ? 'Logout' : 'Login'}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button variant="ghost" className="w-10 h-10" onClick={onClick}>
                                    {icon}
                                </Button>
                            )}
                        </div>
                    ))}
                </div>


            </div>

            {/* Debug Section: Remove in production */}
            {/* <div className="mt-4 text-sm text-gray-600">
                {JSON.stringify(user, null, 2)}
            </div> */}
        </div>
    );
};

export default Navbar;
