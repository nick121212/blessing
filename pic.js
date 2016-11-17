var fs = require("fs");
var path = require("path");
var picId = [
    1529,1671,1772,1782,1872
];

var picDirPath = "/Users/NICK/Downloads/161016 芝麻/";
var desPicDirPath = "/Users/NICK/Downloads/pic/";

for (var i = 0, n = picId.length; i < n; i++) {
    if (fs.existsSync(path.join(picDirPath, "SIG_" + picId[i] + ".jpg"))) {
        var readable = fs.createReadStream(path.join(picDirPath, "SIG_" + picId[i] + ".jpg"));
        // 创建写入流
        var writable = fs.createWriteStream(path.join(desPicDirPath, "SIG_" + picId[i] + ".jpg"));
        // 通过管道来传输流
        readable.pipe(writable);
    } else {
        console.log(picID[i] + "不存在！");
    }
}