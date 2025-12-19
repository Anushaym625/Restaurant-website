export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-dark-900 text-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8 text-primary">Privacy Policy</h1>

                <div className="space-y-6 text-white/80">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us, such as when you create an account, make a reservation, place an order, or contact us for support.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">2. How We Use Your Information</h2>
                        <p>We use the information we collect to provider, maintain, and improve our services, including processing transactions, sending order updates, and responding to your comments.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">3. Data Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
