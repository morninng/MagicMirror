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
                   ["newsfeed", "compliments"],
                   [ "calendar" ],
                   ["helloworld"]
                  ],
              fixed: ["MMM-AssistantMk2", "MMM-Hotword"],
      }
    },

		// {
		// 	module: "alert",
		// },
		// {
		// 	module: "updatenotification",
		// 	position: "top_bar"
		// },
		{
			module: "clock",
			position: "top_left"
    },
    {
      module: "MMM-AssistantMk2",
      position: "top_right",
      useGactionCLI: true,
      projectId: "nec-investigation", // need update to own project id
      deviceModelId: "nec-investigation-nec-investigate-demo-mjujeb", // need update to own deviceModelId
      deviceInstanceId: "my_led_1", // need update to own deviceInstanceId
      config: {
        // useWelcomeMessage: "brief today",
        responseScreen: true,
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
          "com.example.commands.Number" : {
            command: "NUMBER"
          },
        },
        transcriptionHook: {
          "HELLO": {
            pattern: "hello",
            command: "HELLO"
          },
        },
        command: {
          "HELLO":{
            shellExec: {
              exec: (params, key) => {
                console.log('shell exec');
                return "echo '!!!!!!hello was said and transcriptionHook Done'"
              },
              options: (params, key)=> {
                return "now"
              },
            }
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
			module: "helloworld",
			position: "middle_center"
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
			module: "compliments",
			position: "top_left"
		},
		// {
		// 	module: "currentweather",
		// 	position: "top_right",
		// 	config: {
		// 		location: "New York",
		// 		locationID: "",  //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
		// 		appid: "YOUR_OPENWEATHER_API_KEY"
		// 	}
		// },
		// {
		// 	module: "weatherforecast",
		// 	position: "top_left",
		// 	header: "Weather Forecast",
		// 	config: {
		// 		location: "New York",
		// 		locationID: "5128581",  //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
		// 		appid: "YOUR_OPENWEATHER_API_KEY"
		// 	}
		// },
		{
			module: "newsfeed",
			position: "middle_center",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
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



  ]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
