import Posts from "../page";
import { Suspense } from "react";

async function loadPost(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data = await res.json()
    return data
}

async function Page({ params }) {
    const {id} = await loadPost(params.id);
    const post = id;
    return (
        <div>
            <h1>Post Page {id}</h1>
            <h2>{post}</h2>
            <p>{post}</p>
            <hr />
            <h2>Otras publicaciones</h2>
            <Suspense fallback={<div>Cargando...</div>}>
                <Posts />
            </Suspense>
        </div>
    )
}

export default Page