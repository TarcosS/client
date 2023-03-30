import React from "react";
import confetti from "https://cdn.skypack.dev/canvas-confetti@1";

class ButtonComponent extends React.Component{
    
    componentDidUpdate(prevProps, prevState){
        let audio;
        audio = document.getElementById(this.props.url + "_audio")
        if(!this.props.isMusicPlay){
            var videos = document.querySelectorAll('video');
            for(let i = 0; i < videos.length; i ++){
                videos[i].pause()
            }
        }else{
            if(this.props.isMax){
                audio.play()
            }
        }

        if(prevProps.isMax !== this.props.isMax){
            if(this.props.isMax){
                document.getElementById('firstLabel').click()
                audio.play()
            }else{
                audio.pause()
            }
        }

    }
    
    render(){
        function konfeti(target) {
            var canvas = document.getElementById(target + "_image");
        
            // you should  only initialize a canvas once, so save this function
            // we'll save it to the canvas itself for the purpose of this demo
            canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });
        
            canvas.confetti({
            particleCount: 50,
            spread: 25,
            origin: { y: 1.3 }
            });
        }
        return(
            
            <div>
                <canvas className="mb-1 chppicture" id={this.props.url + "_image"}
                    style={{backgroundImage: this.props.url ? `url('/assets/images/${ this.props.url.toLowerCase() + '.png'}')` : null, backgroundSize:"cover", backgroundPosition: 'center'}}>
                </canvas>
                <video className="d-none" id={this.props.url + "_audio"} src={this.props.url ? `/assets/sounds/${ this.props.url.toLowerCase() + '.mp4'}` : ''}></video>
                <button id={this.props.parti} className={this.props.isMax ? this.props.url +  " d-flex justify-content-center greenblock" : this.props.url + " d-flex justify-content-center redblock"} onClick={()=>{konfeti(this.props.url)}}>
                    <span className="h1 fs-7 fw-bold d-flex justify-content-center text-white">{this.props.label}</span>
                </button>
            </div>
        )
    }
}
export default ButtonComponent