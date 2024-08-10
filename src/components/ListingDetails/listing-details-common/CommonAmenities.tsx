const CommonAmenities = ({data}: any) => {

    const spittedArr = data?.services?.split(',')
    return (
        <>
            <h5 className="mb-20">Services</h5>
            <p className="fs-20 lh-lg pb-25"></p>
            <ul className="style-none d-flex flex-wrap justify-content-between list-style-two">
                {spittedArr?.map((list, i) => (
                    <li key={i}>{list}</li>
                ))}
            </ul>
        </>
    )
}

export default CommonAmenities
