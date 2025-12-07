import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Darna</h3>
                        <p className="text-gray-400">
                            Your trusted platform for real estate and savings groups
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/properties" className="text-gray-400 hover:text-white">Browse Properties</Link></li>
                            <li><Link to="/tirelire/groups" className="text-gray-400 hover:text-white">Join Groups</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                            <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <div className="space-y-2 text-gray-400">
                            <p>Email: contact@darna.com</p>
                            <p>Phone: +212 XXX-XXXX</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Darna. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
