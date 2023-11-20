
export interface CardProperties {
    author: string,
    title: string,
    content: string,
    date: string,
    category: string
};

export function Card(properties: CardProperties) {
    return (
        <div className="flex flex-col gap-2 bg-gray-100 border-2 border-gray-200 rounded-xl text-black p-3">
            <h2 className="text-xl font-bold"> {properties.title} </h2>
            <h3 className="text-sm text-gray-500"> Posted By: {properties.author} on {properties.date} </h3>
            <p> {properties.content}</p>
            <button className="bg-gray-300" onClick={() => { }}> View Comments </button >
        </div >
    );
}