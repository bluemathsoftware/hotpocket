
let crypto = require('crypto');
let read = require('read');
let cli = require('cli');
let path = require('path');
let fs = require('fs');

const CONFIG_PATH = path.join(process.env.HOME,'.config','hotpocket');

cli.parse({
  setup : [false,'Setup hotpocket'],
  category : [false, 'Category'],
  command : [false, 'Command']
});

function writeConfig(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

cli.main(function (args, options) {
  if(options.setup) {

     read({
       prompt : 'Setup password for your HotPocket',
       silent : true,
     }, (err, password) => {
       if(err) { console.error(err); process.exit(1); }
       let passwordHash =
         crypto.createHash('sha256').update(password,'utf8').digest()
           .toString('base64');
       read({
         prompt : 'Location to save hotpocket files',
       }, (err, locationPath) => {
         if(err) { console.error(err); process.exit(1); }
         if(!fs.existsSync(locationPath)) {
           fs.mkdir(locationPath, err => {
             if(err) { console.error(err); process.exit(1); }
           })
         }
         writeConfig({
           passwordHash, locationPath
         });
       });
     });

  } else if(options.save) {

  }
});

