const express = require('express')
const app = express();
const users = [{
    name: 'jay',
    kidney: [{
        healthy: true
    }, {
        healthy: false
    }]
}]

app.use(express.json());

app.get("/", function (req, res) {
    const jaykidneys = users[0].kidney;
    const NOofkidneys = jaykidneys.length;
    let healthykidneys = 0;
    for (let i = 0; i < jaykidneys.length; i++) {
        if (jaykidneys[i].healthy) {
            healthykidneys = healthykidneys + 1;
        }
    }
    let unhealthykidneys = NOofkidneys - healthykidneys;
    res.json({
        NOofkidneys, healthykidneys, unhealthykidneys
    })
})

app.post("/", function (req, res) {
    const isHealthy = req.body.isHealthy;
    //pushes the new kidney
    users[0].kidney.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
})

app.put("/", function (req, res) {
    for (let i = 0; i < users[0].kidney.length; i++) {
        users[0].kidney[i].healthy = true;
    }
    res.json({})
})
//removing all the unhealthy kidneys
app.delete("/", function (req, res) {
    if (isthereanybadkidney()) {
        const newkidney = [];
        for (let i = 0; i < users[0].kidney.length; i++) {
            if (users[0].kidney[i].healthy) {
                newkidney.push({
                    healthy: true
                })
            }
        }
        users[0].kidney = newkidney;
        res.json({ msg: "Done" })
    }
    else {
        res.status(411).json({ msg: "you dont have any bad kidney " });
    }


})

function isthereanybadkidney() {
    let badkidney = false;
    for (let i = 0; i < users[0].kidney.length; i++) {
        if (!users[0].kidney[i].healthy) {
            badkidney = true;
        }
    }
    return badkidney;
}
app.listen(3000);
