Avoid-the-rock
==============

This is the official repository of Muzzley's "Avoid the rock" Game, brought to you by
[Rui Quelhas](https://twitter.com/ruiquelhas).

How to run the game
-------------------

First, and since it is still a very early beta, you need to clone the repo to your machine.

    $ git clone git@github.com:ruiquelhas/Avoid-the-rock.git

Then, and since it is a Node.js (Express) project, you should install the required dependencies. You might as well
go grab a cup of coffee while you do it, because it takes its time.

    $ npm install

Back already? Ok, the next step is running the app itself.

    $ npm start

The Node HTTP server will start running on port `3000` by default. You should be greated by some good old log messages,
so, if that doesn't matter to you, just push it to the background.

Also, if you really, really want, you can run the available tests, although they are not even close to ensure minimal
code coverage.

    $ npm test


How to play the game
--------------------

That's an easy one. The quick way is to open your browser and point it to the server address. For instance, let's
assume your IP address is `192.168.1.69`, you need to put the following on your browser's address bar:

    http://192.168.1.69:3000

Remember the port `3000` reference before? There you go. If you are running a desktop browser, you will be prompted to
navigate to a `/screen` resource. That is the page where the game canvas is displayed. It is not available on mobile
browsers, so please, don't try any tricks, they will probably not prove fruitful.

Of course, you can just navigate directly to the page:

    http://192.168.1.69:3000/screen

Cool, as you might notice by now, you are only able to see a ranking, and it's probably empty. From now on, it will be
filled with the latest game scores (your's and everyone else's).

As soon as you are ready to start playing, just grab a mobile device (phone or tablet, iOS or Android-based preferably),
open the browser and again, try to access the server by it's canonical address:

    http://192.168.1.69:3000

Looks a little bit different, right? That's because you will be prompted to access a different resource, this time it
is called `/driver`. Go for it. Again, you can do that directly with:

    http://192.168.1.69:3000/driver

Now, you should keep your eyes on the desktop screen because, soon enough, the game canvas will be visible and you
just have to play.

To move the object on screen, you need to move your device like a steering wheel. The best experience is achieved
by switching to landscape mode and start making rotations on the x-axis as shown in the following figure (it also
appears in the device screen itself):

![Alt text](https://dl.dropboxusercontent.com/u/903081/alpha.png "Alpha Rotation")

Looks like your playing! Now you just need to avoid the rocks falling from the top of the canvas. For each rock that
you manage to avoid, you will earn 1 point as soon as it hits the bottom of the canvas.

Your score will be submitted when you loose the game (a rock hits the object) or when you explicitly close the mobile
driver. When that happens, the canvas is automatically hidden and you are back to square one (URGHHH!), however, this
time, with the ranking updated with your last score. Don't let this fool you, it is updated on the fly as soon as any
player score is submitted.

That's all folks
----------------

Please keep in mind that this is just a prototype. There is some buggy stuff that needs to be fixed or improved. The
user experience sucks a lot.

### Some Examples

The rocks are images, which implicitly makes them squares (awesome), and you will laugh as soon as they overlap each
other since you will be able to see the square area.

Also, if you happen to be "forced" to quit the game with a "close call", it means you probably hit the "invisible"
square area. As might also noticed, the context is not that great, there are no sessions, no reference to current
score and you will have to guess which ones are yours from the ranking.
