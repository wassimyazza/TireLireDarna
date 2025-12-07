import React from 'react'

const ContactPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
            <div className="max-w-2xl">
                <p className="text-lg mb-8">
                    Have questions? We'd love to hear from you.
                </p>

                <div className="space-y-4 mb-8">
                    <p><strong>Email:</strong> contact@darna.com</p>
                    <p><strong>Phone:</strong> +212 XXX-XXXX</p>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="block mb-2 font-semibold">Name</label>
                        <input type="text" className="w-full border rounded px-4 py-2" />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">Email</label>
                        <input type="email" className="w-full border rounded px-4 py-2" />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">Message</label>
                        <textarea className="w-full border rounded px-4 py-2 h-32"></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ContactPage
