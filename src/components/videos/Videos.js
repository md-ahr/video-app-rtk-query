// import { useEffect, useState } from "react";
import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
    // const [request, setRequest] = useState(false);

    const { data: videos, isLoading, isError } = useGetVideosQuery();

    // const {
    //     data: videos,
    //     isLoading,
    //     isError,
    // } = useGetVideosQuery(undefined, { skip: !request }); // skip specific request -> skip: true [defualt -> false]

    // const { data: videos, isLoading, isError, refetch } = useGetVideosQuery();

    // const {
    //     data: videos,
    //     isLoading,
    //     isError,
    // } = useGetVideosQuery(undefined, { pollingInterval: 3000 }); // pollingInterval: default -> off, refetch automatic after 3s

    // useEffect(() => {
    //     // setRequest(true);
    //     refetch(); // if data changes then refecth function call, refetch automatic on user action
    // }, [refetch]);

    // decide what to render
    let content = null;

    if (isLoading) {
        content = (
            <>
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
                <VideoLoader />
            </>
        );
    }

    if (!isLoading && isError) {
        content = <Error message="There was an error" />;
    }

    if (!isLoading && !isError && videos?.length === 0) {
        content = <Error message="No videos found!" />;
    }

    if (!isLoading && !isError && videos?.length > 0) {
        content = videos.map((video) => <Video key={video.id} video={video} />);
    }

    return content;
}
