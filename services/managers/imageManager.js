let fs = require("fs");
let path = require("path");
let multiparty = require("multiparty");
const availableFormats = ["png", "jpg", "jpeg"];
const folderName = "images";
const folderPath = `../../public/${folderName}`;
class ImageManager {
  getModelName() {
    return "image";
  }
  createItem(itemId, req) {
    var form = new multiparty.Form({ maxFilesSize: 5000000 });
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (!files || !files.file || files.file.length == 0) {
          return reject("Can't find files.");
        }
        var file = files.file[0];
        var fileNamePaths = file.originalFilename.split(".");
        if (fileNamePaths.length == 0) {
          return reject("Can't parse filename");
        }
        var fileType = fileNamePaths[fileNamePaths.length - 1];
        var filePath = `${folderPath}/${itemId}.${fileType}`;
        try {
          var newFileName = path.resolve(__dirname, filePath);
          fs.createReadStream(file.path).pipe(
            fs.createWriteStream(newFileName)
          );
        } catch (error) {
          return reject(error.message);
        }
        return resolve(`${itemId}.${fileType}`);
      });
    });
  }
  removeItem(itemId) {
    var filePathPrefix = `${folderPath}/${itemId}`;
    var deletedFileName = path.resolve(__dirname, filePathPrefix);
    fs.exists(deletedFileName, function (exists) {
      if (exists) {
        fs.unlink(deletedFileName, function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("successfully deleted: " + deletedFileName);
        });
      }
    });
    return Promise.resolve();
  }
}

module.exports = new ImageManager();
