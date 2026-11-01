import { addPost } from "./db";

console.log("Bridge is running");

window.addEventListener("message", async (event: MessageEvent) => {

    // Verify message sender
    if (event.source !== window) return;
    if (event.origin !== window.location.origin) return;

    const message = event.data;

    // Accept only Instagram post messages
    if (message.type !== "INSTAGRAM_POSTS") return;

    console.log("Posts received:", message.posts);

    for (const post of message.posts) {
        try {
            await addPost({
                id: post.id,
                caption: post.caption,
                date: post.date,
                url: post.url,
                image: null
            });

            console.log("Saved:", post.id);

        } catch (error) {
            console.error("Save failed:", error);
        }
    }
});