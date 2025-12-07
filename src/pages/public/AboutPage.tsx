import React from 'react'

const AboutPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8">About Darna</h1>
            <div className="prose max-w-3xl">
                <p className="text-lg mb-4">
                    Darna is a comprehensive platform that combines real estate services with innovative
                    savings group functionality through our Tirelire feature.
                </p>
                <p className="text-lg mb-4">
                    We help people find their dream properties while also providing a way to save money
                    together through trusted community groups.
                </p>
            </div>
        </div>
    )
}

export default AboutPage
