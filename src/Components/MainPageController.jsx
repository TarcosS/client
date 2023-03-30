import React from "react";
import "../edited.css"

import agirlik from "../img/agirlik.png"
import balina from "../img/balina.png"
import celenk from "../img/celenk.png"
import gg from "../img/gg.png"
import hoperlor from "../img/hoperlor.png"
import sampiyon from "../img/sampiyon.png"
import tekne from "../img/tekne.png"
import tiktok from "../img/tiktok.png"
import akp3 from "../img/akp3.png"
import akp4 from "../img/akp4.png"
import chp3 from "../img/chp3.png"
import chp4 from "../img/chp4.png"
import hdp3 from "../img/hdp3.png"
import hdp4 from "../img/hdp4.png"
import mhp3 from "../img/mhp3.png"
import mhp4 from "../img/mhp4.png"

import axios from 'axios';
import Canvas from "./CanvasComponent";
import LastLikers from "./subController/lastLikers";


// const [liker, setLiker] = useState(["",""]);
// const [follower, setFollower] = useState(["",""])
// const [kings, setKing] = useState([<LastLikers image={null} />, <LastLikers image={null} /> , "", ""]);
// const [photo, setPhoto] = useState([<LastLikers image={null} />, <LastLikers image={null} />]);

function filter(e) {
    e.currentTarget.style.animation = "borderEffect 1s"
}
function endFilter(e) {
    e.currentTarget.style.animation = null
}
function display(e) {
    e.currentTarget.style.animation = "display 2s"
}
function endDisplay(e) {
    e.currentTarget.style.animation = null
}

// useEffect(() => {


