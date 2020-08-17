const https = require('https');
const htmlToText = require('html-to-text');

const { PhotoDao, UserDao } = require('../infra')
  , jimp = require('jimp')
  , path = require('path')
  , fs = require('fs')
  , unlink = require('util').promisify(fs.unlink);

const api = {}

const userCanDelete = user => photo => photo.userId == user.id;

const defaultExtension = '.jpg';

api.list = async (req, res) => {
  console.log('####################################');
  const { userName } = req.params;
  const { page } = req.query;
  const user = await new UserDao(req.db).findByName(userName);
  if (user) {
    console.log(`Listing photos`);
    const photos = await new PhotoDao(req.db)
      .listAllFromUser(userName, page);
    res.json(photos);
  } else {
    res.status(404).json({ message: 'User not found' });
  }

}

api.add = async (req, res) => {
  console.log('####################################');
  console.log('Received JSON data', req.body);
  const photo = req.body;
  photo.file = '';
  const id = await new PhotoDao(req.db).add(photo, req.user.id);
  res.json(id);
};

api.addUpload = async (req, res) => {

  console.log('upload complete');
  console.log('Photo data', req.body);
  console.log('File info', req.file);

  const image = await jimp.read(req.file.path);

  await image
    .exifRotate()
    .cover(460, 460)
    .autocrop()
    .write(req.file.path);

  const photo = req.body;
  photo.url = path.basename(req.file.path);
  await new PhotoDao(req.db).add(photo, req.user.id);
  res.status(200).end();
};

api.findById = async (req, res) => {
  const { photoId } = req.params;
  console.log('####################################');
  console.log(`Finding photo for ID ${photoId}`)
  const photo = await new PhotoDao(req.db).findById(photoId);
  if (photo) {
    res.json(photo);
  } else {
    res.status(404).json({ message: 'Photo does not exist' })
  }
};

api.remove = async (req, res) => {
  const user = req.user;
  const { photoId } = req.params;
  const dao = new PhotoDao(req.db);
  const photo = await dao.findById(photoId);
  if (!photo) {
    const message = 'Photo does not exist';
    console.log(message);
    return res.status(404).json({ message });
  }

  if (userCanDelete(user)(photo)) {
    await dao.remove(photoId)
    console.log(`Photo ${photoId} deleted!`);
    res.status(200).end();
  } else {
    console.log(`
            Forbiden operation. User ${user.id} 
            can delete photo from user ${photo.userId}
        `);
    res.status(403).json({ message: 'Forbidden' });
  }
};

api.like = async (req, res) => {
  const { photoId } = req.params;
  const dao = new PhotoDao(req.db);
  const liked = await dao.likeById(photoId, req.user.id);
  if (liked) {
    console.log(`User ${req.user.name} liked photo ${photoId}`);
    return res.status(201).end();
  }
  return res.status(304).end();
};

api.getPhotosFromHTPPCats = async (req, res) => {
  console.log("fazendo a request")

  // https.get('https://http.cat/', (resp) => {
  //   let data = '';

  //   // A chunk of data has been recieved.
  //   resp.on('data', (chunk) => {
  //     data += chunk;
  //   });


  //   // The whole response has been received. Print out the result.
  //   resp.on('end', () => {

  //     let catMap = new Map();

  //     // Get only images from HTTP Cats
  //     const text = htmlToText.fromString(data.toString(), {
  //       baseElement: 'body'
  //     });

  //     let animalsStatusList = text.match(/\*([^\]]*)\[/g).toString()
  //       .replace(/\*/g, '')
  //       .replace(/\[/g, '')
  //       .replace(/\,/g, '')
  //       .split("  ")

  //     for (var x = 0; x < animalsStatusList.length; x++) {
  //       var catInfo = animalsStatusList[x].replace(/(\d{3})/g, '$1 ').replace(/(^\s+|\s+$)/, '')
  //       catMap.set(catInfo.substring(0, 3), catInfo.substring(3, catInfo.length))
  //       animalsStatusList[x] = catInfo
  //     }


  //     return res.status(200).json({
  //       message: 'Response found', body: animalsStatusList
  //     });
  //   });

  // }).on("error", (err) => {
  //   console.log("Error: " + err.message);
  //   return res.status(403).json({ message: 'Response not found' });
  // });

  let catMockList = catMapMockList();
  const dao = new PhotoDao(req.db);
  const isCatPhoto = await dao.isCatPhoto();

  console.log(!isCatPhoto.isfull)

  if (!isCatPhoto.isfull) {
    for (const [key, value] of Object.entries(catMockList)) {
      await dao.add({ url: `https://http.cat/images/${key}.jpg`, description: value.toString(), allowComments: true }, 4)
    }
    dao.setIsCatPhoto(true);
  }

  return res.status(200).json({
    message: 'Response found', body: catMockList
  });
};

function catMapMockList() {
  const text = ["100 Continue",
    "101 Switching Protocols",
    "200 OK",
    "201 Created",
    "202 Accepted",
    "204 No Content",
    "206 Partial Content",
    "207 Multi-Status",
    "300 Multiple Choices",
    "301 Moved Permanently",
    "302 Found",
    "303 See Other",
    "304 Not Modified",
    "305 Use Proxy",
    "307 Temporary Redirect",
    "400 Bad Request",
    "401 Unauthorized",
    "402 Payment Required",
    "403 Forbidden",
    "404 Not Found",
    "405 Method Not Allowed",
    "406 Not Acceptable",
    "408 Request Timeout",
    "409 Conflict",
    "410 Gone",
    "411 Length Required",
    "412 Precondition Failed",
    "413 Payload Too Large",
    "414 Request-URI Too Long",
    "415 Unsupported Media Type",
    "416 Request Range Not Satisfiable",
    "417 Expectation Failed",
    "418 I´m a teapot",
    "420 Enhance Your Calm",
    "421 Misdirected Request",
    "422 Unprocessable Entity",
    "423 Locked",
    "424 Failed Dependency",
    "425 Unordered Collection",
    "426 Upgrade Required",
    "429 Too Many Requests",
    "431 Request Header Fields Too Large",
    "444 No Response",
    "450 Blocked by Windows Parental Controls",
    "451 Unavailable For Legal Reasons",
    "499 Client Closed Request",
    "500 Internal Server Error",
    "501 Not Implemented",
    "502 Bad Gateway",
    "503 Service Unavailable",
    "504 Gateway Timeout",
    "506 Variant Also Negotiates",
    "507 Insufficient Storage",
    "508 Loop Detected",
    "509 Bandwidth Limit Exceeded",
    "510 Not Extended",
    "511 Network Authentication Required",
    "599 Network Connect Timeout Error"];

  let catMap = {};

  for (var x = 0; x < text.length; x++) {

    var catInfo = text[x].replace(/(\d{3})/g, '$1 ').replace(/(^\s+|\s+$)/, '')
    catMap[catInfo.substring(0, 3)] = [catInfo.substring(5, catInfo.length)]
    text[x] = catInfo;
  }

  return catMap;
}

module.exports = api;