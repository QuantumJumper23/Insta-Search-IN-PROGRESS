
console.log("INSTA SEARCH IS RUNNINGss");

const originalFetch = window.fetch;
console.log("FETCH WRAPPER INSTALLED", window.location.href);

window.fetch = async (...args) => {
    const url = String(args[0]);

  

    const response = await originalFetch(...args);
         

         if (url.includes("graphql") || url.includes("/api/v1")) {
        console.log("MATCHED URL:", response.url);

        try {
            const data = await response.clone().json();
            const posts = extractPosts(data);

            console.log("EXTRACTED POSTS:", posts);
        } catch (error) {
            console.log("Could not extract posts:", error);
        }
    }

    return response;
};
const originalOpen=XMLHttpRequest.prototype.open;
const originalSend=XMLHttpRequest.prototype.send;
//check the url when instagram opens a request
XMLHttpRequest.prototype.open=function(method,url: string|URL,...otherArguments:any[])
{
    (this as any).requestUrl=String(url);

    return (originalOpen.call as any)(this ,method,url,...otherArguments);
}
XMLHttpRequest.prototype.send=function(...argumentToSend:any[])
{
    this.addEventListener("load",function(){
        const url=(this as any).requestUrl;
       console.log("XHR FINISHED:",url);
        if(url&&url.includes("api/graphql"))
        {
            console.log("instagram request found",url);
            try{
                const data=JSON.parse(this.responseText);
                const posts=extractPosts(data);
                console.log("Extracted posts:",posts);
                window.postMessage({type:"insta_posts",posts:posts},window.location.origin);

            }catch(error)
            {
                console.log("could not extract posts",error);
            }
        }
    });
    return originalSend.call(this,argumentToSend[0]);
}

function extractPosts(data: any) {
    const edges =
        data.data?.xdt_api__v1__feed__user_timeline_graphql_connection?.edges ?? [];

    const posts = [];

    for (const edge of edges) {
        const post = edge.node;

        posts.push({
            id: post.id,
            caption: post.caption?.text || "",
            date: post.taken_at,
            url: "https://www.instagram.com/p/" + post.code + "/"
        });
    }

    return posts;
}
