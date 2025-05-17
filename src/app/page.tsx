export default function HomePage() {
    return (
        <div className="flex flex-col gap-6 pt-8">
            {/* Haut */}
            <section className="w-full flex gap-6">
                <section className="bg-white rounded-xl p-4 shadow-md flex-[1] h-[540px]" />
                <section className="bg-white rounded-xl p-4 shadow-md flex-[2.5] h-[473px]" />
                <section className="bg-white rounded-xl p-4 shadow-md flex-[1.3] h-[473px]" />
            </section>

            {/* Bas */}
            <section className="w-full flex gap-6">
                <section className="bg-white rounded-xl p-4 shadow-md flex-[1] h-[228px]" />
                <section className="bg-white rounded-xl p-4 shadow-md flex-[2.2] h-[294px] -translate-y-16" />
            </section>
        </div>
    );
}
