import Link from "next/link"

async function PostCard({ post }) {
    return (
        <div>
            <Link href={`/posts/${post.id}`}>
            <h3 className="text-2xl font-bold mb-4">{post.id}. {post.title}</h3>
            </Link>
            <p className="text-slate-300">{post.body}</p>
            <button onClick={() => {
                alert('Click ok!');
            }}>
                Click
            </button>
        </div>
    )
}

export default PostCard