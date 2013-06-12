# What is a Webstile?

Webstiles is a template to help you prototype in the browser. It is a type of design deliverable, heavily inspired from Style Tiles.

You download the template, open up its CSS, set fonts and colors. You then open up the HTML file, and change the headlines/slogans and adjectives, and optional, remove any sections not required. Once you’re done, you have a finished webstile that you could present to your clients or share with your team.

Webstiles tell the mood of the website, by defining typography, colors, layout and buttons. They help communication between the designer and the client, and are a step before full-fledged mockups, but one step after wireframes.

# How To

_These direction are for editing the CSS directly (which is certainly a fine way to go and still possible). However, if you'd like to contribute and/or leverage Sass, please see [the Sass How To](#sass-how-to) section below._

1. Download the template
2. Open up its CSS and HTML files.
3. In the CSS, change the colors and typefaces. The primary sans typeface used is Tahoma, while the primary serif typeface is Georgia. The primary color is deepskyblue, the secondary color is gold, and tertiary colors are #eee, darkslategray, gainsboro, and saddlebrown. Search and replace!
4. You’re almost done. In the HTML, change the adjectives, and the headings/slogans. Remove any elements you don’t want.
5. You’re done! Upload it for client feedback, or send to your team!

# Sass How To

The directions are essentially the same as the main How To, but instead, you'll be editing the files in the `./sass/*` directory. Please see the following resources for more information if you're new to Sass (or just go ahead and edit the CSS directly if you're looking for a quick one-off solution and don't have time for all this Sass stuff!):

* [Setting up for Sass development][settingup]
* [Compass/Sass chapter][sasschapter]

[settingup]: https://github.com/roblevintennis/rapid-prototyping-book/blob/master/chapters/02_setting_up_for_rapid_dev.md
[sasschapter]: https://github.com/roblevintennis/rapid-prototyping-book/blob/master/chapters/03_compass_sass.md

If you just want to edit and go and you've obtained this via `git clone`, you'll need to enable the submodule for `color-me-sass` as follows:

```bash
git submodule init && git submodule update
```

Then simply do the following to set up Compass / Sass:

```bash
# Windows
$ gem install compass
# Linux/OS X
$ sudo gem install compass
```

Now, while in this project's root directory, open a new terminal tab and watch for any changes (or use the free tool [Scout][scout] if you're more GUI inclined) with:

```
compass watch
```

[scout]: http://mhs.github.io/scout-app/

# Hmm… But why should I use webstiles?

Clients might require more than 1 concept design. Instead of creating full mockups, just create a few webstiles quickly and send them for feedback. Once you've got a better idea of what they want, move on to making the actual site/mockup!

Webstiles are also useful when doing any type of web design work. They help make your idea more solid and real, quickly.

Finally, since webstiles is a web template, it gives your client a much better idea of their actual website. Webstiles is responsive, so it would work on mobiles and tablets as well.

# Why Webstiles?

Webstiles evolved as a personal need. I loved the concept of Style Tiles, but disliked designing in Photoshop, so I took the liberty of making Webstiles. When I came to use it more and more, I realized that other people could benefit from it too, and here we are!

# Signing off

I now use webstiles in pretty much every project of mine — and I believe you should too.

Once again, thanks to [Samantha for her amazing concept of Style Tiles](http://styletil.es/).

Don't Panic!