// app/news/page.jsx

export const metadata = {
  title: 'News — Safe Ummah',
  description: 'Latest updates and highlights from the Safe Ummah community.'
};

const staticNews = [
  {
    id: 1,
    title: 'Community Relief Drive Successfully Completed',
    date: 'Nov 20, 2025',
    summary:
      'Volunteers distributed emergency food and hygiene supplies to 300+ families in the affected districts.'
  },
  {
    id: 2,
    title: 'Free Health Camp Reaches Remote Villages',
    date: 'Oct 30, 2025',
    summary:
      'Partner clinics provided free consultations, medicines, and follow-up referral support during the two-day camp.'
  },
  {
    id: 3,
    title: 'Education Grants Awarded to 50 Students',
    date: 'Sep 15, 2025',
    summary:
      'Scholarships awarded to bright children from low-income families to support continued schooling.'
  },
  {
    id: 4,
    title: 'Volunteer Training: Disaster Response Basics',
    date: 'Aug 9, 2025',
    summary:
      'A 3-day training improved readiness among local volunteers for rapid response and first aid.'
  }
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Latest News</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Stay updated with the most recent community efforts, initiatives, and success stories from Safe Ummah.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {staticNews.map((n) => (
            <article key={n.id} className="bg-white rounded-2xl shadow p-5 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900">{n.title}</h2>
                <time className="text-sm text-gray-500">{n.date}</time>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{n.summary}</p>

              <div className="flex items-center justify-between">
                <a href="#" className="text-sm text-[#af002b] font-medium">Read more →</a>
                <button className="text-sm bg-gray-100 px-3 py-1 rounded-md text-gray-700">Share</button>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10 bg-white rounded-2xl shadow p-6 border border-gray-200">
          <h3 className="text-2xl font-semibold mb-3">Want to contribute news?</h3>
          <p className="text-gray-700 mb-4">If you have updates, impact stories, or event summaries to share, please contact the team or create an appeal with highlights.</p>
          <div className="flex gap-3">
            <a href="/add-appeal" className="inline-block px-4 py-2 bg-[#af002b] text-white rounded-lg">Create Appeal</a>
            <a href="/contact" className="inline-block px-4 py-2 border border-gray-300 rounded-lg">Contact Us</a>
          </div>
        </section>
      </div>
    </main>
  );
}
