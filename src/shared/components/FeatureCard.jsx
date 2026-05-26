function FeatureCard({ title, description, icon }) {
    return (
        <div className="card-glass">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left w-min">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-on-secondary">{title}</h3>
            <p className="text-on-secondary/60 leading-relaxed">
                {description}
            </p>
        </div>
    );
}

export { FeatureCard };