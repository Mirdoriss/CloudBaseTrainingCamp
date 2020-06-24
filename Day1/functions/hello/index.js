exports.main = async function(event) {
    return{
        statusCode: 200,
        headers: {
            'content-type': 'text/html'
        },
        body: '<h6>'+'id：'+'昵称zyj'+event.headers['x-real-ip']+'</h6>'+'</br>'+'host:'+event.headers['host']
    }
}