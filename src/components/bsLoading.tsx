export const Loading = () => {
    return (
        <>
            <div className="wrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="loading">
                    <div className="bounceball relative inline-block h-4 w-4 content-[''] animate-wiggle">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    </div>
                    <div className="text text-[#0092f4] inline-block ml-1 capitalize">now loading</div>
                </div>
            </div>
        </>
    )
}