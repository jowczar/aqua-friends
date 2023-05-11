type DashboardCardProps = {
    icon: string;
    text: string;
    title: string;
    link: string;
}; 

const DashboardCard = ({ icon, text, title, link }: DashboardCardProps) => {
    return (
        <a href={link} className="aspect-[4/3] h-full w-full bg-white hover:bg-gray-50 transition flex flex-col items-center justify-center rounded-3xl px-8 py-6 drop-shadow">
            <div className="bg-primary w-32 h-32 rounded-2xl flex items-center justify-center">
                <img src={icon} alt="icon" className="w-16 h-16" />
            </div>
            <h3 className="text-center font-bold text-xl mt-6">{title}</h3>
            <p className="text-center text-base text-gray-500 mt-4 leading-6">{text}</p>
        </a>
    );
};

export default DashboardCard;