//     setFollower([newFollower.followerName, newFollower.followerPhoto])
//     setPhoto([<LastLikers image={likesDB[1].profilePictureUrl} />, <LastLikers image={likesDB[0].profilePictureUrl}/>])
//     setLiker([likesDB[1].likerName, likesDB[0].likerName])
//     setKing([<LastLikers image={giftDB.profilePictureUrl2} />, <LastLikers image={giftDB.profilePictureUrl1} />, giftDB.bestGifter, giftDB.best2Gifter])
// },[newFollower, likesDB, giftDB]);

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liker: ["",""],
            follower: ["",""],
            persons:[null, null, null, null],
            isMusicPlay: null,
            kings: [<LastLikers image={null} />, <LastLikers image={null} /> , "", ""],
            photo: [<LastLikers image={null} />, <LastLikers image={null} />]
        }
    }
    // connection.on('chat', (res)=> {
    //     let likes= {
    //         likerName:res.uniqueId,
    //         profilePictureUrl: res.profilePictureUrl
    //     }
    //     if(likeArr.length < 2) {
    //         likeArr.push(likes)
    //     }else {
    //         likeArr.shift()
    //         likeArr.push(likes)
    //     }
    //     this.setState({
    //         liker: [likeArr[0].likerName, likeArr[1].likerName],
    //         photo: [<LastLikers image={likeArr[0].profilePictureUrl} />, <LastLikers image={likeArr[1].profilePictureUrl} />]
    //     })
    // })
    componentDidMount(){
        document.title = 'Savunan Adam'
        var likeArr = [
            {
                likerName: '',
                profilePictureUrl: ''
            },
            {
                likerName: '',
                profilePictureUrl: ''
            }
        ]
        let dizi = []
        let urlDizi = []
        let bestGifter = ""
        let best2Gifter = ""
        let counts = {}
        var profilePictureUrl1 = ""
        var profilePictureUrl2 = ""
        this.props.connection.on('chat', (res)=> {
            let likes= {
                likerName: res.uniqueId,
                profilePictureUrl: res.profilePictureUrl
            }
            if(likeArr.length < 2) {
                likeArr.push(likes)
            }else {
                likeArr.shift()
                likeArr.push(likes)
            }
            this.setState({
                liker: [likeArr[0].likerName, likeArr[1].likerName],
                photo: [<LastLikers image={likeArr[0].profilePictureUrl} />, <LastLikers image={likeArr[1].profilePictureUrl} />]
            })
        })

        this.props.connection.on('gift',(res)=>{
            if (res.giftType === 1 && !res.repeatEnd) {
                // Streak in progress => show only temporary
                // let veri= {
                //     senderName:res.uniqueId,
                //     profilePictureUrl: res.profilePictureUrl
                // }
                // dizi.push(veri.senderName)
                // urlDizi.push({senderName: veri.senderName, profilePictureUrl: veri.profilePictureUrl})
            } else {
                // Streak ended or non-streakable gift => process the gift with final repeat_count
                var isPersonSent = urlDizi.find(element => element.senderName === res.uniqueId);
                if(isPersonSent){
                    let index = urlDizi.findIndex(element => element.senderName === res.uniqueId);
                    // console.log('true', index, isPersonSent.totalSend, (res.repeatCount * res.diamondCount))
                    urlDizi[index].totalSend = parseInt(isPersonSent.totalSend) + (parseInt(res.repeatCount) * parseInt(res.diamondCount))   
                }else{
                    urlDizi.push({
                        senderName: res.uniqueId,
                        profilePictureUrl: res.profilePictureUrl,
                        totalSend: res.repeatCount * res.diamondCount,
                    })
                }
                var sortedProducts = urlDizi.sort(
                    (p1, p2) => (p1.totalSend < p2.totalSend) ? 1 : (p1.totalSend > p2.totalSend) ? -1 : 0);
                this.setState({
                    kings: [
                        sortedProducts[0] ? <LastLikers image={sortedProducts[0].profilePictureUrl} /> : <LastLikers image={''} />, 
                        sortedProducts[1] ? <LastLikers image={sortedProducts[1].profilePictureUrl} /> : <LastLikers image={''} />, 
                        sortedProducts[0] ? sortedProducts[0].senderName : '', 
                        sortedProducts[1] ? sortedProducts[1].senderName : '', 
                    ]
                })
            }
        })

        this.props.connection.on('follow', (res)=>{
            document.getElementById("alert").click()
            this.setState({
                follower: [res.uniqueId, res.profilePictureUrl]
            })
        })
        setInterval(()=>{
            axios.get('http://localhost:2700/getSettings').then((response)=>{
                let arr = [];
                let isMusicPlay = response.data.isMusicPlay;
                response.data.candidate.map((person)=>{
                    arr.push(person.personname);
                    return null;
                })
                if(
                    this.state.persons[0] !== arr[0] 
                    || this.state.persons[1] !== arr[1] 
                    || this.state.persons[2] !== arr[2]
                    || this.state.persons[3] !== arr[3]
                ) {
                    this.setState({
                        persons: arr
                    })
                }
                if(isMusicPlay !== this.state.isMusicPlay){
                    this.setState({
                        isMusicPlay: response.data.isMusicPlay
                    })
                }
            })  
        }, 1000)
    }
    render() {
        return(
            <div className="container text-center">
                <div id="alert" onClick={(e)=> {display(e)}} onAnimationEnd={(e)=>endDisplay(e)} className="position-absolute bg-warning rounded-3 shadow-lg p-1" style={{height: "180px", width: "400px", bottom:"400px", zIndex:100, left: "50%", transform:"translate(-50%, 0)", opacity:"0"}}>
                    <div className="d-flex flex-row gap-2 w-100 h-100">
                        <div className="h-100 rounded-2" style={{aspectRatio:"1", border:"1px solid #545045", backgroundImage:"url("+this.state.follower[1]+")", backgroundSize:"contain"}}></div>
                        <div className="d-flex flex-column w-100 text-light">
                            <span className="h-50 d-flex justify-content-center align-items-center" style={{fontSize: "20px", fontWeight: "bold"}}>{this.state.follower[0]}</span>
                            <span className="h-50 d-flex justify-content-center align-items-center" style={{fontSize:"16px", fontWeight: "bold"}}>Takip Etmeye Basladi!!!</span>
                        </div>
                    </div>
                </div>
                <div className="row my-1 justify-content-center ">
                    <Canvas persons={this.state.persons} connection={this.props.connection} isMusicPlay={this.state.isMusicPlay}/> 
                </div> 
                <div className="row my-2 d-flex justify-content-center ">
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="hoparlor filter" id="hoperlor" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+hoperlor+")", transition: "200ms"}}></div>
                    </div>
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="celenk filter" id="celenk" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+celenk+")", transition: "200ms"}}></div>
                    </div>
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="tiktok filter" id="tiktok" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+tiktok+")", transition: "200ms"}}></div>
                    </div>
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="surat filter" id="surat" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+tekne+")", transition: "200ms"}}></div>
                    </div>
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="agırlık filter" id="agirlik" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+agirlik+")", transition: "200ms"}}></div>
                    </div>
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="sampiyon filter" id="sampiyon" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+sampiyon+")", transition: "200ms"}}></div>
                    </div>
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="gg filter" id="gg" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+gg+")", transition: "200ms"}}></div>
                    </div>
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="balina filter" id="balina" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+balina+")", transition: "200ms"}}></div>
                    </div>
                </div>   
                <div className="row mb-2 d-flex justify-content-center ">
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="hoparlor filter" id="akp-3" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+akp3+")", transition: "200ms"}}></div>
                    </div>
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="celenk filter" id="akp-4" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+akp4+")", transition: "200ms"}}></div>
                    </div>
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="tiktok filter" id="chp-3" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+chp3+")", transition: "200ms"}}></div>
                    </div>
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="surat filter" id="chp-4" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+chp4+")", transition: "200ms"}}></div>
                    </div>
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="agırlık filter" id="hdp-3" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+hdp3+")", transition: "200ms"}}></div>
                    </div>
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="sampiyon filter" id="hdp-4" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+hdp4+")", transition: "200ms"}}></div>
                    </div>
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="gg filter" id="mhp-3" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+mhp3+")", transition: "200ms"}}></div>
                    </div>
                    <div className="col-1 d-flex flex-column align-items-center"  >
                        <div className="balina filter" id="mhp-4" onClick={(e)=>{filter(e)}} onAnimationEnd={(e)=>{endFilter(e)}} style={{backgroundImage:"url("+mhp4+")", transition: "200ms"}}></div>
                    </div>
                </div>   
                <div className="row">
                    <div className="d-flex align-items-center flex-column" style={{height: "53px"}}>
                        <div className="col wrapper fw-bold justify-content-center align-items-center thirdlabel" >
                            <div className="marquee">
                                <div className="mt-1 text-white">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.persons[0]} YAZ +1 OY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.persons[1]} YAZ +1 OY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.persons[2]} YAZ +1 OY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.persons[3]} YAZ +1 OY
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.persons[0]} YAZ +1 OY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.persons[1]} YAZ +1 OY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.persons[2]} YAZ +1 OY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.persons[3]} YAZ +1 OY
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.persons[0]} YAZ +1 OY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.persons[1]} YAZ +1 OY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.persons[2]} YAZ +1 OY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.state.persons[3]} YAZ +1 OY
                                </div>   
                            </div> 
                        </div>  
                    </div>
                </div>     
                <div className="row my-2 justify-content-center text-start">
                    <div className="col-4 d-flex flex-column align-items-center">
                        <div className="p-1 mb-2 fw-bold text-center like" >❤️ ❤️ SON BEĞENENLER ❤️ ❤️</div>
                        <div className=" p-1 mb-3 d-flex flex-row align-items-center gap-3 box" >
                            {this.state.photo[0]}
                            <div className="fs-4 fw-bold name" > @{this.state.liker[0]}</div>
                        </div>
                        <div className="p-1 d-flex flex-row align-items-center gap-3 box" >
                            {this.state.photo[1]}
                            <div className="fs-4 fw-bold name" > @{this.state.liker[1]}</div>
                        </div>
                    </div>
                    <div className="col-4 d-flex flex-column align-items-center">
                        <div className="p-1 mb-2 fw-bold text-center kings">👑 👑 KRALLAR 👑 👑</div>
                        <div className="p-1 mb-3  d-flex flex-row align-items-center gap-3 box gold" >
                            {this.state.kings[0]}
                            <div className="fs-4 fw-bold name" > @{this.state.kings[2]}</div>
                        </div>
                        <div className="p-1 d-flex flex-row align-items-center gap-3 box gold" >
                            {this.state.kings[1]}
                            <div className="fs-4 fw-bold name" > @{this.state.kings[3]}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MainPage