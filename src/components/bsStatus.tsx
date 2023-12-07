import moment from "moment";

export default function BsStatus(props: { date: any, num: number | null | undefined, dimensions: { width: number, height: number } | undefined, dateSelected: Function }) {
    const dateChanged = (event: any) => {
        if (event!.target!.value) {
            props.dateSelected(event.target.value);
        } else {
            alert('Invalid Date Selected!!!');
        }
    }
    return (
        <>
            <div className="flex items-center w-full py-8 px-4 mx-auto max-w-screen-xl sm:pb-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h2 className="mb-4 text-4xl flex flex-col tracking-tight text-[#00C5EF] font-extrabold leading-tight dark:text-white space-y-2">
                        <span>Stay Connected </span>
                        <span>Track Results on Date Selected</span>
                    </h2>
                    {
                        props.date ?
                            <section>
                                <p className="mb-6 font-sm text-gray-500 dark:text-gray-400 text-2xl md:text-4xl">{props.date && moment(props.date).format('DD-MM-YYYY') || 'No Date Selected'}
                                    {
                                        (props.dimensions!.width < 1024) &&
                                        <button type="button" className="text-[#0092f4] mx-2 border border-[#0092f4] relative hover:bg-[#0092f4] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                                            <img src="/filter.svg" width={16} height={16} alt="Filter" />
                                            <input className="hidden-input absolute left-0 opacity-0 w-10 h-10" type="date" onChange={dateChanged} />
                                        </button>
                                    }
                                </p>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-3 col-sm-6">
                                            <div className="text-white shadow-[0_0_15px_-5px_rgba(0,0,0,0.3)] z-[1] mx-auto my-0 pt-10 pb-5 px-5 rounded-[10px_10px_100px_100px] bg-gradient-to-r from-[#00C5EF] to-[#0092f4] text-center w-48 h-48 overflow-hidden relative">
                                                <span className="counter-value  text-3xl">{props.num ? <h2 className="text-7xl">{props.num}</h2> : "No Number found"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            :
                            <p className="mb-6 font-sm text-gray-500 dark:text-gray-400 md:text-2xl">{props.date && moment(props.date).format('DD-MM-YYYY') || 'No Date Selected'}</p>
                    }
                </div>
            </div >
        </>
    )
}