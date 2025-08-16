interface CardProps {
    word: string;
    subject: string;
}

const Card: React.FC<CardProps> = ({ word, subject }) => {
    return (
        <div className="bg-blue-500 text-white rounded-xl shadow-lg p-6 flex flex-col hover:scale-[1.02] transition-transform duration-300 w-72 min-h-[220px]">
            <h3 className="text-xl font-bold mb-3">
                {word}
            </h3>

            <p className="text-sm leading-relaxed text-white/90">
                {subject}
            </p>
        </div>
    );
};

export default Card;
