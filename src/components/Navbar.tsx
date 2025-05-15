'use client'; 

import { useState } from 'react'; 
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-3 relative">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-sm rounded-full focus:outline-none"
        >
          <span className="sr-only">Abrir menú usuario</span>
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            JP
          </div>
          <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-400" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Link
              href="/perfil"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Mi Perfil
            </Link>
            <Link
              href="/configuracion"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Configuración
            </Link>
            <button
              onClick={() => {
                // Lógica de logout
                console.log('Sesión cerrada');
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        {name : 'Inventario', href: '/inventario'}
    ]

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                {/* Logo y menú móvil */}
                <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">
                    <UserDropdown />
                </Link>
                
                {/* Menú desktop (oculto en móvil) */}
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`${pathname === link.href 
                        ? 'border-blue-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                        {link.name}
                    </Link>
                    ))}
                </div>
                </div>
    
                {/* Botón móvil */}
                <div className="-mr-2 flex items-center sm:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                >
                    {isOpen ? (
                    <XMarkIcon className="block h-6 w-6" />
                    ) : (
                    <Bars3Icon className="block h-6 w-6" />
                    )}
                </button>
                </div>
            </div>
            </div>
    
            {/* Menú móvil (aparece al hacer clic) */}
            {isOpen && (
            <div className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                {links.map((link) => (
                    <Link
                    key={link.name}
                    href={link.href}
                    className={`${pathname === link.href
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                    onClick={() => setIsOpen(false)}
                    >
                    {link.name}
                    </Link>
                ))}
                </div>
            </div>
            )}
        </nav>
        );
}