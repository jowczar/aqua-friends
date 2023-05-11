import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import classNames from "classnames";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [navigation, setNavigation] = useState([
        { name: 'Home', href: '/', current: true },
        { name: 'Aqua monitor', href: '/monitor', current: false },
        { name: 'Aqua view', href: '/view', current: false },
        { name: 'Aqua creator', href: '/creator', current: false },
        { name: 'Aqua history', href: '/history', current: false },
    ]);
    const user = null;

    useEffect(() => {
        setNavigation(navigation.map((nav) => {
            nav.current = nav.href === pathname;
            return nav;
        }));
    }, [pathname]);

    const signOut = () => {
        const auth = getAuth();
        auth.signOut();
        router.push("/login");
    }

    return (
        <Disclosure as="nav" className="bg-primary shadow-sm">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      <svg className="w-6 h-6" color="white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                        <Link href="/" className="flex items-center">
                            <Image 
                                src="logo.svg"
                                alt="Aqua friends"
                                height={32}
                                width={166}
                                className="sm:scale-100 scale-75"
                            />
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? 'text-primary bg-white' : 'text-white hover:bg-blue-800',
                              'rounded-md px-3 py-2 text-sm transition'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex flex-row gap-3 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button
                      type="button"
                      className="rounded-full bg-white w-8 h-8 group flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View messages</span>
                      <Image src="chat.svg" alt="chat" className="group-hover:scale-110 transition" height={16} width={18} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="rounded-full bg-white h-8 w-8 group flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View favorites</span>
                      <Image src="heart.svg" alt="heart" className="group-hover:scale-110 transition" height={16} width={18} aria-hidden="true" />
                    </button>
    
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                      <div>
                        <Menu.Button className="flex rounded-full group bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img className="w-8 h-8 transition group-hover:scale-110 rounded-full" src={user?.photoURL || "man.png"} alt="user photo" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(active ? 'bg-blue-50' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(active ? 'bg-blue-50' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                onClick={signOut}
                                className={classNames(active ? 'bg-blue-50' : '', 'block select-none cursor-pointer px-4 py-2 text-sm text-gray-700')}
                              >
                                Sign out
                              </span>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
    
              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
    );
}

export default Navbar;
