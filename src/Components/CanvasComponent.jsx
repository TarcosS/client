import React from 'react'
import ButtonComponent from "./subController/ButtonComponent";

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: [0,0,0,0],
            oy: false,
            totalgift:{
                GGId:0,
                weightsId:0,
                MiniSpeakerId:0,
                TikTokId:0,
                SpeedboatId:0,
                ChampionId:0,
                WhaleDivingId:0,
                GarlandId:0,
                akp3:0,
                akp4:0,
                chp3:0,
                chp4:0,
                hdp3:0,
                hdp4:0,
                mhp3:0,
                mhp4:0
            },
            commentDB:{}
        }
    }
    
    componentDidMount() {  
        setTimeout(()=>{
            let totalComment = {};
            if(this.props.persons && this.props.persons[0] !== null){
                totalComment[this.props.persons[0]] = 0;
                totalComment[this.props.persons[1]] = 0;
                totalComment[this.props.persons[2]] = 0;
                totalComment[this.props.persons[3]] = 0;
                if(!(this.state.commentDB === totalComment)){
                    this.setState({
                        commentDB: totalComment
                    })
                }
                let totalgift={
                    GGId:0,
                    weightsId:0,
                    MiniSpeakerId:0,
                    TikTokId:0,
                    SpeedboatId:0,
                    ChampionId:0,
                    WhaleDivingId:0,
                    GarlandId:0,
                    akp3:0,
                    akp4:0,
                    chp3:0,
                    chp4:0,
                    hdp3:0,
                    hdp4:0,
                    mhp3:0,
                    mhp4:0
                }
                this.props.connection.on('chat', (res)=>{
                    let commentFirstWord = res.comment.split(' ')[0].toUpperCase();
                    console.log(commentFirstWord)
                    if( 
                        commentFirstWord === this.props.persons[0]
                    ) {
                        totalComment[this.props.persons[0]] = totalComment[this.props.persons[0]] + 1;
                        document.querySelector('button.' + this.props.persons[0]).click()
                    }else if(
                        commentFirstWord === this.props.persons[1]
                    ){
                        totalComment[this.props.persons[1]] = totalComment[this.props.persons[1]] + 1;
                        document.querySelector('button.' + this.props.persons[1]).click()
                    }else if(
                        commentFirstWord === this.props.persons[2]
                    ){
                        totalComment[this.props.persons[2]] = totalComment[this.props.persons[2]] + 1;
                        document.querySelector('button.' + this.props.persons[2]).click()
                    }else if(
                        commentFirstWord === this.props.persons[3]
                    ){
                        totalComment[this.props.persons[3]] = totalComment[this.props.persons[3]] + 1;
                        document.querySelector('button.' + this.props.persons[3]).click()
                    }
                    this.setState({
                        commentDB:totalComment
                    })
                })
                this.props.connection.on('gift', (res)=>{
                    if (res.giftType === 1 && !res.repeatEnd) {}
                    else {
                        if(res.giftId === 5651){
                            totalgift.GarlandId+=res.repeatCount
                            document.getElementById("celenk").click()
                            document.getElementById("firstLabel").click()
                        }else if(res.giftId === 6042){
                            totalgift.MiniSpeakerId+=res.repeatCount
                            document.getElementById("hoperlor").click()
                            document.getElementById("firstLabel").click()
                        }else if(res.giftId === 5585){
                            totalgift.akp3+=res.repeatCount
                            document.getElementById("akp-3").click()
                            document.getElementById("firstLabel").click()
                        }else if(res.giftId === 5731){
                            totalgift.akp4+=res.repeatCount
                            document.getElementById("akp-4").click()
                            document.getElementById("firstLabel").click()
                        }else if(res.giftId === 5763){
                            totalgift.SpeedboatId+=res.repeatCount
                            document.getElementById("surat").click()
                            document.getElementById("secondLabel").click()
                        }else if(res.giftId === 5269){
                            totalgift.TikTokId+=res.repeatCount
                            document.getElementById("tiktok").click()
                            document.getElementById("secondLabel").click()
                        }else if(res.giftId === 5660){
                            totalgift.chp3+=res.repeatCount
                            document.getElementById("chp-3").click()
                            document.getElementById("secondLabel").click()
                        }else if(res.giftId === 5899){
                            totalgift.chp4+=res.repeatCount
                            document.getElementById("chp-4").click()
                            document.getElementById("secondLabel").click()
                        }else if(res.giftId === 5760){
                            totalgift.weightsId+=res.repeatCount
                            document.getElementById("agirlik").click()
                            document.getElementById("thirstLabel").click()
                        }else if(res.giftId === 5955){
                            totalgift.ChampionId+=res.repeatCount
                            document.getElementById("sampiyon").click()
                            document.getElementById("thirstLabel").click()
                        }else if(res.giftId === 5659){
                            totalgift.hdp3+=res.repeatCount
                            document.getElementById("hdp-3").click()
                            document.getElementById("thirstLabel").click()
                        }else if(res.giftId === 6865){
                            totalgift.hdp4+=res.repeatCount
                            document.getElementById("hdp-4").click()
                            document.getElementById("thirstLabel").click()
                        }else if(res.giftId === 6820){
                            totalgift.WhaleDivingId+=res.repeatCount;
                            document.getElementById("balina").click()
                            document.getElementById("fourthLabel").click()
                        }else if(res.giftId === 6064){
                            totalgift.GGId+=res.repeatCount
                            document.getElementById("gg").click()
                            document.getElementById("fourthLabel").click()
                        }else if(res.giftId === 6427){
                            totalgift.mhp3+=res.repeatCount
                            document.getElementById("mhp-3").click()
                            document.getElementById("fourthLabel").click()
                        }else if(res.giftId === 5897){
                            totalgift.mhp4+=res.repeatCount
                            document.getElementById("mhp-4").click()
                            document.getElementById("fourthLabel").click()
                        }
                        this.setState({
                            totalgift:totalgift
                        })
                    }
                })
                setInterval(()=>{
                    if(this.props.persons){
                        let firstNumArr = [
                            (this.state.commentDB[this.props.persons[0]] + this.state.totalgift["MiniSpeakerId"] * 1 + this.state.totalgift["GarlandId"] * 1500 + this.state.totalgift["akp3"] * 100 + this.state.totalgift["akp4"] * 499 + parseInt(window.localStorage.getItem("firstArtan"))) || 0,
                            (this.state.commentDB[this.props.persons[1]] + this.state.totalgift["TikTokId"] * 1 + this.state.totalgift["SpeedboatId"] * 1888 + this.state.totalgift["chp3"] * 100 + this.state.totalgift["chp4"] * 399 + parseInt(window.localStorage.getItem("secondArtan"))) || 0,
                            (this.state.commentDB[this.props.persons[2]] + this.state.totalgift["weightsId"] * 1 + this.state.totalgift["ChampionId"] * 1500 + this.state.totalgift["hdp3"] * 99 + this.state.totalgift["hdp4"] * 599 + parseInt(window.localStorage.getItem("thirstArtan"))) || 0,
                            (this.state.commentDB[this.props.persons[3]] + this.state.totalgift["GGId"] * 1 + this.state.totalgift["WhaleDivingId"] * 1750 + this.state.totalgift["mhp3"] * 99 + this.state.totalgift["mhp4"] * 699 + parseInt(window.localStorage.getItem("fourthArtan"))) || 0
                        ]
                        // console.log(this.state.commentDB[this.props.persons[0]] === undefined ? 0 : this.state.commentDB[this.props.persons[0]], this.state.totalgift["MiniSpeakerId"] * 1, this.state.totalgift["GarlandId"] * 1500, this.state.totalgift["akp3"] * 100, this.state.totalgift["akp4"] * 499, parseInt(window.localStorage.getItem("firstArtan")))
                        if(
                            this.state.num[0] !== firstNumArr[0] 
                            || this.state.num[1] !== firstNumArr[1] 
                            || this.state.num[2] !== firstNumArr[2]
                            || this.state.num[3] !== firstNumArr[3]
                        ){
                            this.setState({
                                num: firstNumArr
                            })
                        }
                        let max = Math.max(...this.state.num);
                        let indexArr = this.state.num.indexOf(max);
    
                        
                        if(!(indexArr === this.state.oy)){
                            console.log('1 kere calisti')
                            this.setState({
                                oy: indexArr
                            })
                        }
                    }
                },300)
            }    
        }, 1200)  
    }
    render(){
        return(
            <>
                <div className="col-2 d-flex flex-column align-items-center " >
                    <ButtonComponent label={this.state.num[0]} parti={"firstLabel"} isMusicPlay={this.props.isMusicPlay} isMax={this.state.oy === 0 ? true : false} oy={"firstOy"} url={this.props.persons ? this.props.persons[0] : ''}/>
                </div>
                <div className="col-2 d-flex flex-column align-items-center " >
                    <ButtonComponent label={this.state.num[1]} parti={"secondLabel"} isMusicPlay={this.props.isMusicPlay} isMax={this.state.oy === 1 ? true : false} oy={"firstOy"} url={this.props.persons ? this.props.persons[1] : ''}/>
                </div>
                <div className="col-2 d-flex flex-column align-items-center " >
                    <ButtonComponent label={this.state.num[2]} parti={"thirstLabel"} isMusicPlay={this.props.isMusicPlay} isMax={this.state.oy === 2 ? true : false} oy={"firstOy"} url={this.props.persons ? this.props.persons[2] : ''}/>
                </div>
                <div className="col-2 d-flex flex-column align-items-center " >
                    <ButtonComponent label={this.state.num[3]} parti={"fourthLabel"} isMusicPlay={this.props.isMusicPlay} isMax={this.state.oy === 3 ? true : false} oy={"firstOy"} url={this.props.persons ? this.props.persons[3] : ''}/>
                </div>
            </>
        )
    }
}

export default Canvas