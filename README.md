# TimeMatters

## Current state

Currently a static-HTML site that can be served directly from the local filesystem to a chrome browser, which must be running in developer mode with phone-simulation enabled.

Many directories in this repository are unused, abandoned attempts to create a true android/iOS app.  The only directory actually in use currently is the `src` directory.  No need to tamper with any other directory.

## Running the app on a laptop

Download and unzipi this repository into your local file system's "Documents" folder.  Let's assume the TimeMatters root folder is thus located at: /Users/yourname/Documents/TimeMatters

Launch the chrome browser and point it at http://www.google.com

Right click anywhere in blank space on that page and choose "Inspect".

A development-assistant pane will now pop up.  You may want to configure it to always appear on the right side of your browser window instead of hugging the bottom, to make phone-emulation development easier.  To do so, click on the "three dots" icon in the upper-right corner of that pane and play with the "Dock Side" chooser.

Once you've got the pane docked where you'd like it:  In the upper-left corner of the development-assistant pane, tap on the icon representing "phone/tablet".

The webpage you were looking at (google.com) is now appearing in a tablet/phone emulation pane.  Above it you will see a dropdown currently selecting "Responsive".  Choose "iPhone 6" instead.

Now that your browser is acting as a phone, you can place the app's address in the URL web address area using this syntax:
```
file:///Users/yourname/Documents/TimeMatters/src/home.html
```

You should see the animation running in your chrome browser's phone-emulation pane.   You can now work on the source code and just reload the chrome browser window to test your changes.

