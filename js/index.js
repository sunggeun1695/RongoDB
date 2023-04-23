const express = require('express');
const app = express();

const mongoose = require('mongoose');
const PlayerData = require('./schemas/PlayerData');

const config = require('./config');

/**
 * 코드별 뜻.
 * 106: 처리할 것이 없음. 또는 이미 처리됨.
 * 401: 처리를 해야할 것이 존재하지 않음.
 * 200: 데이터를 찾거나 처리를 완료함.
 */

// 아래의 코드는 수정하지 마십시오.
if (config.Enabled == false) return console.log("[API] 설정의 Enabled 값이 켜져있지 않습니다.")

app.get('/', async (req, res) => {
    res.json({ message: "OK" });
})

app.get('/get/:userID', async (req, res) => {
    const data = await PlayerData.findOne({ playerId: req.params.userID });
    if (!data) res.json({ code: 106, message: "Error106: 플레이어의 데이터를 구할 수 없습니다." });

    res.json(data.toJSON());
})

app.post('/set', async (req, res) => {
    const playerId = req.body.playerID;
    const key = req.body.key;
    const toValue = req.body.toValue;

    const data = await PlayerData.findOne({ playerId });
    if (!data) return res.json({ code: 401, message: "Error401: 플레이어의 데이터를 찾을 수 없습니다." });
    if (!data[key]) return res.json({ code: 106, message: "Error106: 키를 찾을 수 없습니다." });

    data[key] = toValue;
    res.json({
        code: 200,
        message: "Success200: 성공적으로 데이터를 수정하였습니다."
    })
})

app.post('/create', async (req, res) => {
    const playerId = req.body.playerID;

    const existingData = await PlayerData.findOne({ playerId });
    if (existingData) return res.json({ code: 106, message: "Error106: 이미 데이터가 존재합니다." })

    const data = new PlayerData({ playerId });
    await data.save();
})

app.post('/remove', async (req, res) => {
    const playerId = req.body.playerID;

    const data = await PlayerData.findOne({ playerId });
    if (!data) return res.json({ code: 401, message: "Error401: 플레이어의 데이터를 찾을 수 없습니다." });

    await PlayerData.findOneAndRemove({ playerId });
})

app.listen(config.Port, () => {
    console.log(`[API] ${config.Port}번 포트로 접속하였습니다.`);
})