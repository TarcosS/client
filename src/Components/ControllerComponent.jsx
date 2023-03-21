import React from "react";
import "../index.css"
import PartiCardComponent from "./subController/PartiCardComponent";
import { TikTokIOConnection } from '../connection'
import axios from "axios";


let connection = undefined;

// const [total, setTotal] = useState(0)
// useEffect(()=>{
//     setTotal(totalViewer.totalViewer)
// })

class ControllerComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total:0,
            isMusicPlay: true
        }
    }
    componentDidMount(){
        document.title = 'Kontrol Merkezi'
        
        setInterval(()=>{
            axios.get('http://localhost:2700/getSettings').then((response)=>{
                this.setState({
                    isMusicPlay: response.data.isMusicPlay
                })
            })  
        }, 1000)
    }
    componentDidUpdate(){
        if(connection !== undefined) {
            connection.on('roomUser', (res)=>{
                this.setState({
                    total: res.viewerCount
                })
            })
        }
    }
    startConnection(e){
        connection = new TikTokIOConnection('http://localhost:2800', document.getElementById('tiktokerName').value);
    }
    stopAllMusic(e){
        let uri = '';
        if(e.currentTarget.getAttribute('data-bool') === 'true'){
            uri = `http://localhost:2700/updatePlayable?isMusicPlayable=${false}`;
            e.currentTarget.setAttribute('data-bool', false)
        }else {
            uri = `http://localhost:2700/updatePlayable?isMusicPlayable=${true}`;
            e.currentTarget.setAttribute('data-bool', true)
        }
        axios.post(uri)
    }
    render(){
        var cardInfo = [
            {
                header: "1. Aday",
                title: "Oylanacak Aday",
                label: "Arttırmak istediğiniz puan",
                partiLabel: "firstLabel",
                oyLabel: "firstOy",
                arttir: "firstArtan"
            },
            {
                header: "2. Aday",
                title: "Oylanacak Aday",
                label: "Arttırmak istediğiniz puan",
                partiLabel: "secondLabel",
                oyLabel: "secondOy",
                arttir: "secondArtan"
            },
            {
                header: "3. Aday",
                title: "Oylanacak Aday",
                label: "Arttırmak istediğiniz puan",
                partiLabel: "thirstLabel",
                oyLabel: "thirstOy",
                arttir: "thirstArtan"
            },
            {
                header: "4. Aday",
                title: "Oylanacak Aday",
                label: "Arttırmak istediğiniz puan",
                partiLabel: "fourthLabel",
                oyLabel: "fourthOy",
                arttir: "fourthArtan"
            }
        ]
        return(
            <div className="container text-center">
                <div className="row my-3 mt-sm-4">
                    {cardInfo.map((card, i) => {
                        return <PartiCardComponent key={card.partiLabel} partiLabel={card.partiLabel} type={i} PartiName={"AKP"} arttirOy={card.arttir} header={card.header} title={card.title} label={card.label} oy={card.oyLabel}/>
                    })}
                </div>
                <div className="row mb-5 g-2 justify-content-between">
                        <div className="col-md-12 col-lg-3 mb-3">
                            <div className="d-flex justify-content-between flex-column miniCards">
                                <div>
                                    <div className="h1 fs-5 fw-bold">Ayarlar</div>
                                    <div className="h2 fs-6 " disabled>Puan Sıfırlama Sistemi</div>
                                    {/* <div style={{color:"red", fontSize:"12px"}}>Sistem Halen Geliştirme Aşamasındadır</div> */}
                                </div>
                                <button
                                    onClick={()=>{
                                        window.localStorage.setItem("firstArtan", 0)
                                        window.localStorage.setItem("secondArtan", 0)
                                        window.localStorage.setItem("thirstArtan", 0)
                                        window.localStorage.setItem("fourthArtan", 0)
                                    }}
                                    type="submit" className="btn btn-primary" style={{width:"100%", marginTop:"10px"}}>Puanları Sıfırla</button>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-3 mb-3">
                            <div className="miniCards">
                                <div className="h1 fs-5 fw-bold">Otomasyon</div>
                                <div className="h2 fs-6 ">Etkileşim Otomasyon Sistemi</div>
                                <input type="text" className="form-control" id="tiktokerName" aria-describedby="emailHelp" placeholder="Kullanıcı Adı Giriniz" style={{marginTop:"10px"}} />
                                    <button type="submit" className="btn btn-primary" style={{width:"100%", marginTop:"10px"}} onClick={(e)=>{this.startConnection(e)}} >Başlat</button>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-3 mb-3">
                           <div className="d-flex justify-content-between flex-column miniCards">
                                <div>
                                    <div className="h1 fs-5 fw-bold">İzleyiciler</div>
                                    <div className="h2 fs-6 ">Aktif İzleyici Sayısı</div>
                                </div>   
                                <form >
                                    <input type="text" className="form-control text-center" value={this.state.total} style={{width:"100%", marginTop:"10px", fontWeight: "bold"}} disabled />
                                </form>
                           </div>
                        </div>
                        <div className="col-md-12 col-lg-3 mb-3">
                                <div className="d-flex justify-content-between flex-column miniCards">
                                    <div>
                                        <div className="h1 fs-5 fw-bold">Müzik</div>
                                        <div className="h2 fs-6 ">Müzik Kontrol Sistemi</div>
                                    </div>   
                                    <button onClick={(e)=>{this.stopAllMusic(e)}} data-bool='true' className="btn btn-primary" style={{width:"100%", marginTop:"10px"}}>{this.state.isMusicPlay ? 'Durdur' : 'Baslat'}</button>
                                </div>
                        </div>
                    </div>
            </div>
        )
    }
   
}

export default ControllerComponent