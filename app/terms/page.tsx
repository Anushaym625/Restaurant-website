export default function TermsPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-dark-900 text-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8 text-primary">Terms of Service</h1>

                <div className="space-y-6 text-white/80">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
                        <p>By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">2. Reservations and Orders</h2>
                        <p>All reservations and orders are subject to availability. We reserve the right to refuse service to anyone for any reason at any time.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">3. User Accounts</h2>
                        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
