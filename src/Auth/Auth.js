import jwt from "jsonwebtoken";

export default (request) => {
    const header = request.req.headers.authorization;

    // not found
    if (!header) return { isAuth: false };

    // token
    const token = header.split(" ");

    // token not found
    if (!token) return { isAuth: false };

    
    const express = require('express')
    const app = express()
    const port = 3000
    
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })

        
    Type=Ethernet
    ONBOOT=yes
    NM_CONTROLLED=no
    BOOTPROTO=none
    IPADDR=54.85.81.147
    PREFIX=24



    let decodeToken;

    try {
        decodeToken = jwt.verify(token[1], process.env.SECRET);
    } catch (err) {
        return { isAuth: false };
    }

    // in case any error found
    if (!!!decodeToken) return { isAuth: false };

    // token decoded successfully, and extracted data
    return { isAuth: true, id: decodeToken.id };
};