import PostCard from "@/components/PostCard"
async function loadPostsSSR() {
    // 1. SSR - Server Side Rendering (sin cache)
    const res = await fetch('https://jsonplaceholder.typicode.com/posts',
        { cache: 'no-store' }) // Siempre actualizado, sin cache
        return res.json()
}

// 2. SSG - Static Site Generation (caché completo)
async function loadPostsSSG() {
    // 2. ISR - Incremental Static Regeneration (con cache)
    const res = await fetch('https://jsonplaceholder.typicode.com/posts',
        { cache: 'force-cache' }) // Por defecto, cache permanente
    return res.json()
}
//3. ISR - Incremental Static Regeneration (cache con revalidacion)
async function loadPostsISR() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts',
        { next: { revalidate: 3600 } }) // Revalida cada 3600 segundos
    return res.json()
}

async function loadPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    return data
}

async function PostsPage() {
    const posts = await loadPosts()

    return (<div>{
        posts.map(post => (
            <div key={post.id}>
                <h3>{post.id}. {post.title}</h3>
                <p>{post.body}</p>
            </div>
        ))
    }</div>)
}

export default PostsPage
