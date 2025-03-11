import { UserIcon, LockKeyhole } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { name: 'My Profile', href: '/profile', icon: UserIcon },
  { name: 'Change Password', href: '/profile/password', icon: LockKeyhole }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs() {
  const location = useLocation();

  return (
    <div className='mb-10'>
      {/* Elimina el select y ajusta el diseño para que sea responsive */}
      <div className='border-b border-gray-200'>
        <nav className='flex space-x-8 overflow-x-auto' aria-label='Tabs'>
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              to={tab.href}
              className={classNames(
                location.pathname === tab.href
                  ? 'border-purple-800 text-purple-800'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
              )}
            >
              <tab.icon
                className={classNames(
                  location.pathname === tab.href
                    ? 'text-purple-800'
                    : 'text-gray-400 group-hover:text-gray-500',
                  '-ml-0.5 mr-2 h-5 w-5'
                )}
                aria-hidden='true'
              />
              <span>{tab.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
