import ImageSized from "@components/ImageSized"

export default function Test() {
    const urla = 'https://file.notion.so/f/s/4f5929b2-8bdb-40be-8543-7f8436cd827a/23f4c687fb7b69d4a7bd30d3c54b7153.jpg?id=145f1d6c-06ca-4fc0-8038-99dfb7cdf2b0&table=block&spaceId=e53b7095-804a-4959-8187-7c4d6de95370&expirationTimestamp=1685946787891&signature=tqRa0tXy-LJkXUNxJy1LPYXUijx_GfNQfV2UaK0i2ps&downloadName=23f4c687fb7b69d4a7bd30d3c54b7153.jpg'
    return(
        <div style={{display: 'flex'}}>
        <div style={{width: '30%'}}> QQQQQQQQQ
            <ImageSized
                url={urla}
            />
        </div>
                <div style={{width: '20%'}}> QQQQQQQQQ
                <ImageSized
                    url={urla}
                />
            </div>
                    <div style={{width: '10%'}}> QQQQQQQQQ
                    <ImageSized
                        url={urla}
                    />
                </div>
        </div>
    )
}