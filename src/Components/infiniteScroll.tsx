import React, { useEffect, useState, useRef  } from 'react';
//import './styles.css';

const InfiniteScroll = () => {
    const [postList, setPostList] = useState<number[]>([]);
    // const i = Number(100)
    // while (i>100){
    //     setPostList([i])
    // } 
    // tracking on which page we currently are
    const [page, setPage] = useState(1);
    // add loader refrence 
    const loader = useRef<HTMLDivElement>(null);

    useEffect(() => {
         var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
         };
        // initialize IntersectionObserver
        // and attaching to Load More div
         const observer = new IntersectionObserver(entities=> {
             const target = entities[0];
             if (target.isIntersecting) {   
                setPage((page) => page + 1)
            }
            }, options);
         if (loader.current) {
            observer.observe(loader.current)
         }

    }, []);


    useEffect(() => {
        // here we simulate adding new posts to List
        const newList = Number(postList.concat([10,11,12,13]));
        setPostList([
            ...postList, newList
        ])
    }, [page, postList])

    // here we handle what happens when user scrolls to Load More div
   // in this case we just update page variable
    // const handleObserver = (entities) => {
    //     const target = entities[0];
    //     if (target.isIntersecting) {   
    //         setPage((page) => page + 1)
    //     }
    // }


    return (
        <>
        <div className="container" >
        <div className="post-list">
            {
                postList.map((post, index) => {
                    return (<div key={index} className="post" >
                        <h2> {post } </h2>
                    </div>)
                })
            }
            
            <div className="loading" ref={loader}>
                    <h2>Load More</h2>
           </div>
        </div>
    </div>
    </>
    )
}

export default InfiniteScroll;