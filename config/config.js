/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "en",
	timeFormat: 24,
	units: "metric",

	modules: [
    {
      module: 'MMM-pages',
      config: {
              modules:
                  [
                   [],
                   [ "clock", "currentweather"], // home
                   ["clock"], // 1 page 例:「 時間を教えて。」
                   [ "MMM-EasyPix2" ], // 2 page calendar "カレンダー"見せて.」
                   [ "MMM-EasyPix"], // 3 page "天気"出して.」
                   [ "MMM-EasyPix3" ], // 4 page "ワークアウト"
                  ],
              fixed: ["MMM-AssistantMk2", "MMM-Hotword"],
      }
    },
		{
			module: "clock",
			position: "top_left"
    },
    {
      module: "MMM-AssistantMk2",
      position: "top_right",
      useGactionCLI: true,
      projectId: "magic-mirror-demo-2", // need update to own project id
      deviceModelId: "magic-mirror-demo-2-mirror-273vzs", // need update to own deviceModelId
      deviceInstanceId: "my_led_1", // need update to own deviceInstanceId
      config: {
        // useWelcomeMessage: "brief today",
        responseScreen: true,
        profiles: {
          "default" : { // profile name.
            profileFile: "default.json", // https://github.com/eouia/MMM-AssistantMk2/wiki/Configuration
            lang: "ja-JP"
          },

        },
        record: {
          recordProgram : "rec",  
          threshold: 0,
        },
    
        notifications: {
          ASSISTANT_ACTIVATED: "HOTWORD_PAUSE",
          ASSISTANT_DEACTIVATED: "HOTWORD_RESUME",
        },

        action: {
          "com.example.intents.REBOOT" : {
            command: "REBOOT"
          },
          "com.example.intents.PAGE" : {
            command: "PAGE"
          },
          "com.example.commands.Calendar" : {
            command: "Calendar"
          },
          "com.example.commands.Number" : {
            command: "NUMBER"
          },
          "com.example.commands.Time" : {
            command: "Time"
          },
          "com.example.commands.Home" : {
            command: "Home"
          },
          "com.example.commands.Workout" : {
            command: "Workout"
          },
          "com.example.commands.Bye" : {
            command: "Bye"
          },
          "com.example.commands.Weather" : {
            command: "Weather"
          },
          "com.example.commands.Shutdown" : {
            command: "Shutdown"
          },
        },
        command: {
          "Home":{
            notificationExec: {
              notification: (params, key) => {
                return "PAGE_CHANGED";
              },
              payload: (params, key)=> {
                return 1;
              },
            },
          },
          "Time":{
            notificationExec: {
              notification: (params, key) => {
                return "PAGE_CHANGED";
              },
              payload: (params, key)=> {
                return 2;
              },
            },
          },
          "Calendar":{
            notificationExec: {
              notification: (params, key) => {
                return "PAGE_CHANGED";
              },
              payload: (params, key)=> {
                return 3;
              },
            },
          },
          "Weather":{
            notificationExec: {
              notification: (params, key) => {
                return "PAGE_CHANGED";
              },
              payload: (params, key)=> {
                return 4;
              },
            }
          },
          "Workout":{
            notificationExec: {
              notification: (params, key) => {
                return "PAGE_CHANGED";
              },
              payload: (params, key)=> {
                return 5;
              },
            },
          },
          "Bye":{
            notificationExec: {
              notification: (params, key) => {
                return "PAGE_CHANGED";
              },
              payload: (params, key)=> {
                return 0;
              },
            },
          },
          "NUMBER": {
            notificationExec: {
              notification: (params, key) => {
                console.log('params', params)
                console.log('key', key)
                if(params.number && !isNaN(params.number) && params.number < 4){
                  console.log('PAGE_CHANGED execute in config');
                  return "PAGE_CHANGED";
                }else{
                  console.log('number is not number in notification');
                }
              },
              payload: (params, key)=> {
                console.log('options params', params)
                console.log('options key', key)
                if(params.number && !isNaN(params.number)){
                  console.log('PAGE_CHANGED execute in config', params.number);
                  return Number(params.number);
                }else{
                  console.log('number is not number in payload');
                }
              },
            },
            shellExec: {
              exec: (params, key) => {
                console.log('shell exec');
                return "echo '!!!!!!!!!!!!!!!!'"
              },
              options: (params, key)=> {
                return "now"
              },
            }
          }
        },
      },
    },
		{
			module: "calendar",
			header: "US Holidays",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"					}
				]
			}
		},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "Tokyo, JP",
				locationID: "",  //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "da3cbbaf92dcd0f45fe7f3d7799ffc88"
			}
		},
    
    {
      module: "MMM-Hotword",
      position: "bottom_right",
      config: {
        chimeOnFinish: null,
        mic: {
          recordProgram: "rec",
          // device: "plughw:1"
          verbose: true
        },
        models: [
          {
            hotwords    : "computer",
            file        : "computer.umdl",
            sensitivity : "0.5",
          },
        ],
        commands: {
          "computer": {
            notificationExec: {
              notification: "ASSISTANT_ACTIVATE",
              payload: (detected, afterRecord) => {
                return {profile:"default"}
              }
            },
            moduleExec: {
              module: ["MMM-pages"],
              exec: (module, hotword, file) => {
                console.log('hotword', hotword);
                console.log('file', file);
                module.goto_home_if_blankpage();
              }
            },
            restart:false,
            afterRecordLimit:0
          }
        }
      }
    },
    {
      module: "MMM-EasyPix",
      position: "top_center",
      config: {
        picName: "Cloudy.gif", // Enter the picture file name.
        maxWidth: "75%",        // Size picture precisely. Retains aspect ratio.
      }
    },
    {
      module: "MMM-EasyPix2",
      position: "top_center",
      config: {
        picName: "Sample_Calendar.png", // Enter the picture file name.
        maxWidth: "75%",        // Size picture precisely. Retains aspect ratio.
      }
    },
    {
      module: "MMM-EasyPix3",
      position: "top_center",
      config: {
        picName: "Yoga.gif", // Enter the picture file name.
        maxWidth: "75%",        // Size picture precisely. Retains aspect ratio.
      }
    },

  ]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
