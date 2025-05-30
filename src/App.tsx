import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DriversPage from './pages/DriversPage';
import StorageClassPage from './pages/StorageClassPage';
import SponsorsPage from './pages/SponsorsPage';
import GlossaryIndexPage from "./pages/GlossaryIndexPage.tsx";
import GlossaryContentPage from "./pages/GlossaryContentPage.tsx";

function App() {
    const [isDarkMode] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    return (
        <Router>
            <div className={`${isDarkMode ? 'dark' : ''}`}>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                    <Header/>

                    <main className="container mx-auto px-4 py-6">
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/drivers" element={<DriversPage/>}/>
                            <Route path="/storage-class" element={<StorageClassPage/>}/>
                            <Route path="/glossary" element={<GlossaryIndexPage/>}/>
                            <Route path="/glossary/:file" element={<GlossaryContentPage/>}/>
                            <Route path="/sponsors" element={<SponsorsPage/>}/>
                        </Routes>
                    </main>

                    <Footer/>
                </div>
            </div>
        </Router>
    );
}

export default App;