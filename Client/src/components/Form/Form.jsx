import React,{useState,useEffect} from "react";
import {TextField,Button,Typography,Paper} from "@material-ui/core";
import FileBase from "react-file-base64";
import {useDispatch} from "react-redux";
import useStyles from "./styles";
import {createPost,updatePost} from "../../actions/posts";
import {useSelector} from "react-redux";

function Form({currentId,setCurrentId}){
    const [postData,setPostData]=useState({
        creator:"",
        title:"",
        message:"",
        tags:"",
        selectedFile:""
    });
    const classes=useStyles();

    const post=useSelector((state)=>currentId ? state.posts.find( (p) => p._id===currentId ): null);

    const dispatch=useDispatch();
    
    useEffect(()=>{
        if(post) setPostData(post);
    },[post])

    function handleChange(e)
    {
        let value=e.target.value;
        let key=e.target.name;
        setPostData({ ...postData ,  [key]:value});
        // console.log(postData);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId,postData));
        }
        else{
            dispatch(createPost(postData));
        }
        clear();
    }

    function clear(){
        setCurrentId(null)
        setPostData({
            creator:"",
            title:"",
            message:"",
            tags:"",
            selectedFile:""
        })
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId? 'Editing':'Creating'} a Memory</Typography>
                
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={handleChange} required></TextField>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={handleChange} required></TextField>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={handleChange} required></TextField>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e)=>setPostData({ ...postData, tags:e.target.value.split(',')})}></TextField>
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
                    ></FileBase>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" onClick={handleSubmit} fullWidth>Submit</Button>
                <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="large" onClick={clear} fullWidth>Reset</Button>

            </form>
        </Paper>
    )
}

export default Form;
