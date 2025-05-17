export default function HomePage() {
    return (
        <div className="flex flex-col gap-6 pt-8">
            {/* Haut */}
            <section className="flex flex-col gap-6 lg:flex-row w-full">
                <section className="bg-white rounded-xl p-4 shadow-md h-[540px] lg:flex-[1]" />
                <section className="bg-white rounded-xl p-4 shadow-md h-[473px] lg:flex-[2.5]" />
                <section className="bg-white rounded-xl p-4 shadow-md h-[473px] lg:flex-[1.3]" />
            </section>

            {/* Bas */}
            <section className="flex flex-col gap-6 lg:flex-row w-full">
                <section className="bg-white rounded-xl p-4 shadow-md h-[228px] lg:flex-[1]" />
                <section className="bg-white rounded-xl p-4 shadow-md h-[294px] lg:flex-[2.2] lg:-translate-y-16" />
            </section>
        </div>
    );
}
