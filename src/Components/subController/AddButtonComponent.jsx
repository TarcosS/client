import React from "react";

function AddButtonDisabled(props) {
    return(
        <>
            <input type="text" id={props.oy} className="form-control" aria-describedby="emailHelp" placeholder="Puan giriniz" style={{marginTop:"10px"}} disabled/>
            <button type="submit" className="btn btn-primary" onClick={()=>{window.localStorage.setItem(parseInt(window.localStorage.getItem(props.oy)) + parseInt(document.getElementById(props.oy).value))}} style={{width:"100%", marginTop:"10px"}} disabled >Arttır</button>
        </>
    )
}
function AddButtonNormal(props) {
    return(
        <></>
    )
}
export {AddButtonDisabled, AddButtonNormal}