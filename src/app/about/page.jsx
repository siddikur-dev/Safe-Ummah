// app/about/page.jsx

export const metadata = {
  title: 'About — Safe Ummah',
  description: 'Safe Ummah is a community-led platform focused on humanitarian aid, health, and education initiatives.'
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Safe Ummah</h1>
        <p className="text-lg text-gray-700 mb-6">
          Safe Ummah is dedicated to supporting vulnerable communities through emergency relief,
          healthcare initiatives, education support, and livelihood programs. We partner with
          local volunteers and organizations to deliver fast, effective aid where it&apos;s needed most.
        </p>

        <section className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700">To provide timely humanitarian assistance and sustainable support to communities in crisis.</p>
        </section>

        <section className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-3">What We Do</h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>Emergency relief and distribution of basic needs.</li>
            <li>Community health camps and medical support.</li>
            <li>Educational scholarships and school supplies.</li>
            <li>Awareness programs and volunteer mobilization.</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl shadow p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-3">Get Involved</h2>
          <p className="text-gray-700 mb-4">You can help by donating, volunteering, or partnering with us.</p>
          <div className="flex gap-3">
            <a href="/add-appeal" className="inline-block px-4 py-2 bg-[#af002b] text-white rounded-lg">Create Appeal</a>
            <a href="/contact" className="inline-block px-4 py-2 border border-gray-300 rounded-lg">Contact Us</a>
          </div>
        </section>
      </div>
    </main>
  );
}
