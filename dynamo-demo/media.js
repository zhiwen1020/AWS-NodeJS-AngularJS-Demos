/**
 * Created by ejf3 on 11/20/13.
 */
var c = require('../constants');

Media = function (dynamodb) {
    this.dynamodb = dynamodb;

    this.getAll = function (socket) {
        console.log("dyn.media.getAll");
        this.dynamodb.scan({
            "TableName": c.DYN_MEDIA_TABLE,
            "Limit": 100
        }, function (err, data) {
            if (err) {
                console.log(c.DYN_GET_MEDIA, err);
                socket.emit(c.DYN_GET_MEDIA, c.ERROR);
            } else {
                console.log(c.DYN_GET_MEDIA, data);
                socket.emit(c.DYN_GET_MEDIA, data);
            }
        });
    };

    this.getUserMedia = function (user, socket) {
        console.log("dyn.media.getUserMedia");
        this.dynamodb.scan({
            "TableName": c.DYN_MEDIA_TABLE,
            "Limit": 100,
            "ScanFilter": {
                "IndexName": {
                    "AttributeValueList": [
                        {
                            "N": user.id
                        }
                    ],
                    "ComparisonOperator": "EQ"
                }
            }
        }, function (err, data) {
            if (err) {
                console.log(c.DYN_GET_USER_MEDIA, err);
                socket.emit(c.DYN_GET_USER_MEDIA, c.ERROR);
            } else {
                console.log(c.DYN_GET_USER_MEDIA, data);
                socket.emit(c.DYN_GET_USER_MEDIA, data);
            }
        });
    };

    this.addUpdateMedia = function (media, socket) {
        console.log("dyn.media.addUpdateMedia");
        this.dynamodb.putItem({
            "TableName": c.DYN_MEDIA_TABLE,
            "Item": media
        }, function (err, data) {
            if (err) {
                socket.emit(c.DYN_UPDATE_MEDIA, c.ERROR);
            } else {
                console.log(c.DYN_UPDATE_MEDIA, data);
                socket.emit(c.DYN_UPDATE_MEDIA, data);
            }
        });
    };};


module.exports = Media;