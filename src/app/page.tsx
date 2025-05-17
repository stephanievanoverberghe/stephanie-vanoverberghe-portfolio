import Contact from '@/components/Contact';

export default function HomePage() {
    return (
        <div className="flex flex-col gap-6 pt-8">
            {/* Mobile + Tablette = 1 grille, Desktop = 2 lignes flex */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
                <section className="bg-white rounded-xl p-4 border-r border-b border-[#0384E0]">
                    <Contact />
                </section>
                <section className="bg-white rounded-xl p-4 shadow-md h-[473px]" />
                <section className="bg-white rounded-xl p-4 shadow-md h-[473px]" />
                <section className="bg-white rounded-xl p-4 shadow-md h-[228px]" />
                <section className="bg-white rounded-xl p-4 shadow-md h-[294px]" />
            </div>

            {/* Desktop only */}
            <div className="hidden lg:flex flex-col gap-6">
                {/* Ligne du haut */}
                <section className="flex gap-6 w-full">
                    <section className="bg-white rounded-xl p-4 border-r border-b border-[#0384E0] flex-[1]">
                        <Contact />
                    </section>
                    <section className="bg-white rounded-xl p-4 shadow-md h-[473px] flex-[2.5]" />
                    <section className="bg-white rounded-xl p-4 shadow-md h-[473px] flex-[1.3]" />
                </section>

                {/* Ligne du bas */}
                <section className="flex gap-6 w-full">
                    <section className="bg-white rounded-xl p-4 shadow-md h-[228px] flex-[1]" />
                    <section className="bg-white rounded-xl p-4 shadow-md h-[294px] flex-[2.2]" />
                </section>
            </div>
        </div>
    );
}
