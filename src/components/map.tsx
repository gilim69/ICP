export default function Map(props) {
    return (
        <>
            <div className="event-head">Map of event</div>
            <div className="event-map"><iframe height="80%" src={props.url}></iframe></div>
        </>
    )
}