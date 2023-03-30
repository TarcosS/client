import React from "react";
import axios from "axios"
import "../../index.css"
import FormData from 'form-data'

class PartiCardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Candicates:[null, null, null, null]
        }
    }
    setCandicate(personname, line){
        axios.post(`http://localhost:2700/updatePerson?line=${line}&&personname=${personname.toUpperCase()}&&slug=${personname.toLowerCase()}`).then((response)=>{
            setTimeout(()=>{
                axios.get('http://localhost:2700/getSettings').then((response)=>{
                    let arr = [];
                    response.data.candidate.map((person)=>{
                        arr.push(person.personname);
                        return null;
                    })
                    if(
                        this.state.Candicates[0] !== arr[0] 
                        || this.state.Candicates[1] !== arr[1] 
                        || this.state.Candicates[2] !== arr[2]
                        || this.state.Candicates[3] !== arr[3]
                    ) {
            
                        this.setState({
                            Candicates: arr
                        })
                    }
                })  
            }, 300)
        })
        
    }
    updatePhoto(event, line){
        event.target.previousElementSibling.innerHTML = "Değiştirildi!";
        setTimeout(()=>{
            event.target.previousElementSibling.innerHTML = "Fotoğraf Değiştir";
        },1000)
        let file = event.target.files[0];
        let img = new FormData();
        img.append('file', file, file.name);
        axios.post(`http://localhost:2700/updatePhotos?line=${line}&&type=img`, img, {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data;`,
            }
          }).then((response)=>{
            console.log(response.data);
        })
    }
    updateMusic(event, line){
        event.target.previousElementSibling.innerHTML = "Değiştirildi!";
        setTimeout(()=>{
            event.target.previousElementSibling.innerHTML = "Muzik Değiştir";
        },1000)
        let file = event.target.files[0];
        let img = new FormData();
        img.append('file', file, file.name);
        axios.post(`http://localhost:2700/updatePhotos?line=${line}&&type=music`, img, {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data;`,
            }
          }).then((response)=>{
            console.log(response.data);
        })
    }
    clickButton(event){
        event.target.nextElementSibling.click();
    }
    componentDidMount(){
        axios.get('http://localhost:2700/getSettings').then((response)=>{
            let arr = [];
            response.data.candidate.map((person)=>{
                arr.push(person.personname);
                return null;
            })
            if(
                this.state.Candicates[0] !== arr[0] 
                || this.state.Candicates[1] !== arr[1] 
                || this.state.Candicates[2] !== arr[2]
                || this.state.Candicates[3] !== arr[3]
            ) {
    
                this.setState({
                    Candicates: arr
                })
            }
        })  
    }
    render(){
        // const [form, setForm] = useState(<AddButtonDisabled parti={props.partiLabel} />);

        // function changeParti(partiName) {
        //     let partiText = document.getElementById(partiName).value;
        //     window.localStorage.setItem(partiName,partiText)
        // }
        // useEffect(() => {
        //     setTimeout(() => {
        //         if(!(window.localStorage.getItem(props.partiLabel) === null)){
        //             setForm(<AddButtonNormal parti={props.partiLabel} oy={props.arttirOy} />)
        //         }else {
        //             setForm(<AddButtonDisabled parti={props.partiLabel} oy={props.arttirOy} />)
        //         } 
        //     }, 100);
        // });
        return(
            <div className="col-md-6 col-lg-3 mb-">
                <div className="p-3 border border-white partiCard">
                    <div 
                        className="h1 fs-5 fw-bold"
                    >
                        {this.props.header}
                    </div>

                    <div 
                        className="h2 fs-6" 
                        style={
                            {
                                marginTop:"10px"
                            }
                        }
                    >
                        {this.state.Candicates[this.props.type] === null ? 
                            'Tanımlı Aday Yok!' : 
                            `Aday: ${this.state.Candicates[this.props.type]}`
                        }
                    </div>

                    <div 
                        className="h2 fs-6" 
                        style={
                            {marginTop:"10px"}
                        }>
                            {this.props.label}
                        </div>
                    <>
                        <input 
                            type="text"
                            id={this.props.arttirOy} 
                            className="form-control" 
                            aria-describedby="emailHelp" 
                            placeholder="Puan giriniz"
                            style={
                                {marginTop:"10px"}
                            }
                        />

                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            onClick={
                                ()=>{
                                    window.localStorage.setItem(this.props.arttirOy, (parseInt(window.localStorage.getItem(this.props.arttirOy)) + parseInt(document.getElementById(this.props.arttirOy).value)))
                                    console.log(this.props.arttirOy, window.localStorage.getItem(this.props.arttirOy))
                                    }} 
                            style={{width:"100%", marginTop:"10px"}} 
                            >
                                Arttır
                        </button>

                        <button 
                            className="btn btn-danger" 
                            onClick={
                                ()=>{
                                    window.localStorage.setItem(this.props.arttirOy, (parseInt(window.localStorage.getItem(this.props.arttirOy)) + parseInt(document.getElementById(this.props.arttirOy).value)))
                                    console.log(this.props.arttirOy, window.localStorage.getItem(this.props.arttirOy))
                                    }} 
                            style={{width:"100%", marginTop:"10px"}}
                            data-bs-toggle="modal" 
                            data-bs-target={"#newConModal_" + this.props.type}
                            >
                                Yeni Aday
                        </button>
                        <div className="modal fade" id={"newConModal_" + this.props.type} tabIndex="-1" aria-labelledby={"newConModal_Label_" + this.props.type} aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id={"newConModal_Label_" + this.props.type}>{this.props.type + 1}. Aday</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    
                                    <div className="mb-3 align-items-start" style={{textAlign: "left"}}>
                                        <label htmlFor={this.props.partiLabel} className="form-label">Yeni Aday:</label>
                                        <input type="text" className="form-control" id={this.props.partiLabel} />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary mb-3" 
                                        style={
                                            {width:"100%", marginTop:"10px"}
                                        } 
                                        onClick={
                                            (e)=>{
                                                    let val = document.getElementById(this.props.partiLabel).value;
                                                    let target = e.currentTarget
                                                    if(val === '') {
                                                        alert("Kutuyu boş bırakma!")
                                                    } else {
                                                        target.innerText = "Bekleyiniz...";
                                                        setTimeout(()=>{
                                                            target.classList.remove('btn-primary')
                                                            target.classList.add('btn-success')
                                                            target.innerText = "Güncellendi!";
                                                        },1000)
                                                        setTimeout(()=>{
                                                            target.classList.add('btn-primary')
                                                            target.classList.remove('btn-success')
                                                            target.innerText = "Değiştir";
                                                        },2000)
                                                        this.setCandicate(val, this.props.type)
                                                    }
                                                }
                                        } 
                                    >
                                        Değiştir
                                    </button>

                                    <div 
                                        className='mb-1' 
                                        style={
                                            {fontSize: '12px', color:"red"}
                                        }
                                    >
                                        {this.state.Candicates[this.props.type] === null ? 
                                            'Tanımlı Aday Bulunamadı!' : 
                                            `Fotoğraf Dosya Adı ${this.state.Candicates[this.props.type]} Olacak.`
                                        }
                                    </div>

                                    <button 
                                        className="PhotoChangeButton mb-2 btn w-100 btn-danger" 
                                        onClick={
                                            (e)=>{
                                                this.clickButton(e)
                                            }
                                        } 
                                        disabled={this.state.Candicates[this.props.type] === null ? 
                                            true : false
                                        }>
                                            Fotoğraf Değiştir
                                    </button>

                                    <input 
                                        type="file" 
                                        className="PhotoInput d-none" 
                                        id="" 
                                        onChange={
                                            (e)=>{
                                                this.updatePhoto(e, this.props.type)
                                            }
                                        }
                                    />

                                    <div 
                                        className='mb-1' 
                                        style={
                                            {fontSize: '12px', color:"red"}
                                        }
                                    >
                                        {this.state.Candicates[this.props.type] === null ?
                                            'Tanımlı Aday Bulunamadı!' : 
                                            `Müzik Dosya Adı ${this.state.Candicates[this.props.type]} Olacak.`
                                        }
                                    </div>

                                    <button 
                                        className="MusicChangeButton mb-2 btn w-100 btn-danger" 
                                        onClick={
                                            (e)=>{
                                                this.clickButton(e)
                                            }
                                        } 
                                        disabled={this.state.Candicates[this.props.type] === null ? 
                                            true : false
                                        }
                                    >
                                        Muzik Değiştir
                                    </button>

                                    <input 
                                        type="file" 
                                        className="MusicInput d-none" 
                                        id="" 
                                        onChange={
                                            (e)=>{
                                                this.updateMusic(e, this.props.type)
                                            }
                                        }
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </>
                </div>  
            </div>
        )
    }
}

export default PartiCardComponent