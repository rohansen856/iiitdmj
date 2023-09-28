import data from "./roadmap.json"

const roadmap = data

export default async function Roadmap(){

    return(
        <div className="flex h-auto w-full flex-col pt-5">
            <section className="mx-auto w-1/2 min-w-[300px]">
                {roadmap.map((i, j)=>(
                    <div className="mx-2 mb-10 flex cursor-pointer pl-7">
                        <span className="relative mr-5 flex h-14 w-14 items-center justify-center text-primary">
                            <p className={`z-20 flex h-full w-full items-center justify-center rounded-full text-xl ${i.completed? "bg-blue-800": "bg-secondary"}`}>{j+1}</p>
                            {
                                data.length > j+1 ? (<span className={`absolute z-10 mt-24 h-14 w-1 ${i.completed? "bg-blue-800": "bg-secondary"}`}></span>)
                                : ""
                            }
                        </span>
                        <span key={j} className={`flex ${i.completed ? "text-secondary line-through":""}`}>
                            <h3 className="my-auto text-3xl">{i.feature.toUpperCase()}</h3>
                        </span>
                    </div>
                ))}
            </section>
        </div>
    )
}