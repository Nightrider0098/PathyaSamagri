import { notificationConstants } from '../_constants';
import { notificationServices } from '../_services';
export const notificationActions = {

    fetch,
    seen,
    remove
};


function fetch() {
    return dispatch => {
        dispatch({ type: notificationConstants.REQUEST })
        notificationServices.fetch1().then(data => {
            const data2 = { doner:notiJsonParser(data["doner"]),reciever: notiJsonParser(data['reciver']) }
            dispatch({ type: notificationConstants.FOUND, data2 })
        }).catch(err => { console.log(err) })
    }
}

function notiJsonParser(JsonData) {
    if (JsonData === "no messages") {
        return []
    } else {
        // console.log(JSON.parse(JsonData[0]))
        const data = [JSON.parse(JsonData[0])]
        for (let i = 1; i < JsonData.length; i++) {
            if(JsonData[i]===""){
                break;
            }
            console.log(i,JsonData[i])
            data.push(JSON.parse(JsonData[i]))

        }
        console.log("passed noti form action", data)
        return data
    }
}



function seen() {
    return { type: notificationConstants.SEEN };
}

function remove(notiID) {
    return { type: notificationConstants.DELETE, notiID };
}