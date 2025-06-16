import React from 'react';
import {NavLink} from 'react-router-dom';
import {Github} from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header
            className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-md px-4 py-3 transition-colors duration-200">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <NavLink to="/" className="flex items-center space-x-2">
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                            StorageClass.info
                        </p>
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium">
              CSI Drivers
            </span>
                    </NavLink>

                    <nav className="hidden md:flex space-x-4">
                        <NavLink
                            to="/drivers"
                            className={({isActive}) =>
                                `text-sm ${isActive
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                }`
                            }
                        >
                            Drivers
                        </NavLink>
                        <NavLink
                            to="/storage-class"
                            className={({isActive}) =>
                                `text-sm ${isActive
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                }`
                            }
                        >
                            What is StorageClass?
                        </NavLink>
                        <NavLink
                            to="/glossary"
                            className={({isActive}) =>
                                `text-sm ${isActive
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                }`
                            }
                        >
                            Glossary
                        </NavLink>
                        <NavLink
                            to="/sponsors"
                            className={({isActive}) =>
                                `text-sm ${isActive
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                }`
                            }
                        >
                            Sponsors
                        </NavLink>
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    <a
                        href="https://github.com/storageclass/storageclass"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                        aria-label="GitHub"
                    >
                        <Github size={20}/>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;