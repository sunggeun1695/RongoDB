const mongoose = require('mongoose');

/**
 * String: 문자 값
 * Number: 숫자 값
 * Boolean: true/false 값
 * Array: 테이블 값
 */
const Schema = new mongoose.Schema({
    playerId: String,
    // 이곳에 원하는 데이터 값을 넣으세요.
    //Banned: Boolean
})

module.exports = mongoose.model("PlayerData", Schema) // PlayerData를 변경하여 원하는 데이터베이스 이름으로 변경할 수 있습니다.