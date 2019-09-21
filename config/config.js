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
      projectId: "nec-investigation!", // need update to own project id
      deviceModelId: "nec-investigation-nec-investigate-demo-mjujeb", // need update to own deviceModelId
      deviceInstanceId: "my_led_1", // need update to own deviceInstanceId
      config: {
        // useWelcomeMessage: "brief today",
        responseScreen: true,
        record: {
          recordProgram : "rec",  
          // device        : "plughw:1",
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
        },

        command: {
          "REBOOT": {
            notification:(params)=>{
              console.log('< Recipe> notification', params);
              if (params.number) {
                return "PAGE_SELECT"
              } else if (params.incordec == "INC") {
                return "PAGE_INCREMENT"
              } else {
                return "PAGE_DECREMENT"
              }
            },
            payload:()=>{
              console.log('< Recipe> payload decision', params);
              if (params.number) {
                return params.number
              } else {
                return null
              }
            }
          },
        
        },
      }
    },
		// {
		// 	module: "calendar",
		// 	header: "US Holidays",
		// 	position: "top_left",
		// 	config: {
		// 		calendars: [
		// 			{
		// 				symbol: "calendar-check",
		// 				url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"					}
		// 		]
		// 	}
		// },
		// {
		// 	module: "compliments",
		// 	position: "lower_third"
		// },
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
		// 	position: "top_right",
		// 	header: "Weather Forecast",
		// 	config: {
		// 		location: "New York",
		// 		locationID: "5128581",  //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
		// 		appid: "YOUR_OPENWEATHER_API_KEY"
		// 	}
		// },
		// {
		// 	module: "newsfeed",
		// 	position: "bottom_bar",
		// 	config: {
		// 		feeds: [
		// 			{
		// 				title: "New York Times",
		// 				url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
		// 			}
		// 		],
		// 		showSourceTitle: true,
		// 		showPublishDate: true,
		// 		broadcastNewsFeeds: true,
		// 		broadcastNewsUpdates: true
		// 	}
    // },
    
    {
      module: "MMM-Hotword",
      position: "bottom_right",
      config: {
        chimeOnFinish: null,
        mic: {
          recordProgram: "rec",
          // device: "plughw:1"
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
