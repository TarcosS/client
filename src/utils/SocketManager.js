import { TikTokIOConnection } from "../connection";

export default function SocketManager () {
    if(window.sessionStorage.getItem('tiktoker') === null) {
        const connection =  new TikTokIOConnection('http://localhost:2800');
        const data = {
            roomUserCount: 0,
            bestLikerInfo: [
                {
                    likerName: '',
                    profilePictureUrl: ''
                },
                {
                    likerName: '',
                    profilePictureUrl: ''
                }
            ],
            follower: [],
            kings: []
        };
        let urlDizi = []

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
        let totalComment = {};
        let persons = ['FB', 'GS', 'BJK', 'TS'];

        // Socket Connections
        connection.on('roomUser', (res)=>{
            data.roomUserCount = res.viewerCount
        })

        connection.on('chat', (res)=> {
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
            data.bestLikerInfo = likeArr
        })

        connection.on('follow', (res)=>{
            data.follower = [res.uniqueId, res.profilePictureUrl]
        })

        connection.on('gift',(res)=>{
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

                data.kings = [
                    sortedProducts[0] ? sortedProducts[0].profilePictureUrl : '', 
                    sortedProducts[1] ? sortedProducts[1].profilePictureUrl : '', 
                    sortedProducts[0] ? sortedProducts[0].senderName : '', 
                    sortedProducts[1] ? sortedProducts[1].senderName : '', 
                ]
            }
        })

        connection.on('chat', (res)=>{
            let commentFirstWord = res.comment.split(' ')[0].toUpperCase();
            if( 
                commentFirstWord === persons[0]
            ) {
                totalComment[persons[0]] = totalComment[persons[0]] + 1;
                document.querySelector('button.' + persons[0]).click()
            }else if(
                commentFirstWord === persons[1]
            ){
                totalComment[persons[1]] = totalComment[persons[1]] + 1;
                document.querySelector('button.' + persons[1]).click()
            }else if(
                commentFirstWord === persons[2]
            ){
                totalComment[persons[2]] = totalComment[persons[2]] + 1;
                document.querySelector('button.' + persons[2]).click()
            }else if(
                commentFirstWord === persons[3]
            ){
                totalComment[persons[3]] = totalComment[persons[3]] + 1;
                document.querySelector('button.' + persons[3]).click()
            }
            data.commentDB = totalComment
        })

        setInterval(()=> {
            console.log(data)
        }, 1000)
    }
}