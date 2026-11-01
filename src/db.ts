import Dexie,{Table} from "dexie";
interface Post{
    id:string;
    caption:string;
    date:number;
    url:string;
    image:Blob|null;
}
class InstaDatabase extends Dexie{
    posts!:Table<Post,string>;
    constructor(){
        super("InstaSearch");
        this.version(1).stores({
            posts:"id,username,caption,date,image"
        })
    }} const db=new InstaDatabase();
export async function addPost(post:Post):Promise<void>{
    await db.posts.add(post);
}