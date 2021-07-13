import * as api from "../api/index";
import * as actions from "../constants/actionTypes"

//Action Creators
export const getPosts=()=>async (dispatch)=>{
    try {
        const {data}=await api.fetchPosts();
        dispatch({type:actions.FETCH_ALL, payload:data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post)=>async (dispatch)=>{
    try {
        const {data}=await api.createPost(post);
        dispatch({type:actions.CREATE, payload:data});
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost=(id,post)=>async (dispatch)=>{
    try {
        const {data}=await api.updatePost(id,post);
        dispatch({type:actions.UPDATE,payload:data});
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost=(id)=>async (dispatch)=>{
    try {
        await api.deletePost(id);
        dispatch({type:actions.DELETE,payload:id});
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost=(id)=> async (dispatch)=>{
    try {
        console.log("Dispatching like");
        const {data}=await api.likePost(id);
        dispatch({type:actions.UPDATE,payload:data});
    } catch (error) {
        console.log(error.message);
    }
}