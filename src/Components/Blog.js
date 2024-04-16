//Blogging App with Firebase
import { useState, useRef, useEffect } from "react";

//Import fireStore reference from frebaseInit file
import {db} from "../firebase-init";

//Import all the required functions from fireStore
import { collection, addDoc,doc, setDoc, getDocs, onSnapshot, deleteDoc} from "firebase/firestore"; 

export default function Blog(){

    const [formData, setformData] = useState({title:"", content:""})
    const [blogs, setBlogs] =  useState([]);

    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus()
    },[]);

    // useEffect(()=>{

    //     // async function fetchData(){

    //     //     const snapShot=await getDocs(collection(db,"blogs"))
    //     //     console.log(snapShot);

    //     //    const blogs= snapShot.docs.map((doc)=>{
    //     //     return{
    //     //         id:doc.id,
    //     //         ...doc.data()
    //     //     }
    //     //    })

    //     //    console.log("This is the blogs:",blogs);
    //     //    setBlogs(blogs);

    //     // }
    //     // fetchData();


    //     //onSnapshot is a listener it will give you a real time update when u are deleting or adding ,it will send the notification to the client
    //     const unsub=onSnapshot(collection(db,"blogs",(snapShot)=>{
    //            const blogs= snapShot.docs.map((doc)=>{
    //         return{
    //             id:doc.id,
    //             ...doc.data()
    //         }
    //        })
    //        setBlogs(blogs);

    //     }))
    // },[])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "blogs"), (snapShot) => {
            const blogs = snapShot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
            setBlogs(blogs);
        });
    
        return () => unsub(); // Cleanup function
    }, []);
    

    
    async function handleSubmit(e){
        e.preventDefault();
        titleRef.current.focus();

        setBlogs([{title: formData.title,content:formData.content}, ...blogs]);

        /*********************************************************************** */
        /** Add a new document with an auto generated id. */ 
        /*********************************************************************** */

        const docRef = doc(collection(db, "blogs"))
            
        await setDoc(docRef, {
                title: formData.title,
                content: formData.content,
                createdOn: new Date()
            });

        /*********************************************************************** */
        
        setformData({title: "", content: ""});
    }

    async function removeBlog(id){

        // setBlogs( blogs.filter((blog,index)=> index !== i));
        //Here we are locally deleting the blog but we need to delte it from our database

        const docRef=doc(db,"blogs",id)
        await deleteDoc(docRef)
 
     }

    return(
        <>
        <h1>Write a Blog!</h1>
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                ref = {titleRef}
                                value={formData.title}
                                onChange = {(e) => setformData({title: e.target.value, content:formData.content})}
                        />
                </Row >

                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                required
                                value={formData.content}
                                onChange = {(e) => setformData({title: formData.title,content: e.target.value})}
                        />
                </Row >
         
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {blogs.map((blog,i) => (
            <div className="blog" key={i}>
                <h3>{blog.title}</h3>
                <hr/>
                <p>{blog.content}</p>

                <div className="blog-btn">
                        <button onClick={() => {
                             removeBlog(blog.id)
                        }}
                        className="btn remove">

                            Delete

                        </button>
                </div>
            </div>
        ))}
        
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
