import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <Hero />

      {/* Features Preview Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Diagnostic?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine medical knowledge with advanced algorithms to provide accurate health insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Symptom Checker", desc: "Select from over 500+ symptoms to get instant analysis." },
              { title: "Health History", desc: "Keep track of your vitals and past diagnoses securely." },
              { title: "Lifestyle Guide", desc: "Get personalized recommendations locally tailored to you." }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Preview */}
      <footer className="py-8 border-t text-center text-sm text-muted-foreground">
        © 2024 Diagnostic Platform. Not medical advice.
      </footer>
    </div>
  );
}
