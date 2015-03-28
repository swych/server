# Server Layout v1

This is a proposal for a node JS account and control server.

The server provides several different functions:

- Provide a data store for user accounts, user actions, user hubs, and user devices
- Provide endpoints for external push services (SMS)
- Send notifications to users based on data events
- Send notifications to devices via hubs based on data events
- Provide a socket interface for device events brokered via hubs

The server is broken down by functional intents.
Each intent has an assumed interface, control flow, and place in the app's lifecycle.

Each intent is tied to a root folder.

## Folders

### config

The config folder contains all methods and data executed on app start.
These methods are called once and only once, they have varying interfaces that are accounted for in the app start waterfall.

Some configurations (like routes) require request-level execution. These request level hooks belong in `tasks`.

Configurations should include any and all kinds of event binding mechanism, we will treat routing tables as event bindings.
All scripts that are at the base `config` path are assumed to binding mechanisms. Sub-folders should be used for any utils or data.

Config will include all model definitions, because models need to be organized in the `start` aspect of the app.

### tasks

The tasks folder contains anything bound to an event or hook.
There should not be any scripts in the base `tasks` path.

Folders should contain scripts that all have a common interface.
`index.js` files in this folder export an array of ordered required files unless the tasks are part of a routing table.

Folder names should match their intended binding interface. e.g. `tasks/data` should refer to hooks related to the data store. The exception to this would be common relationships, specifically `controller` and `route`.

### lib

The lib folder contains all domain logic and has no inter-app dependencies.

**Any script in the lib folder could be conceivably moved to its own module.**

Lib modules vary in interface. It will be the responsibility of their implementors to understand how to apply them.

### managers

The managers folder contains module-cached singletons that power a web and data application.

Managers will likely only include *mongoose*, *web-sockets*, *restify*, and *express*. An event bus will be available via managers as well.
The event bus will be implemented throughout the entire app with most of its bindings happening within config and most of its triggers happening within tasks.

The event bus is the control flow module that is free to exist in any project folder with one major exception. The event bus (or any other manager) should never be required in the `lib` folder.

### gulp

The gulp folder contains all gulp tasks, with the name of the gulp script matching the name of the gulp command.

### templates

The templates folder will contain templates that typically support web applications. They can also host email templates, etc.

